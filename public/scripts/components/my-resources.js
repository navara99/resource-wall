const createThumbnail = (is_video, media_url) => {
  const videoHeight = 150;
  const media = is_video
    ? createEmbedVideo(media_url, videoHeight)
    : createScreenshot(media_url);
  return $(`
  <div class="thumbnail-container">
    <div class="media">
      ${media.prop("outerHTML")}
    </div>
  </div>
`);
};

const createInfo = (
  title,
  url,
  description,
  category,
  created_on,
  username
) => {
  return $(`
  <div class="text">
    <h6 class="my-resource-title">${title}</h6>
    <div><span>URL: </span><a href="${url}" class="paragraph truncate">${url}</a></div>
    <div><span>Description: </span> ${description}</div>
    <div><span>Added by: </span> @${username}</div>
    <div><span>Added:</span> ${timestampToTimeAgo(created_on)}</div>
    <div><span>Category:</span> ${category[0] + category.substring(1).toLowerCase()}</div>
  </div>
  `);
};

const getStats = (likes, ratings, comments) => {
  return $(`
  <div class="stat">
  <span class="stat-column">
    <span class="fas fa-star card-icon bright"></span>
    <span>${Number(ratings) ? Number(ratings).toFixed(1) : "0"}</span>
  </span>
  <span class="stat-column">
    <span class="fas fa-heart card-icon liked"></span>
    <span>${likes}</span>
  </span>
  <span class="stat-column">
    <span class="fas fa-comment-alt card-icon"></span>
    <span>${comments}</span>
  </span>
  </div>
  `);
};

const clearMyResources = () => {
  $("#my-resource-list").remove();
};

const renderMyResources = async() => {
  try {
    clearMyResources();
    const { id } = await getMyDetails();
    const myResources = await getMyResources();
    console.log(myResources);

    const $listContainer = $("<ul>")
      .attr("id", "my-resource-list")
      .addClass("collection comments");

    myResources.forEach((resource) => {
      const {
        user_id,
        title,
        description,
        url,
        media_url,
        created_on,
        is_video,
        is_liked,
        likes,
        category,
        number_of_comment,
        rating,
        username,
      } = resource;

      console.log(number_of_comment);
      const showLiked =
        $("#liked-filter:checked").val() &&
        Number(is_liked) === 1 &&
        user_id !== id;
      const showMine = $("#mine-filter:checked").val() && user_id === id;
      console.log(user_id, id);
      console.log(showLiked, showMine);

      if (showLiked || showMine) {
        const $collection = $("<li>");
        const $thumbnail = createThumbnail(is_video, media_url);
        const $info = createInfo(
          title,
          url,
          description,
          category,
          created_on,
          username
        );
        const $stats = getStats(likes, rating, number_of_comment);
        $collection.prepend($thumbnail, $info, $stats);
        $listContainer.prepend($collection);
        $("#my-resources-details").append($listContainer);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const registerCheckListeners = async() => {
  $("#liked-filter").on("change", function() {
    renderMyResources();
  });

  $("#mine-filter").on("change", function() {
    renderMyResources();
  });
};

{
  /* <div id="my-resources-details" >
<h3 class="title">My Resources</h3>
<ul class="collection comments" id="my-resource-list">
</ul>
</div> */
}

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

{
  /* <li class="collection-item">
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
</li> */
}
