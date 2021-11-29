// Client facing scripts here

$(document).ready(function () {
  console.log($("select"));
  $("select").formSelect();

  const updateView = (nextView) => {
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
});
