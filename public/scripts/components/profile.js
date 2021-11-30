const profilePageHandler = () => {
  const $updateProfileButton = $("#update-profile-button");
  const $profileButtonBorder = $("#profile-button-border");
  const $updateProfilePage = $("#update-profile-page");
  const $changePasswordButton = $("#change-password-button");
  const $passwordButtonBorder = $("#password-button-border");
  const $changePasswordPage = $("#change-password-page");

  const resetProfilePage = () => {
    $passwordButtonBorder.hide();
    $changePasswordPage.hide();
    $profileButtonBorder.show();
    $updateProfilePage.show();
  };

  const profileButtonsEventListener = () => {
    $updateProfileButton.on("click", () => {
      $passwordButtonBorder.hide();
      $changePasswordPage.hide();
      $profileButtonBorder.show();
      $updateProfilePage.show();
    });

    $changePasswordButton.on("click", () => {
      $profileButtonBorder.hide();
      $updateProfilePage.hide();
      $passwordButtonBorder.show();
      $changePasswordPage.show();
    });
  };

  return { resetProfilePage, profileButtonsEventListener };
};

const updateProfileEventListener = () => {
  const $updateProfileForm = $("#update-profile-form");

  $updateProfileForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $updateProfileForm.serialize();

      const userInfo = await updateProfile(data);

      viewHandler()("resources", userInfo);

      return $updateProfileForm.trigger("reset");
    } catch (err) {
      viewHandler()(err);
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

      viewHandler()("resources", userInfo);

      return $changePasswordForm.trigger("reset");
    } catch (err) {
      viewHandler()(err);
    }
  });
};
