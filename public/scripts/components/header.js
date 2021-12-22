const updateHeaderFunctionGenerator = () => {
  const $userButtons = $("#user-buttons");
  const $noUserButtons = $("#no-user-buttons");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");
  const $profilePicture = $("#profile-picture");

  return ({ id, profile_picture_url } ) => {

    if (!id) {
      $userButtons.hide();
      $floatingCreateResourceButton.hide();
      return $noUserButtons.show();
    }

    $profilePicture.attr("src", profile_picture_url);

    $noUserButtons.hide();
    $userButtons.show();
    $floatingCreateResourceButton.show();
  };
};

const headerButtonsEventListener = () => {
  const $homeButton = $("#home-button");
  const $updateProfileButton = $("#update-profile-button");
  const $loginButton = $("#login-button");
  const $registerButton = $("#register-button");
  const $createResourceButton = $("#create-resource-button");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");
  const $logoutButton = $("#logout-button");
  const $dropdown = $("#dropdown");
  const $myResourcesButton = $("#my-resources-button");
  const $changePasswordButton = $("#change-password-button");
  const $myProfilebutton = $("#my-profile-button");

  window.onclick = (event) => {
    const className = $(event.target).attr("class");
    if (!className) return $dropdown.hide();

    const targetIsClicked = className.includes("profile-dropdown");

    if (targetIsClicked) $dropdown.show();
    if (!targetIsClicked) $dropdown.hide();
  };

  $myProfilebutton.on("click", () => {
    updateUserDetailsPage();
  });

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
