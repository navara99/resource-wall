$(() => {
  $(".tabs").tabs();
  $("select").formSelect();

  updateUserInfo();
  eventListeners();
  historyManager("resources");
});

const History = window.History;

History.Adapter.bind(window, "statechange", function () {
  const { data } = History.getState();
  const { view } = data;
  updateView(view);
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

const updateTitleURL = (title, url) => {
  const newURL = `http://localhost:8080/${url}`;
  // window.history.pushState("data", "Title", newURL);
  // document.title = `${title} - Resource Wall`;
  History.pushState(null, null, url);
};

const updateUserInfo = async (userInfo) => {
  try {
    if (!userInfo) userInfo = await getMyDetails();
    updateHeader(userInfo);
  } catch (err) {
    updateHeader({});
    updateError(err);
  }
};

const historyManager = (nextView) => {
  const newState = { view: nextView };

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

  History.pushState(newState, null, nextView);
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
    if (nextView !== "error") {
      updateUserInfo(userInfo);
      hideAll();
    }

    switch (nextView) {
      case "userPage":
        $userPage.show();
        // updateTitleURL("Profile", "profile");
        break;
      case "resources":
        if (!resourceId) displayResources();
        $resourcesPage.show();
        $tabs.show();
        // updateTitleURL("Home", "home");
        break;
      case "myResources":
        renderMyResources();
        showMyResources();
        $myResourcesPage.show();
        // updateTitleURL("My Resources", "my-resources");
        break;
      case "editResource":
        // updateTitleURL("Edit Resource", "edit-resource");
        break;
      case "changePassword":
        showChangePasswordPage();
        $myResourcesPage.show();
        // updateTitleURL("Change Password", "change-password");
        break;
      case "updateProfile":
        showUpdateProfilePage();
        $myResourcesPage.show();
        // updateTitleURL("Update Profile", "update-profile");
        break;
      case "register":
        $registerPage.show();
        // updateTitleURL("Register", "register");
        break;
      case "login":
        $loginPage.show();
        // updateTitleURL("Login", "login");
        break;
      case "newResource":
        $newResourcePage.show();
        // updateTitleURL("Create New Resource", "create-resource");
        break;
      case "resourceDetails":
        updateResourceDetails(resourceId).then((title) => {
          $resourceDetails.show();
          // updateTitleURL(
          //   `${title} - Resource Details`,
          //   `resource/${resourceId}`
          // );
          updateUserInfo(userInfo);
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
