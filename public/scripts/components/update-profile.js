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
