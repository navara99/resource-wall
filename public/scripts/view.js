$(() => {
  $(".tabs").tabs();
  $("select").formSelect();

  updateUserInfo();
  eventListeners();
  updateView("resources");
});

const {
  showUpdateProfilePage,
  profileButtonsEventListener,
  prefillProfileForm,
  showChangePasswordPage,
  showMyResources,
} = profileHelperFunctionGenerator();

const eventListeners = () => {
  registerTabListener();
  registerCheckListeners();
  registerSearchListener();
  headerButtonsEventListener();
  loginEventListener();
  registerEventListener();
  newResourceEventListener();
  changePasswordEventListener();
  updateProfileEventListener();
  profileButtonsEventListener();
};

const updateTitleURL = (title, url) => {
  const newURL = `http://localhost:8080/${url}`;
  window.history.pushState("data", "Title", newURL);
  document.title = `${title} - Resource Wall`;
};

const updateUserInfo = async (userInfo) => {
  try {
    if (!userInfo) userInfo = await getMyDetails();
    updateHeader(userInfo);
  } catch (err) {
    updateHeader({});
    updateError(err);
    updateView("error");
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
  };

  return (nextView, userInfo, resourceId) => {
    if (nextView !== "error") {
      updateUserInfo(userInfo);
      hideAll();
    }

    switch (nextView) {
      case "userPage":
        $userPage.show();
        updateTitleURL("Profile", "profile");
        break;
      case "resources":
        displayResources();
        $resourcesPage.show();
        $tabs.show();
        updateTitleURL("Home", "");
        break;
      case "myResources":
        renderMyResources();
        showMyResources();
        $myResourcesPage.show();
        updateTitleURL("My Resources", "my-resources");
        break;
      case "changePassword":
        showChangePasswordPage();
        $myResourcesPage.show();
        updateTitleURL("Change Password", "change-password");
        break;
      case "updateProfile":
        showUpdateProfilePage();
        $myResourcesPage.show();
        updateTitleURL("Update Profile", "update-profile");
        break;
      case "register":
        $registerPage.show();
        updateTitleURL("Register", "register");
        break;
      case "login":
        $loginPage.show();
        updateTitleURL("Login", "login");
        break;
      case "newResource":
        $newResourcePage.show();
        updateTitleURL("Create New Resource", "create-resource");
        break;
      case "resourceDetails":
        updateResourceDetails(resourceId).then((title) => {
          $resourceDetails.show();
          updateTitleURL(
            `${title} - Resource Details`,
            `resource/${resourceId}`
          );
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
const updateView = updateViewFunctionGenerator();
