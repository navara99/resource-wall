$(() => {
  console.log($("select"));
  $("select").formSelect();

  updateUserInfo();
  eventListeners();
  viewHandler()("resources");
});

const eventListeners = () => {
  const { profileButtonsEventListener } = profilePageHandler();
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
  document.title = title;
};

const updateUserInfo = async (userInfo) => {
  if (!userInfo) userInfo = await getMyDetails();
  updateHeader(userInfo);
};

const viewHandler = () => {
  const $resources = $("#resources");
  const $registerPage = $("#register-page");
  const $loginPage = $("#login-page");
  const $profilePage = $("#profile-page");
  const $changePasswordPage = $("#change-password-page");
  const $newResourcePage = $("#new-resource-page");
  const $resourceDetails = $("#resource-details");
  const $errorPage = $("#error-page");
  const { resetProfilePage } = profilePageHandler();

  const updateView = (nextView, userInfo) => {
    updateUserInfo(userInfo);
    $newResourcePage.hide();
    $resources.hide();
    $registerPage.hide();
    $loginPage.hide();
    $profilePage.hide();
    $changePasswordPage.hide();
    $resourceDetails.hide();
    $errorPage.hide();

    switch (nextView) {
      case "resources":
        $resources.show();
        updateTitleURL("Resources", "resources");
        break;
      case "updateProfile":
        resetProfilePage();
        $profilePage.show();
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
        $resourceDetails.show();
        updateTitleURL("Resource Details", "resource-details");
        break;
      default:
        $errorPage.show();
        updateTitleURL("Error", "error");
        break;
    }
  };
  return updateView;
};
