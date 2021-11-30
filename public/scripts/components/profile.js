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
