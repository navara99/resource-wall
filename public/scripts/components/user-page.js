const updateUserFunctionGenerator = () => {
  $profilePicture = $("#user-profile-picture");
  $username = $("#user-username");
  $name = $("#user-name");
  $bio = $("#user-bio");
  $editMyProfile = $("#edit-my-profile-button");
  $resources = $("#user-resources");

  $editMyProfile.on("click", () => {
    historyManager(UPDATE_PROFILE);
  });

  const clearResource = () => {
    $resources.html("");
  };

  return async(id) => {
    clearResource();
    try {
      const { id: userId, username, first_name, last_name, profile_picture_url, bio } = id
        ? await getUserDetails(id)
        : await getMyDetails();

      if (id) $editMyProfile.hide();
      if (!id) $editMyProfile.show();

      $username.text(`@${username}`);
      $name.text(`${first_name} ${last_name}`);
      $bio.text(bio);
      $("#user-profile-picture").attr("src", profile_picture_url);
      historyManager(USER_PAGE, userId);

      const { resources, id: profileId } = await getUserResources(userId);

      resources.forEach((resource) => {
        const { user_id, isPrivate } = resource;

        const showMine = user_id === profileId && !isPrivate;

        const allResourceInfo = {
          ...resource,
          showMine,
          isMine: false,
          showLiked: false,
        };

        myResourcesSetup(allResourceInfo, $resources)();
      });
    } catch (er) {
      updateError(e);
    }
  };
};
