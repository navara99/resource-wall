$(() => {
  console.log($("select"));
  $("select").formSelect();

  updateUserInfo();
  eventListeners();
  updateView("resources");
});

const eventListeners = () => {
  const { resourcesButtonsEventListener } = myResourcesPageHandler();
  headerButtonsEventListener();
  loginEventListener();
  registerEventListener();
  newResourceEventListener();
  changePasswordEventListener();
  updateProfileEventListener();
  profileButtonsEventListener();
  resourcesButtonsEventListener();
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
  const $profilePage = $("#profile-page");
  const $changePasswordPage = $("#change-password-page");
  const $newResourcePage = $("#new-resource-page");
  const $resourceDetails = $("#resource-details");
  const $errorPage = $("#error-page");
  const $myResourcePage = $("#my-resources-page");
  const { showMyResources, showLikedResources } = myResourcesPageHandler();

  const updateView = (nextView, userInfo) => {
    updateUserInfo(userInfo);
    $newResourcePage.hide();
    $resourcesPage.hide();
    $registerPage.hide();
    $loginPage.hide();
    $profilePage.hide();
    $changePasswordPage.hide();
    $resourceDetails.hide();
    $errorPage.hide();
    $myResourcePage.hide();

    switch (nextView) {
      case "resources":
        $resourcesPage.show();
        updateTitleURL("Home", "");
        break;
      case "myResources":
        showMyResources();
        $myResourcePage.show();
        updateTitleURL("My resources", "my-resources");
        break;
      case "likedResources":
        showLikedResources();
        $myResourcePage.show();
        updateTitleURL("Liked resources", "liked-resources");
        break;
      case "updateProfile":
        resetProfilePage();
        prefillProfileForm();
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

const updateView = viewHandler();
const { resetProfilePage, prefillProfileForm, profileButtonsEventListener } =
  profilePageHandler();
const { showMyResources, showLikedResources, resourcesButtonsEventListener } =
  myResourcesPageHandler();
