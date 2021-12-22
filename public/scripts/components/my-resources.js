const myResourcesElementGenerator = (resource) => {
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
    isMine,
    is_video,
    media_url,
  } = resource;

  const registerMyResourceButtonsListeners = () => {
    if (!isMine) return;

    $(`#${id}-delete`).on("click", async function (e) {
      const [resourceId] = $(this).attr("id").split("-");
      try {
        await deleteResource(resourceId);
        renderMyResources();
      } catch (err) {
        console.log(err.message);
      }
    });

    $(`#${id}-edit`).on("click", function (e) {});
  };

  const createInfo = () => {
    return $(`
    <div class="text">
      <a class="my-resource-title" id=${id}-my-resource >${title}</a>
      <div>
        <span>URL: </span>
        <a href="${url}" onclick="event.stopPropagation();" class="paragraph truncate">${url}</a>
      </div>
      <div>
        <span>Description: </span> ${description}
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
  };

  const createThumbnail = () => {
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

  const createDeleteModal = () => {
    return $(`
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
  };

  const getActionButtons = () => {
    const noButtons = !isMine ? "invisible" : "";
    const resourceOptions = `
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

    return resourceOptions;
  };

  const getStats = () => {
    return $(`
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
          ${getActionButtons()}
        </div>
      </div>
    `);
  };

  const registerMyResourceDetailsListener = () => {
    $(`#${id}-my-resource`).on("click", function (e) {
      const [resourceId] = $(this).attr("id").split("-");
      updateView("resourceDetails", null, resourceId);
    });
  };

  return {
    getStats,
    createDeleteModal,
    createThumbnail,
    createInfo,
    registerMyResourceButtonsListeners,
    registerMyResourceDetailsListener,
  };
};

const clearMyResources = () => {
  $("#my-resource-list").remove();
};

const renderMyResources = async () => {
  clearMyResources();

  try {
    const { id } = await getMyDetails();
    const myResources = await getMyResources();

    const $listContainer = $("<ul>")
      .attr("id", "my-resource-list")
      .addClass("collection comments");

    myResources.forEach((resource) => {
      const { user_id, is_liked } = resource;

      const info = { ...resource, isMine: user_id === id };

      const {
        getStats,
        createDeleteModal,
        createThumbnail,
        createInfo,
        registerMyResourceButtonsListeners,
        registerMyResourceDetailsListener,
      } = myResourcesElementGenerator(info);

      const showLiked =
        $("#liked-filter:checked").val() &&
        Number(is_liked) === 1 &&
        user_id !== id;

      const showMine = $("#mine-filter:checked").val() && user_id === id;

      if (showLiked || showMine) {
        const $collection = $("<li>");
        $collection.addClass("collection-item");

        const $thumbnail = createThumbnail();
        const $info = createInfo();
        const $stats = getStats(resource);

        if (info.isMine) {
          const $modal = createDeleteModal();
          $("body").prepend($modal);
        }

        $collection.prepend($thumbnail, $info, $stats);
        $listContainer.prepend($collection);
        $("#my-resources-details").append($listContainer);
        registerMyResourceButtonsListeners();
        registerMyResourceDetailsListener();
      }
    });
    $(".modal").modal();
  } catch (err) {
    console.log(err);
  }
};

const registerCheckListeners = async () => {
  $("#liked-filter").on("change", function () {
    renderMyResources();
  });

  $("#mine-filter").on("change", function () {
    renderMyResources();
  });
};
