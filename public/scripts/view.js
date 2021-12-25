$(() => {
  $(".tabs").tabs();
  $("select").formSelect();

  eventListeners();
  historyManager("resources");
});

const History = window.History;

History.Adapter.bind(window, "statechange", function () {
  const { data } = History.getState();
  const { view, userInfo, pageInfo } = data;
  updateView(view, userInfo, pageInfo);
});

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
};

const partialText = (text, num) => {
  const wordArr = text.split(" ");
  const wordCount = wordArr.length;
  const TextIsTooLong = wordCount > num;
  if (!TextIsTooLong) return text;
  return wordArr.slice(0, num).join(" ") + "...";
};

const historyManager = async (nextView, currentUserInfo, pageInfo) => {
  const userInfo = currentUserInfo || (await getMyDetails());
  const newState = { userInfo, pageInfo, view: nextView };
  let url = nextView;

  switch (nextView) {
    case "userPage":
      break;
    case "resources":
      break;
    case "myResources":
      break;
    case "editResource":
      break;
    case "changePassword":
      break;
    case "updateProfile":
      break;
    case "register":
      break;
    case "login":
      break;
    case "newResource":
      break;
    case "resourceDetails":
      break;
    case "error":
      break;
  }

  History.pushState(newState, nextView, url);
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

  return (nextView, userInfo, resourceId) => {
    if (nextView !== "error") hideAll();
    updateHeader(userInfo);

    switch (nextView) {
      case "userPage":
        $userPage.show();
        break;
      case "resources":
        if (!resourceId) displayResources();
        $resourcesPage.show();
        $tabs.show();
        break;
      case "myResources":
        renderMyResources();
        showMyResources();
        $myResourcesPage.show();
        break;
      case "editResource":
        break;
      case "changePassword":
        showChangePasswordPage();
        $myResourcesPage.show();
        break;
      case "updateProfile":
        showUpdateProfilePage();
        $myResourcesPage.show();
        break;
      case "register":
        $registerPage.show();
        break;
      case "login":
        $loginPage.show();
        break;
      case "newResource":
        $newResourcePage.show();
        break;
      case "resourceDetails":
        updateResourceDetails(resourceId.id).then((title) => {
          $resourceDetails.show();
        });
        break;
      case "error":
        $errorPage.show();
        break;
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
