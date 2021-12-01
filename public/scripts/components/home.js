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
      <i class="fas fa-star card-icon"></i>${likesAmount}
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

const getCardContent = (title, description, category) => {
  return $(`
  <div class="card-content" style="padding-top: 0;">
  <h5>${title}</h5>
  <p>${description}</p>
  <br/>
  <p>Category: ${category[0] + category.substring(1).toLowerCase()}</p>
  </div>

  `);
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

  $like.on("click", async function (e) {
    $figure = $(this).closest("figure");
    const resourceId = $figure.attr("id");
    const result = await likeResource(resourceId);
    const { resource_id } = result[0]
    $likedHeart = $(`#${resource_id}`).find(".card-heart");
    $likedHeart.removeClass("not-liked").addClass("liked");
  });

};

const getLikeLink = (is_liked) => {
  const colorClass = Number(is_liked) ? "liked" : "not-liked";
  return $(`<a class="like-link"><i class="fas fa-heart card-heart ${colorClass}"></i></a>`);
};

const clearResources = () => {
  $("#columns").remove();
};

const displayResources = async (resources) => {
  clearResources();
  let renderedResources;

  if (!resources) {
    const result = await getAllResources();
    const { allResources } = result;
    renderedResources = allResources;
  } else {
    renderedResources = resources;
  }

  if (!renderedResources.length) return;

  const $column = $("<div>").attr("id", "columns");

  renderedResources.forEach((resource) => {
    const { id, user_id, title, description, url, media_url, created_on, is_video, is_liked, likes, category } = resource;

    const $card = $("<div>").addClass("card");
    const $resourceMedia = is_video ? createEmbedVideo(media_url) : createScreenshot(media_url);
    const $figure = $("<figure>").attr("id", id);

    const $cardAction = getCardAction(likes);
    const $cardContent = getCardContent(title, description, category);
    const $urlLink = getUrlLink(url);
    const $likeLink = getLikeLink(is_liked);
    const $cardImage = $("<div>").addClass("card-image").prepend($urlLink, $likeLink, $resourceMedia);
    const $resourceInfo = $card.prepend($cardImage, $cardContent, $cardAction);
    const $item = $figure.prepend($resourceInfo);
    $column.prepend($item);

    $("#resources-page").prepend($column);
  });

  registerLikeListener();
};

const registerSearchListener = () => {

  const $searchBar = $(`#search`);

  $searchBar.on("input", async (e) => {
    const query = e.target.value;
    if (!query) return displayResources();
    const { allResources } = await searchResource(query);
    displayResources(allResources);
  });

};

