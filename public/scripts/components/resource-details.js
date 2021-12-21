const timestampToTimeAgo = (timestamp) => timeago.format(new Date(timestamp));

const getHostname = (url) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser.hostname;
};

const displayRating = (rating, numOfRating) => {
  if (!rating) return "No rating yet";
  if (numOfRating === 1) {
    return `${toTwoDecimalPlaces(rating)} (Based on ${numOfRating} rating)`;
  }
  return `${toTwoDecimalPlaces(rating)} (Based on ${numOfRating} ratings)`;
};

const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const makeComment = (username, comment, profilePicture, timeAgo) => {
  const $elm = $(`
  <li class="collection-item avatar hover-pointer">
  <img
    src="${escape(profilePicture)}"
    class="circle profile profile-picture"
  />
    <span class="title">@${escape(username)}</span>
    <p>${escape(comment)}</p>
    <p class="secondary-content">${escape(timeAgo)}</p>
  </li>`);

  return $elm;
};

const commentForm = (imageURL) => {
  const elm = `
  <li
    class="collection-item avatar new-comment-container"
    id="make-new-comment">
    <img
    src="${escape(imageURL)}"
    class="circle profile profile-picture"
  />
    <form class="make-comment">
      <textarea
        id="new-comment"
        class="materialize-textarea"
        name="comment"
      ></textarea>
      <label class="label-icon" for="comment"></label>
      <span id="submit-button" class="fas fa-chevron-circle-right send-comment"></span>
    </form>
  </li>
  `;

  return elm;
};

const commentHelperFunctionsGenerator = (
  commentDetails,
  resourceInfo,
  { $numOfComment, $detailsComments }
) => {
  const compileComments = () => {
    const comments = [];
    for (const details of commentDetails) {
      const {
        comment,
        username,
        timestamp,
        profile_picture_url,
        comment_user_id,
      } = details;
      if (comment) {
        comments.push({
          comment,
          username,
          timeAgo: timestampToTimeAgo(timestamp),
          profile_picture_url,
          comment_user_id,
        });
      }
    }
    return comments;
  };

  const updateNumOfComment = () => {
    $numOfComment.text(resourceInfo.numOfComment);
  };

  const makeComments = () => {
    const comments = compileComments(commentDetails);
    $detailsComments.text("");
    comments.forEach((commentInfo) => {
      const {
        comment,
        username,
        timeAgo,
        profile_picture_url,
        comment_user_id,
      } = commentInfo;

      const $elm = makeComment(username, comment, profile_picture_url, timeAgo);
      $detailsComments.prepend($elm);
      $elm.on("click", () => {
        updateUserDetailsPage(comment_user_id);
      });
    });

    if (resourceInfo.current_username) {
      $detailsComments.prepend(
        commentForm(resourceInfo.my_profile_url)
      );
    }

    $("#submit-button").on("click", async () => {
      if (resourceInfo.current_username) {
        const data = $("#new-comment").serialize();
        if (data.length > 8) {
          $("#new-comment").val("");
          const commentInfo = await commentResource(resourceInfo.id, data);
          const { comment, timestamp, comment_user_id } = commentInfo;
          const userInfo = await getMyDetails();
          const { profile_picture_url, username } = userInfo;
          const newCommentDetails = {
            comment,
            username,
            timestamp,
            profile_picture_url,
            comment_user_id,
          };
          commentDetails.push(newCommentDetails);
          makeComments();
          resourceInfo.numOfComment++;
          updateNumOfComment();
        }
      }
    });
  };

  return { updateNumOfComment, makeComments };
};

const toTwoDecimalPlaces = (numString) => {
  const float = parseFloat(numString);
  const twoDecimal = Math.round(float * 100) / 100;
  return twoDecimal;
};

const getMedia = async (id, $media, is_video, media_url) => {
  const newMedia = await getHtmlFromAPI(id);
  if (newMedia) return $media.html(newMedia.html);
  const $newMedia = is_video
    ? createEmbedVideo(media_url)
    : createScreenshot(media_url);
  $media.append($newMedia);
};

const updateHeart = ($likeIcon, currentLike) => {
  if (currentLike) {
    $likeIcon.addClass("liked");
    $likeIcon.removeClass("not-liked");
  } else {
    $likeIcon.addClass("not-liked");
    $likeIcon.removeClass("liked");
  }
};

const updateResourceDetails = () => {
  const $descriptions = $("#details-desciption");
  const $mediaURL = $("#details-link-on-media");
  const $mediaDisplayedURL = $("#details-display-link-on-media");
  const $title = $("#details-title");
  const $link = $("#details-link");
  const $displayLink = $("#details-display-link");
  const $averageRating = $("#details-average-rating");
  const $numOfComment = $("#details-num-of-comments");
  const $detailsComments = $("#details-comments");
  const $media = $("#details-media");
  const $likesNum = $("#details-likes-num");
  const $likeIcon = $("#details-like-icon");
  const $ratingString = $("#details-rating-string");
  const $1Star = $("#one-star");
  const $2Star = $("#two-star");
  const $3Star = $("#three-star");
  const $4Star = $("#four-star");
  const $5Star = $("#five-star");
  const $detailsStars = $("#details-stars");
  const $createdOn = $("#details-time");
  const $ownerName = $("#details-owner-name");
  const $rating = $("#details-rating");
  const $ownerProfilePicture = $("#owner_profile-picture");
  const $ownerSection = $("#owner-row");
  const starElms = [$1Star, $2Star, $3Star, $4Star, $5Star];

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
        description,
        url,
        title,
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
        averageRating: rating,
        numOfRating: parseInt(number_of_rating),
        currentRating: rated,
        numOfComment: number_of_comment,
        currentLike: liked > 0 ? true : false,
      };

      const domObj = {
        $numOfComment,
        $detailsComments,
      };

      // load media on the left
      getMedia(id, $media, is_video, media_url);

      const { updateNumOfComment, makeComments } =
        commentHelperFunctionsGenerator(resourceComments, resourceInfo, domObj);

      updateNumOfComment();
      makeComments();

      let averageRating = rating;
      let numOfRating = parseInt(number_of_rating);
      let currentRating = rated;
      let numOfComment = number_of_comment;
      let currentLike = liked > 0 ? true : false;

      if (!current_username) {
        $rating.hide();
      } else {
        $rating.show();
      }

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
          updateHeart($likeIcon, currentLike);
        }
      });

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
      updateHeart($likeIcon, currentLike);

      const hostname = getHostname(url);
      $likesNum.text(number_of_like);
      $mediaDisplayedURL.text(hostname);
      $descriptions.text(description);
      $mediaURL.attr("href", url);
      $link.attr("href", url);
      $displayLink.text(hostname);

      $title.text(title);

      $createdOn.text(timestampToTimeAgo(created_on));

      $ownerProfilePicture.attr("src", owner_url);
      $ownerName.text(`${first_name} ${last_name} (@${owner_username})`);
      $ownerSection.unbind();
      $ownerSection.on("click", () => {
        updateUserDetailsPage(owner_id);
      });

      return title;
    } catch (err) {
      console.log(err);
    }
  };
};
