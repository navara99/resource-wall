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
  const parser = document.createElement('a');
  parser.href = url;
  return parser.hostname;
};

const updateResourceDeails = () => {
  const $descriptions = $("#details-desciption");
  const $mediaURL = $("#details-link-on-media");
  const $mediaDisplayedURL = $("#details-display-link-on-media");
  const $title = $("#details-title");
  const $link = $("#details-link");

  return (resourceDetails) => {
    const { description, url, title } = resourceDetails[0];
    const comments = compileComments(resourceDetails);
    const hostname = getHostname(url);

    $mediaDisplayedURL.text(hostname);
    $descriptions.text(description);
    $mediaURL.attr("href", url);
    $link.attr("href", url);
    $link.text(hostname);
    $title.text(title);
  };
};
