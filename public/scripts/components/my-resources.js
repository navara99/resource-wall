const myResourcesSetup = (resource, myId, $listContainer) => {
  const {
    title,
    url,
    description,
    category,
    created_on,
    username,
    likes,
    rating,
    number_of_comment,
    id,
    is_video,
    media_url,
    user_id,
    is_liked,
  } = resource;

  const isMine = user_id === myId;
  const videoHeight = 150;

  const { createEmbedVideo, createScreenshot } = thumbnailElementGenerator(
    resource,
    videoHeight
  );

  const registerMyResourceButtonsListeners = () => {
    if (!isMine) return;

    $(`#${id}-delete`).on("click", async function (e) {
      try {
        await deleteResource(id);
        renderMyResources();
      } catch (err) {
        updateError(err);
      }
    });

    $(`#${id}-edit`).on("click", function (e) {});
  };

  const $info = $(`
    <div class="text">
      <a class="my-resource-title" id=${id}-my-resource >${partialText(title,10)}</a>
      <div>
        <span>URL: </span>
        <a href="${url}" onclick="event.stopPropagation();" class="paragraph truncate">${url}</a>
      </div>
      <div>
        <span>Description: </span> ${partialText(description, 35)}
      </div>
      <div>
        <span>Added by: </span> @${username}
      </div>
      <div>
        <span>Added:</span>
        ${timestampToTimeAgo(created_on)}
      </div>
      <div>
        <span>Category:</span>
        ${category[0] + category.substring(1).toLowerCase()}
      </div>
    </div>
  `);

  const media = is_video
    ? createEmbedVideo(media_url, videoHeight)
    : createScreenshot(media_url);

  const $thumbnail = $(`
    <div class="thumbnail-container">
      <div class="media">
        ${media.prop("outerHTML")}
      </div>
    </div>
  `);

  const $modal = $(`
      <div id="${id}-confirm-delete" class="modal">
        <a href="#!" id="close-confirm-delete" class="modal-close  waves-effect waves-light btn-flat">
          <i class="material-icons right">close</i>
        </a>
        <div class="modal-content">
          <h4>Are you sure?</h4>
          <p>Are you sure you want to delete ${title}?</p>
        </div>
        <div class="modal-footer">
          <a href="#!" id="${id}-delete" class="modal-close  waves-effect waves-light red btn">Confirm</a>
      </div>
    </div>
  `);

  const noButtons = !isMine ? "invisible" : "";
  const actionButtons = `
      <a id = "${id}-edit" class="waves-effect waves-light btn ${noButtons}">
        <i class="material-icons left">
          edit
        </i>
        Edit
      </a>
      <a id="${id}-delete"
        class="waves-effect waves-light btn modal-trigger ${noButtons} red"
        href="#${id}-confirm-delete"
        >
        <i class="material-icons left">
          delete
        </i>
        Delete
      </a>
    `;

  const $stats = $(`
    <div class="stat-container">
      <div class="stat">
        <span class="stat-column">
          <span class="fas fa-star card-icon bright"></span>
          <span>${Number(rating) ? Number(rating).toFixed(1) : "0"}</span>
        </span>
        <span class="stat-column">
          <span class="fas fa-heart card-icon liked"></span>
          <span>${likes}</span>
        </span>
        <span class="stat-column">
          <span class="fas fa-comment-alt card-icon"></span>
          <span>${number_of_comment}</span>
        </span>
      </div>
      <div class="resource-actions">
        ${actionButtons}
      </div>
    </div>
  `);

  const registerMyResourceDetailsListener = () => {
    $(`#${id}-my-resource`).on("click", function (e) {
      updateView("resourceDetails", null, id);
    });
  };

  const showLiked =
    $("#liked-filter:checked").val() &&
    Number(is_liked) === 1 &&
    user_id !== myId;

  const showMine = $("#mine-filter:checked").val() && user_id === myId;

  return () => {
    if (showLiked || showMine) {
      const $collection = $(`<li class="collection-item"></li>`);

      if (isMine) $("body").prepend($modal);

      $collection.prepend($thumbnail, $info, $stats);
      $listContainer.prepend($collection);

      registerMyResourceButtonsListeners();
      registerMyResourceDetailsListener();
    }
  };
};

// top-level function
const renderMyResourcesFunctionGenerator = () => {
  const $listContainer = $("#my-resource-list");

  const clearMyResources = () => {
    $listContainer.html("");
  };

  return async () => {
    clearMyResources();

    try {
      const { id } = await getMyDetails();
      const myResources = await getMyResources();

      myResources.forEach((resource) => {
        myResourcesSetup(resource, id, $listContainer)();
      });

      $(".modal").modal();
    } catch (err) {
      updateError(err);
    }
  };
};

const registerCheckListeners = () => {
  $("#liked-filter").on("change", function () {
    renderMyResources();
  });

  $("#mine-filter").on("change", function () {
    renderMyResources();
  });
};
