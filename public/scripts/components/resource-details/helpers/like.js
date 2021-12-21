const updateHeart = ($likeIcon, currentLike) => {
  if (currentLike) {
    $likeIcon.addClass("liked");
    $likeIcon.removeClass("not-liked");
  } else {
    $likeIcon.addClass("not-liked");
    $likeIcon.removeClass("liked");
  }
};
