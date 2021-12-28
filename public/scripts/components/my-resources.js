const myResourcesSetup = (resource, $listContainer, isUserPage) => {
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
    isMine,
    showLiked,
    showMine,
    thumbnail,
  } = resource;

  const elmId = isUserPage ? id + "-pp" : id;

  const videoHeight = 150;

  const { createEmbedVideo, createScreenshot } = thumbnailElementGenerator(
    resource,
    videoHeight
  );

  const registerMyResourceButtonsListeners = () => {
    if (!isMine) return;

    $(`#${elmId}-delete`).on("click", async function (e) {
      try {
        await deleteResource(id);
        renderMyResources();
      } catch (e) {
        updateError(e);
      }
    });

    $(`#${elmId}-edit`).on("click", async function (e) {
      const modal = await editResourceModalGenerator();
      modal(elmId);
    });
  };

  const $info = $(`
    <div class="text">
      <a class="my-resource-title">${partialText(
    title,
    10
  )}</a>
      <div>
        <span>URL: </span>
        <a href="${url}" target="_blank" onclick="event.stopPropagation();" class="paragraph truncate">${url}</a>
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

  const media =
    is_video && !thumbnail
      ? createEmbedVideo(media_url, videoHeight)
      : createScreenshot(media_url);

  const $thumbnail = $(`
    <div class="thumbnail-container">
      <div class="media">
        ${media.prop("outerHTML")}
      </div>
    </div>
  `);

  const $deleteModal = $(`
      <div id="${elmId}-confirm-delete" class="modal">
        <a href="#!" id="close-confirm-delete" class="modal-close  waves-effect waves-light btn-flat">
          <i class="material-icons right">close</i>
        </a>
        <div class="modal-content">
          <h4>Are you sure?</h4>
          <p>Are you sure you want to delete ${title}?</p>
        </div>
        <div class="modal-footer">
          <a href="#!" id="${elmId}-delete" class="modal-close  waves-effect waves-light red btn">Confirm</a>
      </div>
    </div>
  `);

  const $editModal = $(`
  <div id="${elmId}-edit-modal" class="modal">
    <a href="#!" id="close-edit" class="modal-close  waves-effect waves-light btn-flat">
      <i class="material-icons right">close</i>
    </a>
    <div id="${elmId}-edit-form-modal" class="modal-content">
      <h4>Edit ${title}</h4>
    </div>
  </div>
`);

  const noButtons = !isMine ? "invisible" : "";
  const actionButtons = `
      <a id = "${elmId}-edit"
         class="waves-effect waves-light btn modal-trigger ${noButtons}"
         href="#${id}-edit-modal">
        <i class="material-icons left">
          edit
        </i>
        Edit
      </a>
      <a id="${elmId}-delete"
        class="waves-effect waves-light btn modal-trigger ${noButtons} red"
        href="#${elmId}-confirm-delete"
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
    $(`#${elmId}-my-resource`).unbind();
    $(`#${elmId}-my-resource`).on("click", function ({ target }) {

      if (target.nodeName !== "A" && target.nodeName !== "I") {
        historyManager(RESOURCE_DETAILS, id);
      }
    });
  };

  return () => {
    if (showLiked || showMine) {
      const $collection = $(`<li class="collection-item" id="${elmId}-my-resource"></li>`);

      if (isMine) {
        const $body = $("body");
        $body.prepend($deleteModal);
        $body.prepend($editModal);
      }

      $collection.prepend($thumbnail, $info, $stats);
      $listContainer.prepend($collection);

      registerMyResourceButtonsListeners();
      registerMyResourceDetailsListener();
    }
  };
};

const sortByDateCreated = (a, b) => {
  const dateA = new Date(a.created_on);
  const dateB = new Date(b.created_on);
  return dateA.getTime() - dateB.getTime();
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
      const { id, resources } = await getUserResources(0);
      resources.sort(sortByDateCreated);
      resources.forEach((resource) => {
        const { user_id, is_liked } = resource;
        const isMine = user_id === id;
        const showLiked =
          $("#liked-filter:checked").val() &&
          Number(is_liked) === 1 &&
          user_id !== id;
        const showMine = $("#mine-filter:checked").val() && user_id === id;

        const allResourceInfo = { ...resource, isMine, showLiked, showMine };
        myResourcesSetup(allResourceInfo, $listContainer)();
      });

      $(".modal").modal();
    } catch (e) {
      updateError(e);
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
