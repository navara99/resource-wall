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
} = profilePageHandler();

const updateResourceDetails = updateResourceDetailsFunctionGenerator();
const updateUserDetailsPage = updateUserPage();

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

const updateHeader = updateHeaderFunctionGenerator();

const updateUserInfo = async(userInfo) => {
  try {
    if (!userInfo) userInfo = await getMyDetails();
    updateHeader(userInfo);
  } catch (err) {
    updateHeader({});
  }
};

const handleError = () => {
  const $errorMessage = $("#error-message");
  return (newMsg) => {
    $errorMessage.text(newMsg);
  };
};

const viewHandler = () => {
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

  const updateView = (nextView, userInfo, resourceId) => {
    if (nextView !== "error") {
      updateUserInfo(userInfo);
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
      updateTitleURL("Error", "error");
      break;
    }
  };
  return updateView;
};

const updateView = viewHandler();
