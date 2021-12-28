const profileHelperFunctionGenerator = () => {
  const $updateProfileButton = $("#side-update-profile-button");
  const $profileButtonBorder = $("#profile-button-border");
  const $updateProfilePage = $("#update-profile-page");
  const $changePasswordButton = $("#side-change-password-button");
  const $passwordButtonBorder = $("#password-button-border");
  const $changePasswordPage = $("#change-password-page");

  const $myResoucesButton = $("#side-my-resources-button");
  const $myButtonBorder = $("#my-button-border");
  const $myResourcesPage = $("#my-resources-details");

  const $firstNameInput = $("#update_first_name");
  const $LastNameInput = $("#update_last_name");
  const $usernameInput = $("#update_username");
  const $emailInput = $("#update_email");
  const $bioInput = $("#bio");
  const $profilePicInput = $("#profile_pic_url");

  const hideAllPages = () => {
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
    try {
      const userInfo = await getMyDetails(1);
      const {
        first_name,
        last_name,
        username,
        email,
        bio,
        profile_picture_url,
      } = userInfo;
      putInValAndFocus($LastNameInput, last_name);
      putInValAndFocus($usernameInput, username);
      putInValAndFocus($emailInput, email);
      putInValAndFocus($bioInput, bio);
      putInValAndFocus($profilePicInput, profile_picture_url);
      putInValAndFocus($firstNameInput, first_name);
      $firstNameInput.blur();
    } catch (e) {
      updateError(e);
    }
  };

  const profileButtonsEventListener = () => {
    $myResoucesButton.on("click", () => {
      historyManager(MY_RESOURCES);
    });

    $updateProfileButton.on("click", () => {
      historyManager(UPDATE_PROFILE);
    });

    $changePasswordButton.on("click", () => {
      historyManager(CHANGE_PASSWORD);
    });
  };

  return {
    showUpdateProfilePage,
    profileButtonsEventListener,
    prefillProfileForm,
    showChangePasswordPage,
    showMyResources,
  };
};

const updateProfileEventListener = () => {
  const $updateProfileForm = $("#update-profile-form");

  $updateProfileForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $updateProfileForm.serialize();

      console.log(data);
      await updateProfile(data);

      historyManager(USER_PAGE, "me");

      $updateProfileForm.trigger("reset");
    } catch (e) {
      updateError(e);
    }
  });
};

const changePasswordEventListener = () => {
  const $changePasswordForm = $("#change-password-form");

  $changePasswordForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $changePasswordForm.serialize();

      await changePassword(data);

      $changePasswordForm.trigger("reset");

      historyManager(CHANGE_PASSWORD);
    } catch (e) {
      updateError(e);
    }
  });
};
