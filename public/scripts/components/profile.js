const profilePageHandler = () => {
  const $updateProfileButton = $("#side-update-profile-button");
  const $profileButtonBorder = $("#profile-button-border");
  const $updateProfilePage = $("#update-profile-page");
  const $changePasswordButton = $("#side-change-password-button");
  const $passwordButtonBorder = $("#password-button-border");
  const $changePasswordPage = $("#change-password-page");

  const $myResoucesButton = $("#side-my-resources-button");
  const $myButtonBorder = $("#my-button-border");
  const $myResourcesPage = $("#my-resources-details");
  const $likedResourcesButton = $("#side-liked-resources-button");
  const $likedButtonBorder = $("#liked-button-border");
  const $likedResourcesPage = $("#liked-resources-details");

  const $firstNameInput = $("#update_first_name");
  const $LastNameInput = $("#update_last_name");
  const $usernameInput = $("#update_username");
  const $emailInput = $("#update_email");
  const $bioInput = $("#bio");
  const $profilePicInput = $("#profile_pic_url");

  const hideAllPages = () => {
    $likedButtonBorder.hide();
    $likedResourcesPage.hide();
    $passwordButtonBorder.hide();
    $changePasswordPage.hide();
    $profileButtonBorder.hide();
    $updateProfilePage.hide();
    $myButtonBorder.hide();
    $myResourcesPage.hide();
  };

  const showMyResources = () => {
    hideAllPages();
    $myButtonBorder.show();
    $myResourcesPage.show();
  };

  const showLikedResources = () => {
    hideAllPages();
    $likedButtonBorder.show();
    $likedResourcesPage.show();
  };

  const showUpdateProfilePage = () => {
    prefillProfileForm();
    hideAllPages();
    $profileButtonBorder.show();
    $updateProfilePage.show();
  };

  const showChangePasswordPage = () => {
    hideAllPages();
    $passwordButtonBorder.show();
    $changePasswordPage.show();
  };

  const putInValAndFocus = ($elm, val) => {
    $elm.val(val);
    $elm.focus();
  };

  const prefillProfileForm = async () => {
    const userInfo = await getMyDetails(1);
    const { first_name, last_name, username, email, bio, profile_picture_url } =
      userInfo;
    putInValAndFocus($LastNameInput, last_name);
    putInValAndFocus($usernameInput, username);
    putInValAndFocus($emailInput, email);
    putInValAndFocus($bioInput, bio);
    putInValAndFocus($profilePicInput, profile_picture_url);
    putInValAndFocus($firstNameInput, first_name);
    $firstNameInput.blur();
  };

  const profileButtonsEventListener = () => {
    $likedResourcesButton.on("click", () => {
      showLikedResources();
    });

    $myResoucesButton.on("click", () => {
      showMyResources();
    });

    $updateProfileButton.on("click", () => {
      showUpdateProfilePage();
    });

    $changePasswordButton.on("click", () => {
      showChangePasswordPage();
    });
  };

  return {
    showUpdateProfilePage,
    profileButtonsEventListener,
    prefillProfileForm,
    showChangePasswordPage,
    showMyResources,
    showLikedResources,
  };
};

const updateProfileEventListener = () => {
  const $updateProfileForm = $("#update-profile-form");

  $updateProfileForm.submit((event) => {
    try {
      event.preventDefault();

      const data = $updateProfileForm.serialize();

      updateProfile(data).then(() => {
        updateUserDetailsPage();
        $updateProfileForm.trigger("reset");
      });
    } catch (err) {
      updateError(err.responseText);
      updateView("error");
    }
  });
};

const changePasswordEventListener = () => {
  const $changePasswordForm = $("#change-password-form");

  $changePasswordForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $changePasswordForm.serialize();

      changePassword(data).then(() => {
        updateUserDetailsPage();
        $changePasswordForm.trigger("reset");
      });

    } catch (err) {
      updateError(err.responseText);
      updateView("error");
    }
  });
};
