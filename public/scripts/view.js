$(() => {
  $(".tabs").tabs();
  $("select").formSelect();

  eventListeners();
  historyManager(HOME);
  History.Adapter.trigger(window, "statechange");
});

const History = window.History;

const eventListeners = () => {
  registerTabListener();
  registerCheckListeners();
  headerButtonsEventListener();
  loginEventListener();
  registerEventListener();
  newResourceEventListener();
  changePasswordEventListener();
  updateProfileEventListener();
  profileButtonsEventListener();

  History.Adapter.bind(window, "statechange", () => {
    const { data } = History.getState();
    updateView(data);
  });
};

const partialText = (text, num) => {
  const wordArr = text.split(" ");
  const wordCount = wordArr.length;
  const TextIsTooLong = wordCount > num;
  if (!TextIsTooLong) return text;
  return wordArr.slice(0, num).join(" ") + "...";
};

const historyManager = async (view, info) => {
  try {
    await updateHeader();

    const newState = { info, view };
    let url = "/" + view;
    let title =
      view[0].toUpperCase() +
      view.slice(1).replace("-", " ") +
      " - Resource Wall";

    switch (view) {
      case HOME:
        url = "/";
        break;
      case RESOURCE_DETAILS:
      case USER_PAGE:
        url += `/${info}`;
        break;
    }

    const index = History.getCurrentIndex();

    if (!index && view === HOME) {
      return History.replaceState(newState, title, url);
    }

    History.pushState(newState, title, url);
  } catch (e) {
    updateError(e);
  }
};

const updateViewFunctionGenerator = () => {
  const $resourcesPage = $("#resources-page");
  const $registerPage = $("#register-page");
  const $loginPage = $("#login-page");
  const $changePasswordPage = $("#change-password-page");
  const $newResourcePage = $("#new-resource-page");
  const $resourceDetails = $("#resource-details");
  const $errorPage = $("#error-page");
  const $myResourcesPage = $("#my-resources-page");
  const $userPage = $("#user-page");
  const $tabs = $("#tabs");
  const $editResource = $("#edit-resource-page");

  const hideAll = () => {
    $newResourcePage.hide();
    $resourcesPage.hide();
    $registerPage.hide();
    $loginPage.hide();
    $changePasswordPage.hide();
    $resourceDetails.hide();
    $errorPage.hide();
    $myResourcesPage.hide();
    $userPage.hide();
    $tabs.hide();
    $editResource.hide();
  };

  return async ({ view, info }) => {
    if (view !== ERROR) hideAll();

    try {
      switch (view) {
        case USER_PAGE:
          await updateUserDetails(info);
          $userPage.show();
          break;
        case HOME:
          if (!info) displayResources();
          $resourcesPage.show();
          $tabs.show();
          break;
        case MY_RESOURCES:
          renderMyResources();
          showMyResources();
          $myResourcesPage.show();
          break;
        case EDIT_RESOURCE:
          break;
        case CHANGE_PASSWORD:
          showChangePasswordPage();
          $myResourcesPage.show();
          break;
        case UPDATE_PROFILE:
          showUpdateProfilePage();
          $myResourcesPage.show();
          break;
        case REGISTER:
          $registerPage.show();
          break;
        case LOGIN:
          $loginPage.show();
          break;
        case NEW_RESOURCE:
          $newResourcePage.show();
          break;
        case RESOURCE_DETAILS:
          await updateResourceDetails(info);
          $resourceDetails.show();
          break;
        case ERROR:
          $errorPage.show();
          break;
      }
    } catch (e) {
      updateError(e);
    }
  };
};

const renderMyResources = renderMyResourcesFunctionGenerator();
const updateResourceDetails = updateResourceDetailsFunctionGenerator();
const updateUserDetails = updateUserFunctionGenerator();
const updateHeader = updateHeaderFunctionGenerator();
const updateError = updateErrorFunctionGenerator();
const displayResources = displayResourcesFunctionGenerator();
const {
  showUpdateProfilePage,
  profileButtonsEventListener,
  prefillProfileForm,
  showChangePasswordPage,
  showMyResources,
} = profileHelperFunctionGenerator();
const updateView = updateViewFunctionGenerator();
