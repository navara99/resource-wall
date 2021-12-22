const likeSetup = (resourceInfo, domObj) => {
  const { $likeIcon, $likesNum } = domObj;
  const { current_username, id } = resourceInfo;
  let { currentLike, number_of_like } = resourceInfo;

  const updateNumOfLikes = () => {
    $likesNum.text(number_of_like);
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

    $likeIcon.on("click", function () {
      if (current_username) {
        likeResource(id);
        currentLike = !currentLike;
        number_of_like = currentLike ? number_of_like + 1 : number_of_like - 1;
        updateNumOfLikes();
        updateHeart();
      }
    });
  };

  const initLikeSetup = () => {
    updateNumOfLikes();
    updateHeart();
    likeIconEventListener();
  }

  return initLikeSetup;
};
