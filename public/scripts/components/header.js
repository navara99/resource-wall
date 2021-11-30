const updateHeader = (userInfo) => {
  const $userButtons = $("#user-buttons");
  const $noUserButtons = $("#no-user-buttons");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");

  const { id, image_url } = userInfo;

  if (!id) {
    $userButtons.hide();
    $floatingCreateResourceButton.hide();
    return $noUserButtons.show();
  }

  $profilePicture = $("#profile-picture");

  $profilePicture.attr("src", image_url);

  $noUserButtons.hide();
  $userButtons.show();
  $floatingCreateResourceButton.show();
};

const headerButtonsEventListener = () => {
  const $homeButton = $("#home-button");
  const $profileButton = $("#profile-button");
  const $loginButton = $("#login-button");
  const $registerButton = $("#register-button");
  const $likedResourcesButton = $("#liked-resources-button");
  const $createResourceButton = $("#create-resource-button");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");
  const $logoutButton = $("#logout-button");
  const $myResourcesButton = $("#my-resources-button");

  $myResourcesButton.on("click", () => {
    viewHandler()("myResources");
  });

  $logoutButton.on("click", () => {
    logout();
    viewHandler()("resources", {});
  });

  $floatingCreateResourceButton.on("click", () => {
    viewHandler()("newResource");
  });

  $createResourceButton.on("click", () => {
    viewHandler()("newResource");
  });

  $likedResourcesButton.on("click", () => {
    viewHandler()("resources");
  });

  $homeButton.on("click", () => {
    viewHandler()("resources");
  });

  $profileButton.on("click", () => {
    viewHandler()("updateProfile");
  });

  $loginButton.on("click", () => {
    viewHandler()("login");
  });

  $registerButton.on("click", () => {
    viewHandler()("register");
  });
};
