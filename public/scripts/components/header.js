const updateHeader = async () => {
  const $userButtons = $("#user-buttons");
  const $noUserButtons = $("#no-user-buttons");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");

  $userButtons.hide();
  $noUserButtons.hide();
  $floatingCreateResourceButton.hide();

  const userInfo = await getMyDetails();
  const { id, image_url } = userInfo;

  if (!id) return $noUserButtons.show();

  $profilePicture = $("#profile-picture");

  $profilePicture.attr('src', image_url);
  $userButtons.show();
  $floatingCreateResourceButton.show();

};

const headerButtonsOnClick = () => {
  const $homeButton = $("#home-button");
  const $profileButton = $("#profile-button");
  const $loginButton = $("#login-button");
  const $registerButton = $("#register-button");
  const $likedResourcesButton = $("#liked-resources-button");
  const $createResourceButton = $("#create-resource-button");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");

  $floatingCreateResourceButton.on("click", () => {
    updateView("newResource");
  });

  $createResourceButton.on("click", () => {
    updateView("newResource");
  });

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
