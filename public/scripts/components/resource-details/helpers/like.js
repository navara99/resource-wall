const likeHelperFunctionsGenerator = (resourceInfo, domObj) => {
  const { $likeIcon, $likesNum } = domObj;
  const { current_username, id } = resourceInfo;
  let { currentLike } = resourceInfo;

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
        const numOfLike = $likesNum.text();
        const newNumOfLike = currentLike
          ? parseInt(numOfLike) + 1
          : parseInt(numOfLike) - 1;
        $likesNum.text(newNumOfLike);
        updateHeart(currentLike);
      }
    });
  };

  return { updateHeart, likeIconEventListener };
};
