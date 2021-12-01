const dateToTimeAgo = (timestamp) => timeago.format(timestamp);

const compileComments = (resourceDetails) => {
  const comments = [];
  for (const details of resourceDetails) {
    const { comment, username, timestamp, image_URL } = details;
    if (comment) {
      comments.push({ comment, username, timeAgo: dateToTimeAgo(new Date(timestamp)), image_URL });
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
    ? `${rating} (Based on ${numOfRating} ratings)`
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
  <li class="collection-item avatar" id="details-comments">
    <img src="${escape(profilePicture)}">
    <span class="title">@${escape(username)}</span>
    <p>${escape(comment)}</p>
    <p class="secondary-content">${escape(timeAgo)}</p>
  </li>`;
  return elm;
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

  return (resourceDetails) => {
    const { description, url, title, rating, number_of_rating, number_of_comment } =
      resourceDetails[0];
    const comments = compileComments(resourceDetails);
    $detailsComments.text("");
    comments.forEach((commentInfo) => {
      const { comment, username, timeAgo, image_URL } = commentInfo;
      const elm = makeComment(username, comment, image_URL, timeAgo);
      console.log(elm);
      $detailsComments.append(elm);
    })
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
