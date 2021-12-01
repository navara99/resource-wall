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

const updateResourceDeails = () => {
  const $descriptions = $("#details-desciption");
  const $mediaURL = $("#details-link-on-media");
  const $mediaDisplayedURL = $("#details-display-link-on-media");
  const $title = $("#details-title");
  const $link = $("#details-link");
  const $rating = $("#details-rating");
  const $numOfComment = $("#details-num-of-comments");
  const $detailsComments = $("#details-comments");
  const $media = $("#details-media");

  return async (resourceDetails) => {
    const {
      id,
      description,
      url,
      title,
      rating,
      number_of_rating,
      number_of_comment,
      my_profile_url,
      is_video,
      media_url
    } = resourceDetails[0];
    try {
      const newMedia = await getHtmlFromAPI(id);
      $media.html(newMedia.html);
    } catch (err) {
      const media = is_video ? createEmbedVideo(media_url) : createScreenshot(media_url);
      $media.html(media);
    }

    const comments = compileComments(resourceDetails);
    $detailsComments.text("").append(commentForm(my_profile_url));

    $("#submit-button").on("click", async () => {
      const $newComment = $("#new-comment");
      const data = $("#new-comment").serialize();
      if (data.length > 8) {
        $newComment.trigger("reset");
        commentResource(id, data);
        const resourceDetails = await getdetailsOfResources(id);
        return updateView("resourceDetails", null, resourceDetails);
      }
    });

    comments.forEach((commentInfo) => {
      const { comment, username, timeAgo, image_url } = commentInfo;
      const elm = makeComment(username, comment, image_url, timeAgo);
      $detailsComments.append(elm);
    });
    const hostname = getHostname(url);
    const ratingText = displayRating(rating, number_of_rating);

    $mediaDisplayedURL.text(hostname);
    $descriptions.text(description);
    $mediaURL.attr("href", url);
    $link.attr("href", url);
    $link.text(hostname);
    $rating.text(ratingText);
    $title.text(title);
    $numOfComment.text(number_of_comment);
  };
};
