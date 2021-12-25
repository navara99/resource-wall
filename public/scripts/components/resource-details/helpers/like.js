const likeSetup = (resourceInfo, domObj) => {
  const { $likeIcon, $likesNum } = domObj;
  const { current_username, id } = resourceInfo;
  let { currentLike, numOfLike } = resourceInfo;

  const updateNumOfLikes = () => {
    $likesNum.text(numOfLike);
  };

  const updateHeart = () => {
    if (currentLike) {
      $likeIcon.addClass("liked");
      $likeIcon.removeClass("not-liked");
    } else {
      $likeIcon.addClass("not-liked");
      $likeIcon.removeClass("liked");
    }
  };

  const likeIconEventListener = () => {
    // clear any previous event listener on the like icon
    $likeIcon.off();

    $likeIcon.on("click", function() {
      if (current_username) {
        likeResource(id);
        currentLike = !currentLike;
        numOfLike = currentLike ? numOfLike + 1 : numOfLike - 1;
        updateNumOfLikes();
        updateHeart();
      }
    });
  };

  const initSetup = () => {
    updateNumOfLikes();
    updateHeart();
    likeIconEventListener();
  };

  return initSetup;
};
