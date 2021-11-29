$(() => {
  console.log($("select"));
  $("select").formSelect();

  updateUserInfo()
  headerButtonsEventListener();
  loginEventListener();
  registerEventListener();
  newResourceEventListener();
  updateView("resources");
});

const updateUserInfo = async (userInfo) => {
  if (!userInfo) userInfo = await getMyDetails();
  updateHeader(userInfo);
};

const updateView = (nextView, userInfo) => {
  updateUserInfo(userInfo);
  const $resources = $("#resources");
  const $registerPage = $("#register-page");
  const $loginPage = $("#login-page");
  const $editProfile = $("#edit-profile");
  const $changePasswordPage = $("#change-password-page");
  const $newResourcePage = $("#new-resource-page");
  const $resourceDetails = $("#resource-details");
  const $errorPage = $("#error-page");

  $newResourcePage.hide();
  $resources.hide();
  $registerPage.hide();
  $loginPage.hide();
  $editProfile.hide();
  $changePasswordPage.hide();
  $resourceDetails.hide();
  $errorPage.hide();

  switch (nextView) {
    case "resources":
      $resources.show();
      break;
    case "updateProfile":
      $editProfile.show();
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
      $resourceDetails.show();
      break;
    default:
      $errorPage.show();
      break;
  }
};
