const placeInput = (elem, value) => {
  elem.focus();
  elem.val(value);
};

const editResourceModalGenerator = async () => {
  const $title = $("#title-edit");
  const $description = $("#description-edit");
  const $url = $("#url-edit");
  const $category = $("#category-edit");
  const $private = $("#edit-private");
  const $editResourceForm = $("#edit-resource-form");
  const $thumbnail = $("#edit-thumbnail");
  const $thumbnailText = $("#edit-thumbnail-text");
  const $thumbnailToggle = $("#edit-thumbnail-toggle");
  const $thumbnailUploadWrapper = $("#thumbnail-upload-wrapper");

  const clearEditModalForm = () => {
    $editResourceForm.off("submit");
    $thumbnailToggle.off("change");
    $title.val("");
    $description.val("");
    $url.val("");
    $thumbnail.val("");
    $private.removeAttr("checked");
    $thumbnailText.val("");
    $thumbnailUploadWrapper.addClass("hidden");
  };

  const registerSubmitResourceEdit = (resourceId, editForm) => {

    editForm.submit(async function (e) {
      e.preventDefault();
      try {
        const newInfo = new FormData(this);
        await updateResource(resourceId, newInfo);
        clearEditModalForm();
        $editResourceForm.hide();
        const updateMyResources = renderMyResourcesFunctionGenerator();
        updateMyResources();
        $(".modal").modal("close");
      } catch (err) {
        console.log(err.message);
      };
    });

    $thumbnailToggle.on("change", (e) => {
      $thumbnailUploadWrapper.toggleClass("hidden");
    });

  };

  const updateEditForm = (title, description, url, is_private, category) => {
    placeInput($title, title);
    placeInput($description, description);
    placeInput($url, url);
    placeInput($category, category);
    $category.formSelect();
    is_private ? $private.prop("checked", true) : $private.prop("checked", false);
    $thumbnailToggle.prop("checked", true);
  };

  return async (resourceId) => {
    try {
      clearEditModalForm();
      const [resourceDetails] = await getDetailsOfResources(resourceId);
      const { title, url, description, is_private, catergory } = resourceDetails;
      const $editModalContent = $(`#${resourceId}-edit-form-modal`);
      $editModalContent.append($editResourceForm);
      $editResourceForm.show();
      updateEditForm(title, description, url, is_private, catergory);
      registerSubmitResourceEdit(resourceId, $editResourceForm);
    } catch (err) {
      console.log(err.message);
    }

  };
};







