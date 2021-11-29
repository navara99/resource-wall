// Client facing scripts here

$(() => {
  console.log($("select"));
  $("select").formSelect();

  headerButtonsEventListener();
  loginEventListener();
  updateView("resources");
});

const updateView = (nextView, userInfo) => {

  updateHeader(userInfo);

  const $resources = $("#resources");
  const $registerForm = $("#register-form");
  const $loginForm = $("#login-form");
  const $editProfile = $("#edit-profile");
  const $changePassword = $("#change-password");
  const $newResourceForm = $("#new-resource-form");

  $newResourceForm.hide();
  $resources.hide();
  $registerForm.hide();
  $loginForm.hide();
  $editProfile.hide();
  $changePassword.hide();

  switch (nextView) {
    case "resources":
      $resources.show();
      break;
    case "updateProfile":
      $editProfile.show();
      break;
    case "register":
      $registerForm.show();
      break;
    case "login":
      $loginForm.show();
      break;
    case "newResource":
      $newResourceForm.show();
      break;
  }
};
