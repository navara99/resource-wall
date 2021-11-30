const createScreenshot = (media_url) => {
  return $(`<img src = ${media_url}/>`)
};

const createEmbedVideo = (media_url) => {
  return $(`
    <iframe
    width="100%"
    height="250"
    src=${media_url}
    frameborder="0" allow="accelerometer; autoplay;
    clipboard-write; encrypted-media;
    gyroscope;
    picture-in-picture"
    allowfullscreen>
    </iframe>"`
  );
};

const getCardAction = (likesAmount, commentsAmount, averageRating) => {
  return $(`
  <div class="card-action">
    <div class="card-summary">
      <i class="fas fa-star card-icon"></i>4.5
    </div>
    <div class="card-summary">
      <i class="fas fa-heart card-icon"></i>100
    </div>
    <div class="card-summary">
      <i class="fas fa-comment-alt card-icon"></i>30
    </div>
  </div>
  `)
};

const getCardContent = (description) => {
  return $(`<div class="card-content"><p>${description}</p></div>`);
};

const getCardTitle = (title) => {
  return $(`<span class="card-title">${title}</span>`);
};

const getUrlLink = (url) => {
  return $(`
  <div class="url-wrapper truncate">
    <a href=${url} class="card-url btn-flat">${url}</a>
  </div>
  `);
};

const registerLikeListener = () => {
  const $like = $(".like-link");

  $like.on("click", function (e) {
    $figure = $(this).closest("figure");
    const resourceId = $figure.attr("id");
    likeResource(resourceId, user_id);
    displayResources();
  });

};

const getLikeLink = () => {
  return $(`<a class="like-link"><i class="fas fa-heart card-heart"></i></a>`);
};

const clearResources = () => {
  $("#columns").remove();
};

const displayResources = async () => {
  clearResources();
  const result = await getAllResources();
  const { allResources } = result;
  const $column = $("<div>").attr("id", "columns");

  allResources.forEach((resource) => {
    const { id, user_id, title, description, url, media_url, created_on, is_video } = resource;

    const $card = $("<div>").addClass("card");
    const $resourceMedia = is_video ? createEmbedVideo(media_url) : createScreenshot(media_url);
    const $figure = $("<figure>").attr("id", id);

    const $cardAction = getCardAction();
    const $cardContent = getCardContent(description);
    const $cardTitle = getCardTitle(title);
    const $urlLink = getUrlLink(url);
    const $likeLink = getLikeLink();
    const $cardImage = $("<div>").addClass("card-image").prepend($urlLink, $likeLink, $resourceMedia, $cardTitle);
    const $resourceInfo = $card.prepend($cardImage, $cardContent, $cardAction);
    const $item = $figure.prepend($resourceInfo);
    $column.prepend($item);

    $("#resources-page").prepend($column);

  });

  registerLikeListener();
};
