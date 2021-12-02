const createScreenshot = (media_url) => {
  return $(`<img src = ${media_url}/>`);
};

const createEmbedVideo = (media_url, height) => {
  const url = media_url.replaceAll('"', '');
  return $(`
    <iframe
    width="100%"
    height=${height}
    src=${url}
    frameborder="0" allow="accelerometer; autoplay;
    clipboard-write; encrypted-media;
    gyroscope;
    picture-in-picture"
    allowfullscreen>
    </iframe>"`);
};

const getCardAction = (likesAmount, commentsAmount, averageRating) => {
  return $(`
  <div class="card-action">
    <div class="card-summary">
      <i class="fas fa-star card-icon bright"></i>${Number(averageRating) ? Number(averageRating).toFixed(1) : "0"}
    </div>
    <div class="card-summary">
      <i class="fas fa-heart card-icon liked"></i>${likesAmount}
    </div>
    <div class="card-summary">
      <i class="fas fa-comment-alt card-icon"></i>${commentsAmount}
    </div>
  </div>
  `);
};

const getCardContent = (title, description, category, created_on, username) => {
  return $(`
  <div class="card-content" style="padding-top: 0;">
    <h5><span>${title}</span></h5>
    <p>${description}</p>
    <br/>
    <p><span>Added by:</span> @${username}</p>
    <p><span>Added:</span> ${timestampToTimeAgo(created_on)}</p>
    <p><span>Category:</span> ${category[0] + category.substring(1).toLowerCase()}</p>
  </div>
  `);
};

const getUrlLink = (url) => {
  return $(`
  <div class="url-wrapper truncate">
    <a href=${url} class="card-url btn-flat" target="_blank">${url}</a>
  </div>
  `);
};

const registerLikeListener = ($likeLink, id) => {
  // const $like = $(".like-link");

  $likeLink.on("click", async function (e) {
    // $figure = $(this).closest("figure");
    // const resourceId = $figure.attr("id");
    const result = await likeResource(id);
    console.log("id", id);
    // $likedHeart = $(`#${id}`).find(".card-heart");
    if (result) {
      return $likeLink.removeClass("not-liked").addClass("liked");
    }
    $likeLink.removeClass("liked").addClass("not-liked");
  });
};

const getLikeLink = (is_liked) => {
  const colorClass = Number(is_liked) ? "liked" : "not-liked";
  return $(
    `<a class="like-link ${colorClass}"><i class="fas fa-heart card-heart"></i></a>`
  );
};

const clearResources = () => {
  $("#columns").remove();
};

const displayResources = async (resources) => {
  clearResources();
  let renderedResources;
  const { id: currentUserId } = await getMyDetails();
  if (!resources) {
    const result = await getAllResources();
    const { allResources } = result;
    renderedResources = allResources;
  } else {
    renderedResources = resources;
  }
  console.log(renderedResources);
  if (!renderedResources.length) return;

  const $column = $("<div>").attr("id", "columns");

  renderedResources.forEach((resource) => {
    const {
      id,
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
      username,
      number_of_comment,
      rating
    } = resource;

    const $card = $("<div>").addClass("card");
    const videoHeight = 250;
    const $resourceMedia = is_video
      ? createEmbedVideo(media_url, videoHeight)
      : createScreenshot(media_url);
    const $figure = $("<figure>").attr("id", id);

    const $cardAction = getCardAction(likes, number_of_comment, rating);
    const $cardContent = getCardContent(title, description, category, created_on, username);
    const $urlLink = getUrlLink(url);
    const $likeLink = currentUserId ? getLikeLink(is_liked) : $("");
    const $cardImage = $("<div>")
      .addClass("card-image")
      .prepend($urlLink, $likeLink, $resourceMedia);
    const $resourceInfo = $card.prepend($cardImage, $cardContent, $cardAction);
    const $item = $figure.prepend($resourceInfo);

    $item.on("click", async (event) => {
      const tagName = event.target.nodeName;
      if (tagName !== "A" && tagName !== "I") {
        updateView("resourceDetails", null, id);
      }
    });
    registerLikeListener($likeLink, id);

    $column.prepend($item);

    $("#resources-page").prepend($column);
  });
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
