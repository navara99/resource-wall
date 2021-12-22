const timestampToTimeAgo = (timestamp) => timeago.format(new Date(timestamp));

const getHostname = (url) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser.hostname;
};

const initDisplay = (resourceInfo, domObj) => {
  const {
    owner_id,
    first_name,
    last_name,
    owner_username,
    owner_url,
    created_on,
    url,
    description,
    title,
  } = resourceInfo;

  const {
    $mediaURL,
    $ownerSection,
    $ownerName,
    $createdOn,
    $title,
    $ownerProfilePicture,
    $mediaDisplayedURL,
    $descriptions,
    $link,
    $displayLink,
  } = domObj;

  const hostname = getHostname(url);

  $title.text(title);
  $descriptions.text(description);

  $mediaURL.attr("href", url);
  $mediaDisplayedURL.text(hostname);
  $link.attr("href", url);
  $displayLink.text(hostname);

  $ownerProfilePicture.attr("src", owner_url);
  $ownerName.text(`${first_name} ${last_name} (@${owner_username})`);
  $ownerSection.unbind();
  $ownerSection.on("click", () => {
    updateUserDetailsPage(owner_id);
  });

  $createdOn.text(timestampToTimeAgo(created_on));
};

const getMedia = async (id, is_video, media_url, $media) => {
  const newMedia = await getHtmlFromAPI(id);
  if (newMedia) return $media.html(newMedia.html);
  const $newMedia = is_video
    ? createEmbedVideo(media_url)
    : createScreenshot(media_url);
  $media.append($newMedia);
};

const updateResourceDetails = () => {
  const $averageRating = $("#details-average-rating");
  const $media = $("#details-media");
  const $likesNum = $("#details-likes-num");
  const $ratingString = $("#details-rating-string");
  const $1Star = $("#one-star");
  const $2Star = $("#two-star");
  const $3Star = $("#three-star");
  const $4Star = $("#four-star");
  const $5Star = $("#five-star");
  const $detailsStars = $("#details-stars");
  const $rating = $("#details-rating");
  const starElms = [$1Star, $2Star, $3Star, $4Star, $5Star];

  const domObj = {
    $numOfComment: $("#details-num-of-comments"),
    $detailsComments: $("#details-comments"),
    $likeIcon: $("#details-like-icon"),
    $likesNum,
  };

  const domObjForSetUp = {
    $mediaURL: $("#details-link-on-media"),
    $ownerSection: $("#owner_profile-picture"),
    $ownerName: $("#details-owner-name"),
    $createdOn: $("#details-time"),
    $title: $("#details-title"),
    $ownerProfilePicture: $("#owner_profile-picture"),
    $mediaDisplayedURL: $("#details-display-link-on-media"),
    $descriptions: $("#details-desciption"),
    $link: $("#details-link"),
    $displayLink: $("#details-display-link"),
  };

  return async (id) => {
    try {
      const resourceComments = await getdetailsOfResources(id);

      $media.html("");
      const {
        description,
        url,
        title,
        rating,
        number_of_rating,
        number_of_comment,
        my_profile_url,
        is_video,
        media_url,
        number_of_like,
        liked,
        current_username,
        rated,
        created_on,
        owner_username,
        owner_id,
        first_name,
        last_name,
        owner_url,
      } = resourceComments[0];

      const resourceInfo = {
        id,
        current_username,
        my_profile_url,
        number_of_comment,
        currentLike: liked > 0 ? true : false,
      };

      const infoForSetUp = {
        id,
        owner_id,
        first_name,
        last_name,
        owner_username,
        owner_url,
        created_on,
        url,
        description,
        title,
      };

      initDisplay(infoForSetUp, domObjForSetUp);

      // load media on the left
      getMedia(id, is_video, media_url, $media);

      const { updateNumOfComment, makeComments } =
        commentHelperFunctionsGenerator(resourceComments, resourceInfo, domObj);

      updateNumOfComment();
      makeComments();

      const { updateHeart, likeIconEventListener } =
        likeHelperFunctionsGenerator(resourceInfo, domObj);

      updateHeart();
      likeIconEventListener();
      $likesNum.text(number_of_like);

      let averageRating = rating;
      let numOfRating = parseInt(number_of_rating);
      let currentRating = rated;

      if (!current_username) {
        $rating.hide();
      } else {
        $rating.show();
      }

      const addClassToStars = () => {
        const rate = currentRating || 0;
        for (let i = 0; i < rate; i++) {
          starElms[i].addClass("bright");
        }
        for (let i = rate; i < 5; i++) {
          starElms[i].removeClass("bright");
        }
      };

      const updateRatingStr = () => {
        if (!currentRating) return $ratingString.html("Rate it:&nbsp;");
        addClassToStars(currentRating);
        $ratingString.html("You rated:&nbsp;");
      };

      $detailsStars
        .mouseenter(() => {
          starElms.forEach((elm) => elm.removeClass("bright"));
        })
        .mouseleave(() => {
          addClassToStars(currentRating);
        });

      const ratingOnClick = ($elm, id, newRating) => {
        $elm.unbind();
        $elm.on("click", async () => {
          if (current_username) {
            const isNewRating = await rateResource(id, `rating=${newRating}`);
            if (isNewRating) {
              numOfRating++;
              averageRating = averageRating
                ? (averageRating * numOfRating + newRating) / numOfRating
                : newRating;
            } else {
              averageRating =
                (averageRating * numOfRating - currentRating + newRating) /
                numOfRating;
            }
            currentRating = newRating;
            updateRating();
            updateRatingStr();
          }
        });
      };

      starElms.forEach((elm, index) => ratingOnClick(elm, id, index + 1));

      const updateRating = () => {
        const ratingText = displayRating(averageRating, numOfRating);
        $averageRating.text(ratingText);
      };
      updateRatingStr();
      updateRating();

      return title;
    } catch (err) {
      console.log(err);
    }
  };
};
