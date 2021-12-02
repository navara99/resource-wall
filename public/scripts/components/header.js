const updateHeader = (userInfo) => {
  const $userButtons = $("#user-buttons");
  const $noUserButtons = $("#no-user-buttons");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");

  const { id, profile_picture_url } = userInfo;

  if (!id) {
    $userButtons.hide();
    $floatingCreateResourceButton.hide();
    return $noUserButtons.show();
  }
  $profilePicture = $("#profile-picture");

  $profilePicture.attr("src", profile_picture_url);

  $noUserButtons.hide();
  $userButtons.show();
  $floatingCreateResourceButton.show();
};

const headerButtonsEventListener = () => {
  const $homeButton = $("#home-button");
  const $updateProfileButton = $("#update-profile-button");
  const $loginButton = $("#login-button");
  const $registerButton = $("#register-button");
  const $likedResourcesButton = $("#liked-resources-button");
  const $createResourceButton = $("#create-resource-button");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");
  const $logoutButton = $("#logout-button");
  const $dropdown = $("#dropdown");
  const $myResourcesButton = $("#my-resources-button");
  const $changePasswordButton = $("#change-password-button");

  window.onclick = (event) => {
    const className = $(event.target).attr("class");
    if (!className) return $dropdown.hide();

    const targetIsClicked = className.includes("profile-picture");

    if (targetIsClicked) $dropdown.show();
    if (!targetIsClicked) $dropdown.hide();
  };

  $changePasswordButton.on("click", () => {
    updateView("changePassword");
  });

  $myResourcesButton.on("click", () => {
    updateView("myResources");
  });

  $logoutButton.on("click", () => {
    logout();
    updateView("resources", {});
  });

  $floatingCreateResourceButton.on("click", () => {
    updateView("newResource");
  });

  $createResourceButton.on("click", () => {
    updateView("newResource");
  });

  $likedResourcesButton.on("click", () => {
    updateView("likedResources");
  });

  $homeButton.on("click", () => {
    updateView("resources");
  });

  $updateProfileButton.on("click", () => {
    updateView("updateProfile");
  });

  $loginButton.on("click", () => {
    updateView("login");
  });

  $registerButton.on("click", () => {
    updateView("register");
  });
};
