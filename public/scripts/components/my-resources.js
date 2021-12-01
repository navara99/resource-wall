const createThumbnail = (is_video, media_url) => {
  const videoHeight = 150;
  const media = is_video ? createEmbedVideo(media_url, videoHeight) : createScreenshot(media_url);
  return $(`
  <div class="thumbnail-container">
    <div class="media">
      ${media.prop("outerHTML")}
    </div>
  </div>
`)
};

const createInfo = (title, url, description, category) => {
  return $(`
  <div class="text">
  <h6>${title}</h6>
  <a href="${url}" class="paragraph truncate">${url}</a>
  <div>${description}</div>
  <div>Category: ${category[0] + category.substring(1).toLowerCase()}</div>
  </div>
  `
  );
};

const getStats = (likes) => {
  return $(`
  <div class="stat">
  <span class="stat-column">
    <span class="fas fa-star card-icon"></span>
    <span>4.5</span>
  </span>
  <span class="stat-column">
    <span class="fas fa-heart card-icon"></span>
    <span>${likes}</span>
  </span>
  <span class="stat-column">
    <span class="fas fa-comment-alt card-icon"></span>
    <span>4</span>
  </span>
  </div>
  `)
};

const clearMyResources = () => {
  $("#my-resource-list").remove();
};

const renderMyResources = async () => {
  clearMyResources()
  const myResources = await getMyResources();
  const $listContainer = $("<ul>").attr("id", "my-resource-list").addClass("collection comments");

  myResources.forEach((resource) => {
    const { id, user_id, title, description, url, media_url, created_on, is_video, is_liked, likes, category } = resource;
    const $collection = $("<li>");
    const $thumbnail = createThumbnail(is_video, media_url);
    const $info = createInfo(title, url, description, category);
    const $stats = getStats(likes);
    $collection.prepend($thumbnail, $info, $stats);
    $listContainer.prepend($collection);

    $("#my-resources-details").append($listContainer);
  });

}

{/* <div id="my-resources-details" >
<h3 class="title">My Resources</h3>
<ul class="collection comments" id="my-resource-list">
</ul>
</div> */}

// const $column = $("<div>").attr("id", "columns");

// renderedResources.forEach((resource) => {
//   const { id, user_id, title, description, url, media_url, created_on, is_video, is_liked, likes, category } = resource;

//   const $card = $("<div>").addClass("card");
//   const $resourceMedia = is_video ? createEmbedVideo(media_url) : createScreenshot(media_url);
//   const $figure = $("<figure>").attr("id", id);

//   const $cardAction = getCardAction(likes);
//   const $cardContent = getCardContent(title, description, category);
//   const $urlLink = getUrlLink(url);
//   const $likeLink = getLikeLink(is_liked);
//   const $cardImage = $("<div>").addClass("card-image").prepend($urlLink, $likeLink, $resourceMedia);
//   const $resourceInfo = $card.prepend($cardImage, $cardContent, $cardAction);
//   const $item = $figure.prepend($resourceInfo);
//   $column.prepend($item);

//   $("#resources-page").prepend($column);


{/* <li class="collection-item">
  <div class="resource-thumbnail">
    <div class="thumbnail-container">
      <div class="media">
        <img
          alt=""
          src="https://i.redd.it/jeuusd992wd41.jpg"
          class="thumbnail"
        />
      </div>
    </div>

    <div class="text">
      <h6>T waistcoat stree</h6>
      <a href="wwww.google.com" class="paragraph">wwww.google.com</a>
      <div>
        cleanse intelligentsia lo-fi try-hard heirloom tofu
        retro offal raclette art a bird on it vis
      </div>
    </div>

    <div class="stat">
      <span class="stat-column">
        <span class="fas fa-star card-icon"></span>
        <span>4.5</span>
      </span>
      <span class="stat-column">
        <span class="fas fa-heart card-icon"></span>
        <span>100</span>
      </span>
      <span class="stat-column">
        <span class="fas fa-comment-alt card-icon"></span>
        <span>4</span>
      </span>
    </div>
  </div>
</li> */}
