const updateUserPage = () => {
  $profilePicture = $("#user-rofile-picture");
  $username = $("#user-username");
  $name = $("#user-name");
  $bio = $("#user-bio");

  return async (id) => {
    const userInfo = id ? await getUserDetails(id) : await getMyDetails();
    const { username, first_name, last_name, profile_picture_url, bio } = userInfo;
    $username.text(`@${username}`);
    $name.text(`${first_name} ${last_name}`);
    $bio.text(bio);
    $profilePicture.attr("src", profile_picture_url);
    updateView("userPage");
  }
}
