$(() => {
  console.log($("select"));
  $("select").formSelect();

  headerButtonsEventListener();
  loginEventListener();
  registerEventListener();
  newResourceEventListener();
  updateView("resources");
});

const updateView = (nextView, userInfo) => {
  updateHeader(userInfo);

  const $resources = $("#resources");
  const $registerPage = $("#register-page");
  const $loginPage = $("#login-page");
  const $editProfile = $("#edit-profile");
  const $changePassword = $("#change-password");
  const $newResourcePage = $("#new-resource-page");
  const $resourceDetails = $("#resource-details");

  $newResourcePage.hide();
  $resources.hide();
  $registerPage.hide();
  $loginPage.hide();
  $editProfile.hide();
  $changePassword.hide();
  $resourceDetails.hide();

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
  }
};
