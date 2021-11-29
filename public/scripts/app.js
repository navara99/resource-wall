// Client facing scripts here

$(() => {
  console.log($("select"));
  $("select").formSelect();

  updateView('resources');
});

const updateUser = async () => {
  $userButtons = $("#user-buttons");
  $noUserButtons = $("#no-user-buttons");

  $userButtons.hide();
  $noUserButtons.hide();

  const userInfo = await getMyDetails();
  const { id, image_url } = userInfo;
  console.log(id);

  if (!id) return $noUserButtons.show();

  $profilePicture = $("#profile-picture");

  $profilePicture.attr('src', image_url);
  $userButtons.show();

};

const updateView = (nextView) => {
  updateUser();

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
