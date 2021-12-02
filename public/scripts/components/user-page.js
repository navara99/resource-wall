const updateUserPage = () => {
  $profilePicture = $("#user-rofile-picture");
  $username = $("#user-username");
  $name = $("#user-name");
  $bio = $("#user-bio");
  $editMyProfile = $("#edit-my-profile-button");

  $editMyProfile.on("click", () => {
    updateView("updateProfile");
  });

  return async (id) => {
    const userInfo = id ? await getUserDetails(id) : await getMyDetails();
    if (id) {
      $editMyProfile.hide();
    } else {
      $editMyProfile.show();
    }
    const { username, first_name, last_name, profile_picture_url, bio } = userInfo;
    $username.text(`@${username}`);
    $name.text(`${first_name} ${last_name}`);
    $bio.text(bio);
    $profilePicture.attr("src", profile_picture_url);
    updateView("userPage");
  }
}
