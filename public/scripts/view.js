// Client facing scripts here

$(() => {
  console.log($("select"));
  $("select").formSelect();

  headerButtonsOnClick();
  updateView('resources');
});

const updateView = (nextView) => {
  updateHeader();

  const $resources = $("#resources");
  const $registerForm = $("#register-form");
  const $loginForm = $("#login-form");
  const $editProfile = $("#edit-profile");
  const $changePassword = $("#change-password");

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
  }
};
