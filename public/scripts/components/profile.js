const profilePageHandler = () => {
  const $updateProfileButton = $("#update-profile-button");
  const $profileButtonBorder = $("#profile-button-border");
  const $updateProfilePage = $("#update-profile-page");
  const $changePasswordButton = $("#change-password-button");
  const $passwordButtonBorder = $("#password-button-border");
  const $changePasswordPage = $("#change-password-page");

  const $firstNameInput = $("#update_first_name");
  const $LastNameInput = $("#update_last_name");
  const $usernameInput = $("#update_username");
  const $emailInput = $("#update_email");
  const $bioInput = $("#bio");

  const prefillProfileForm = async () => {
    const userInfo = await getMyDetails();
    const { first_name, last_name, username, email, bio } = userInfo
    $LastNameInput.val(last_name);
    $LastNameInput.focus();
    $usernameInput.val(username);
    $usernameInput.focus();
    $emailInput.val(email);
    $emailInput.focus();
    $bioInput.val(bio);
    $bioInput.focus();
    $firstNameInput.val(first_name);
    $firstNameInput.focus();
  };

  const resetProfilePage = () => {
    $passwordButtonBorder.hide();
    $changePasswordPage.hide();
    $profileButtonBorder.show();
    $updateProfilePage.show();
  };

  const profileButtonsEventListener = () => {
    $updateProfileButton.on("click", () => {
      resetProfilePage();
    });

    $changePasswordButton.on("click", () => {
      $profileButtonBorder.hide();
      $updateProfilePage.hide();
      $passwordButtonBorder.show();
      $changePasswordPage.show();
    });
  };

  return { resetProfilePage, profileButtonsEventListener, prefillProfileForm };
};

const updateProfileEventListener = () => {
  const $updateProfileForm = $("#update-profile-form");

  $updateProfileForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $updateProfileForm.serialize();

      const userInfo = await updateProfile(data);

      updateView("resources", userInfo);

      return $updateProfileForm.trigger("reset");
    } catch (err) {
      updateView(err);
    }
  });
};

const changePasswordEventListener = () => {
  const $changePasswordForm = $("#change-password-form");

  $changePasswordForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $changePasswordForm.serialize();

      const userInfo = await changePassword(data);

      updateView("resources", userInfo);

      return $changePasswordForm.trigger("reset");
    } catch (err) {
      updateView(err);
    }
  });
};
