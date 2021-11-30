const myResourcesPageHandler = () => {
  const $myResoucesButton = $("#side-my-resources-button");
  const $myButtonBorder = $("#my-button-border");
  const $myResourcesPage = $("#my-resources-details");
  const $likedResourcesButton = $("#side-liked-resources-button");
  const $likedButtonBorder = $("#liked-button-border");
  const $likedResourcesPage = $("#liked-resources-details");

  const showMyResources = () => {
    $likedButtonBorder.hide();
    $likedResourcesPage.hide();
    $myButtonBorder.show();
    $myResourcesPage.show();
  };

  const showLikedResources = () => {
    $myButtonBorder.hide();
    $myResourcesPage.hide();
    $likedButtonBorder.show();
    $likedResourcesPage.show();
  };

  const resourcesButtonsEventListener = () => {
    $likedResourcesButton.on("click", () => {
      showLikedResources();
    });

    $myResoucesButton.on("click", () => {
      showMyResources();
    });
  };

  return { showMyResources, showLikedResources, resourcesButtonsEventListener };
};
