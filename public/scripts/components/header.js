const updateHeaderFunctionGenerator = () => {
  const $userButtons = $("#user-buttons");
  const $noUserButtons = $("#no-user-buttons");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");
  const $profilePicture = $("#profile-picture");

  return ({ id, profile_picture_url }) => {
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
  const $searchBar = $(`#search`);

  $searchBar.on("input", async(e) => {
    const query = e.target.value;
    if (!query) return displayResources();

    const { allResources } = await searchResource(query);
    displayResources(allResources);
  });

  $searchBar.on("focus", async(e) => {
    historyManager(RESOURCES, null, true);
  });

  window.onclick = (event) => {
    const className = $(event.target).attr("class");
    if (!className) return $dropdown.hide();

    const targetIsClicked = className.includes("profile-dropdown");

    if (targetIsClicked) $dropdown.show();
    if (!targetIsClicked) $dropdown.hide();
  };

  $myProfilebutton.on("click", () => {
    updateUserDetails();
  });

  $changePasswordButton.on("click", () => {
    historyManager(CHANGE_PASSWORD);
  });

  $myResourcesButton.on("click", () => {
    historyManager(MY_RESOURCES);
  });

  $logoutButton.on("click", () => {
    logout();
    historyManager(HOME, {});
  });

  $floatingCreateResourceButton.on("click", () => {
    historyManager(NEW_RESOURCE);
  });

  $createResourceButton.on("click", () => {
    historyManager(NEW_RESOURCE);
  });

  $homeButton.on("click", () => {
    $searchBar.val("");
    historyManager(HOME);
  });

  $updateProfileButton.on("click", () => {
    historyManager(UPDATE_PROFILE);
  });

  $loginButton.on("click", () => {
    historyManager(LOGIN);
  });

  $registerButton.on("click", () => {
    historyManager(REGISTER);
  });
};
