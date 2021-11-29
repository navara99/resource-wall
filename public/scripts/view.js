$(() => {
  console.log($("select"));
  $("select").formSelect();

  updateUserInfo().
    then(() => {
      updateHeader();
    });
  headerButtonsEventListener();
  loginEventListener();
  registerEventListener();
  newResourceEventListener();
  updateView("resources");
});

let currentUserInfo;

const updateUserInfo = async (userInfo) => {
  if (!userInfo) currentUserInfo = await getMyDetails();
  console.log(currentUserInfo);
  if (userInfo) currentUserInfo = userInfo;
  return;
};

const updateView = (nextView) => {

  const $resources = $("#resources");
  const $registerPage = $("#register-page");
  const $loginPage = $("#login-page");
  const $editProfile = $("#edit-profile");
  const $changePassword = $("#change-password");
  const $newResourcePage = $("#new-resource-page");
  const $resourceDetails = $("#resource-details");
  const $errorPage = $("#error-page");

  $newResourcePage.hide();
  $resources.hide();
  $registerPage.hide();
  $loginPage.hide();
  $editProfile.hide();
  $changePassword.hide();
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
