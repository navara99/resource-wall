const updateHeader = (userInfo) => {
  const $userButtons = $("#user-buttons");
  const $noUserButtons = $("#no-user-buttons");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");

  const { id, image_url } = userInfo;

  if (!id) {
    $userButtons.hide();
    $floatingCreateResourceButton.hide();
    return $noUserButtons.show();
  }

  $profilePicture = $("#profile-picture");

  $profilePicture.attr("src", image_url);

  $noUserButtons.hide();
  $userButtons.show();
  $floatingCreateResourceButton.show();
};

const headerButtonsEventListener = () => {
  const $homeButton = $("#home-button");
  const $profileButton = $("#profile-button");
  const $loginButton = $("#login-button");
  const $registerButton = $("#register-button");
  const $likedResourcesButton = $("#liked-resources-button");
  const $createResourceButton = $("#create-resource-button");
  const $floatingCreateResourceButton = $("#floating-create-resource-button");
  const $logoutButton = $("#logout-button");
  const $myResourcesButton = $("#my-resources-button");
  const $dropdown = $("#dropdown");

  $logoutButton.on("click", () => {
    logout();
    updateView("resources", {});
  });

  $floatingCreateResourceButton.on("click", () => {
    updateView("newResource");
  });

  $createResourceButton.on("click", () => {
    updateView("newResource");
  });

  $likedResourcesButton.on("click", () => {
    updateView("likedResources");
  });

  $homeButton.on("click", () => {
    updateView("resources");
  });

  $profileButton.on("click", () => {
    updateView("updateProfile");
  });

  // $myResourcesButton
  //   .mouseenter(() => {
  //     $dropdown.show();
  //   })
  //   .mouseleave((event) => {
  //     if (event.target.id !== "dropdown") {
  //       $dropdown.hide();
  //     }
  //   });

  // $myResourcesButton.on("click", () => {
  //   // updateView("myResources");
  //   console.log("HI");
  //   $dropdown.show();
  // });

  // $dropdown.mouseleave((event) => {
  //   if (event.target.nodeName !== "DIV") {
  //     $dropdown.hide();
  //   }
  // });

  window.onclick = (event) => {
    const className = $(event.target).attr("class");
    if (!className) return $dropdown.hide();
    // console.log();

    const targetIsClicked = className.includes("profile-picture");

    if (targetIsClicked) $dropdown.show();
    if (!targetIsClicked) $dropdown.hide();
  };

  // $(window).hover((event) => {
  //   console.log(event.target.id);
  //   // console.log(event.target.matches("#my-resources-button"));

  //   // if (!event.target.matches('.dropbtn')) {
  //   // var myDropdown = document.getElementById("myDropdown");
  //   //   if (myDropdown.classList.contains('show')) {
  //   //     myDropdown.classList.remove('show');
  //   //   }
  //   // }
  // });

  $loginButton.on("click", () => {
    updateView("login");
  });

  $registerButton.on("click", () => {
    updateView("register");
  });
};
