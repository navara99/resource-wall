const updateUserFunctionGenerator = () => {
  $profilePicture = $("#user-profile-picture");
  $username = $("#user-username");
  $name = $("#user-name");
  $bio = $("#user-bio");
  $editMyProfile = $("#edit-my-profile-button");
  $resources = $("#user-resources");

  $editMyProfile.on("click", () => {
    updateView("updateProfile");
  });

  return async (id) => {
    try {
      const { username, first_name, last_name, profile_picture_url, bio } = id
        ? await getUserDetails(id)
        : await getMyDetails();

      if (id) $editMyProfile.hide();
      if (!id) $editMyProfile.show();

      $username.text(`@${username}`);
      $name.text(`${first_name} ${last_name}`);
      $bio.text(bio);
      $("#user-profile-picture").attr("src", profile_picture_url);
      updateView("userPage");

      const userId = id || 0;
      const { resources } = await getUserResources(userId);

      resources.forEach((resource) => {
        console.log(resource);
        // myResourcesSetup(resource, id, $resources)();
      });

    } catch (err) {
      updateError(err);
    }
  };
};
