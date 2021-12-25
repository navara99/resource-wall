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
    historyManager("resources", null, {show: true});
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
    historyManager("changePassword");
  });

  $myResourcesButton.on("click", () => {
    historyManager("myResources");
  });

  $logoutButton.on("click", () => {
    logout();
    historyManager("resources", {});
  });

  $floatingCreateResourceButton.on("click", () => {
    historyManager("newResource");
  });

  $createResourceButton.on("click", () => {
    historyManager("newResource");
  });

  $homeButton.on("click", () => {
    $searchBar.val("");
    historyManager("resources");
  });

  $updateProfileButton.on("click", () => {
    historyManager("updateProfile");
  });

  $loginButton.on("click", () => {
    historyManager("login");
  });

  $registerButton.on("click", () => {
    historyManager("register");
  });
};
