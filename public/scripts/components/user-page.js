const updateUserPage = () => {
  $profilePicture = $("#user-profile-picture");
  $username = $("#user-username");
  $name = $("#user-name");
  $bio = $("#user-bio");
  $editMyProfile = $("#edit-my-profile-button");

  $editMyProfile.on("click", () => {
    updateView("updateProfile");
  });

  return (id) => {
    if (id) {
      getUserDetails(id).then((userInfo) => {
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
        const { username, first_name, last_name, profile_picture_url, bio } =
          userInfo;
        $username.text(`@${username}`);
        $name.text(`${first_name} ${last_name}`);
        $bio.text(bio);
        $("#user-profile-picture").attr("src", profile_picture_url);
        updateView("userPage");
      });
    }
  };
};
