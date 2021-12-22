const thumbnailElementGenerator = (resource, videoHeight = 250) => {
  const { media_url } = resource;

  const createScreenshot = () => $(`<img src = ${media_url}/>`);

  const createEmbedVideo = () => {
    const url = media_url.replaceAll('"', "");
    return $(`
      <iframe
      width="100%"
      height=${videoHeight}
      src=${url}
      frameborder="0" allow="accelerometer; autoplay;
      clipboard-write; encrypted-media;
      gyroscope;
      picture-in-picture"
      allowfullscreen>
      </iframe>"`);
  };

  return { createScreenshot, createEmbedVideo };
};

const cardSetup = (resource, currentUserId, $column) => {
  const {
    id,
    likes,
    number_of_comment,
    rating,
    title,
    description,
    category,
    created_on,
    username,
    is_video,
    url,
    is_liked,
  } = resource;

  const { createScreenshot, createEmbedVideo } =
    thumbnailElementGenerator(resource);

  const $cardContent = $(`
    <div class="card-content" style="padding-top: 0;">
      <h5><span>${title}</span></h5>
      <p>${description}</p>
      <br/>
      <p><span>Added by:</span> @${username}</p>
      <p><span>Added:</span> ${timestampToTimeAgo(created_on)}</p>
      <p><span>Category:</span>
        ${category[0] + category.substring(1).toLowerCase()}
      </p>
    </div>
  `);

  const $resourceMedia = is_video ? createEmbedVideo() : createScreenshot();

  const $cardAction = $(`
    <div class="card-action">
      <div class="card-summary">
        <i class="fas fa-star card-icon bright"></i>${
          Number(rating) ? Number(rating).toFixed(1) : "0"
        }
      </div>
      <div class="card-summary">
        <i class="fas fa-heart card-icon liked"></i>${likes}
      </div>
      <div class="card-summary">
        <i class="fas fa-comment-alt card-icon"></i>${number_of_comment}
      </div>
    </div>
    `);

  const $card = $("<div>").addClass("card");

  const $figure = $("<figure>").attr("id", id);

  const $urlLink = $(`
    <div class="url-wrapper truncate">
      <a href=${url} class="card-url btn-flat" target="_blank">${url}</a>
    </div>
    `);

  const colorClass = Number(is_liked) ? "liked" : "not-liked";
  const getLikeLink = $(
    `<a class="like-link ${colorClass}"><i class="fas fa-heart card-heart"></i></a>`
  );

  const $likeLink = currentUserId ? getLikeLink : $("");

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

  $likeLink.on("click", async function () {
    const result = await likeResource(id);

    if (result) {
      return $likeLink.removeClass("not-liked").addClass("liked");
    }
    $likeLink.removeClass("liked").addClass("not-liked");
  });

  $column.prepend($item);
};

const displayResourcesFunctionGenerator = () => {
  const $column = $("#columns");

  const clearResources = () => $column.html("");

  return async (resources) => {
    clearResources();

    try {
      const { id: currentUserId } = await getMyDetails();

      const renderedResources =
        resources || (await getAllResources()).allResources;

      if (!renderedResources.length) return;

      renderedResources.forEach((resource) =>
        cardSetup(resource, currentUserId, $column)
      );
    } catch (e) {
      updateError(e.responseText);
      updateView("error");
    }
  };
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

const registerTabListener = () => {
  const $tab = $(".tab").children("a");
  $tab.on("click", async function () {
    const filterCategory = $(this).attr("id");
    if (filterCategory === "ALL") return displayResources();
    const filteredResources = await getResourcesByCategory(filterCategory);
    const { resourceByCategory } = filteredResources;
    displayResources(resourceByCategory);
  });
};
