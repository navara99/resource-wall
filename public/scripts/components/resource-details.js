const compileComments = (resourceDetails) => {
  const comments = [];
  for (const details of resourceDetails) {
    const { comment, username, timestamp } = details;
    if (!comment) {
      comments.push({ comment, username, timestamp });
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

const updateResourceDeails = () => {
  const $descriptions = $("#details-desciption");
  const $mediaURL = $("#details-link-on-media");
  const $mediaDisplayedURL = $("#details-display-link-on-media");
  const $title = $("#details-title");
  const $link = $("#details-link");
  const $rating = $("#details-rating");

  return (resourceDetails) => {
    const { description, url, title, rating, number_of_rating } =
      resourceDetails[0];
    const comments = compileComments(resourceDetails);
    const hostname = getHostname(url);
    const ratingText = displayRating(rating, number_of_rating);

    $mediaDisplayedURL.text(hostname);
    $descriptions.text(description);
    $mediaURL.attr("href", url);
    $link.attr("href", url);
    $link.text(hostname);
    $rating.text(ratingText);
    $title.text(title);
  };
};
