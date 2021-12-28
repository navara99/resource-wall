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

  return async (id) => {
    clearResource();
    try {
      const {
        id: userId,
        username,
        first_name,
        last_name,
        profile_picture_url,
        bio,
        isMyProfile,
      } = id === "me" ? await getMyDetails() : await getUserDetails(id);

      console.log(id, userId);
      console.log(isMyProfile);
      if (isMyProfile) $editMyProfile.show();
      if (!isMyProfile) $editMyProfile.hide();

      $username.text(`@${username}`);
      $name.text(`${first_name} ${last_name}`);
      $bio.text(bio);
      $("#user-profile-picture").attr("src", profile_picture_url);

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

        myResourcesSetup(allResourceInfo, $resources, true)();
      });
    } catch (er) {
      updateError(e);
    }
  };
};
