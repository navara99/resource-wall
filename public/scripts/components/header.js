// Client facing scripts here

$(() => {



});

const updateHeader = async () => {
  $userButtons = $("#user-buttons");
  $noUserButtons = $("#no-user-buttons");

  $userButtons.hide();
  $noUserButtons.hide();

  const userInfo = await getMyDetails();
  const { id, image_url } = userInfo;

  if (!id) return $noUserButtons.show();

  $profilePicture = $("#profile-picture");

  $profilePicture.attr('src', image_url);
  $userButtons.show();

};

const headerButtonsOnClick = () => {
  const $homeButton = $("#home-button");
  const $profileButton = $("#profile-button");
  const $loginButton = $("#login-button");
  const $registerButton = $("#register-button");
  const $likedResourcesButton = $("#liked-resources-button");

  $likedResourcesButton.on("click", () => {
    updateView("resources");
  });

  $homeButton.on("click", () => {
    updateView("resources");
  });

  $profileButton.on("click", () => {
    updateView("updateProfile");
  });

  $loginButton.on("click", () => {
    updateView("login");
  });

  $registerButton.on("click", () => {
    updateView("register");
  });
}
