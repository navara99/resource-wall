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
      if (id) {
        getUserDetails(id).then((userInfo) => {
          $editMyProfile.hide();
          const { username, first_name, last_name, profile_picture_url, bio } =
            userInfo;
          $username.text(`@${username}`);
          $name.text(`${first_name} ${last_name}`);
          $bio.text(bio);
          $("#user-profile-picture").attr("src", profile_picture_url);
          updateView("userPage");
        });
      } else {
        getMyDetails().then((userInfo) => {
          $editMyProfile.show();
          const { username, first_name, last_name, profile_picture_url, bio } =
            userInfo;
          $username.text(`@${username}`);
          $name.text(`${first_name} ${last_name}`);
          $bio.text(bio);
          $("#user-profile-picture").attr("src", profile_picture_url);
          updateView("userPage");
        });
      }
    } catch (err) {

    }
  };
};
