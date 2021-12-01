const timestampToTimeAgo = (timestamp) => timeago.format(new Date(timestamp));

const compileComments = (resourceDetails) => {
  const comments = [];
  for (const details of resourceDetails) {
    const { comment, username, timestamp, image_url } = details;
    if (comment) {
      comments.push({
        comment,
        username,
        timeAgo: timestampToTimeAgo(timestamp),
        image_url,
      });
    }
  }
  return comments;
};

const getHostname = (url) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser.hostname;
};

const displayRating = (rating, numOfRating) => {
  const displayStr = rating
    ? `${toTwoDecimalPlaces(rating)} (Based on ${numOfRating} ratings)`
    : "No rating yet";
  return displayStr;
};

const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const makeComment = (username, comment, profilePicture, timeAgo) => {
  const elm = `
  <li class="collection-item avatar">
  <img
    src="${escape(profilePicture)}"
    class="circle profile profile-picture"
  />
    <span class="title">@${escape(username)}</span>
    <p>${escape(comment)}</p>
    <p class="secondary-content">${escape(timeAgo)}</p>
  </li>`;
  return elm;
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

const toTwoDecimalPlaces = (numString) => {
  const float = parseFloat(numString);
  const twoDecimal = Math.round(float * 100) / 100;
  return twoDecimal;
};

const updateResourceDetails = () => {
  const $descriptions = $("#details-desciption");
  const $mediaURL = $("#details-link-on-media");
  const $mediaDisplayedURL = $("#details-display-link-on-media");
  const $title = $("#details-title");
  const $link = $("#details-link");
  const $displayLink = $("#details-display-link");
  const $rating = $("#details-rating");
  const $numOfComment = $("#details-num-of-comments");
  const $detailsComments = $("#details-comments");
  const $media = $("#details-media");
  const $likesNum = $("#details-likes-num");
  const $likeIcon = $("#details-like-icon");

  return async (id) => {
    const resourceDetails = await getdetailsOfResources(id);

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
    } = resourceDetails[0];

    const newMedia = await getHtmlFromAPI(id);
    const { html } = newMedia;
    if (html) {
      $media.html(newMedia.html);
    } else {
      const $newMedia = is_video
        ? createEmbedVideo(media_url)
        : createScreenshot(media_url);
      $media.append($newMedia);
    }

    if (liked > 0) {
      $likeIcon.addClass("liked");
      $likeIcon.removeClass("not-liked");
    } else {
      $likeIcon.addClass("not-liked");
      $likeIcon.removeClass("liked");
    }

    const makeComments = (resourceDetails) => {

      const comments = compileComments(resourceDetails);
      $detailsComments.text("");



      comments.forEach((commentInfo) => {
        const { comment, username, timeAgo, image_url } = commentInfo;
        const elm = makeComment(username, comment, image_url, timeAgo);
        $detailsComments.prepend(elm);
      });

      if (current_username) $detailsComments.prepend(commentForm(my_profile_url));

      $("#submit-button").on("click", async () => {
        const data = $("#new-comment").serialize();
        if (data.length > 8) {
          $("#new-comment").val("");
          const commentInfo = await commentResource(id, data);
          const { comment, user_id, timestamp } = commentInfo;
          const userInfo = await getMyDetails(user_id);
          const { image_url, username } = userInfo;
          const commentDetails = { comment, username, timestamp, image_url };
          commentsDetails.push(commentDetails);
          makeComments(commentsDetails);
        }
      });
    }
    let commentsDetails = [...resourceDetails];

    makeComments(commentsDetails);


    // const addComment = async (commentInfo) => {
    //   const { comment, user_id, timestamp } = commentInfo;
    //   const timeAgo = timestampToTimeAgo(timestamp);
    //   const userInfo = await getMyDetails(user_id);
    //   const { image_url, username } = userInfo;
    //   const elm = makeComment(username, comment, image_url, timeAgo);
    //   $("#details-comments>li:eq(0)").after(elm);
    // };



    const hostname = getHostname(url);
    const ratingText = displayRating(rating, number_of_rating);

    $likesNum.text(number_of_like);
    $mediaDisplayedURL.text(hostname);
    $descriptions.text(description);
    $mediaURL.attr("href", url);
    $link.attr("href", url);
    $displayLink.text(hostname);
    $rating.text(ratingText);
    $title.text(title);
    $numOfComment.text(number_of_comment);

    return title;
  };
};
