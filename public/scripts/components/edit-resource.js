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
  const $submitEditedResourceBtn = $("#edit-resource-btn");

  const registerSubmitResourceEdit = (resourceId, editForm) => {

    $submitEditedResourceBtn.on("click", async (e) => {
      e.preventDefault();
      const newInfo = editForm.serialize();
      await updateResource(resourceId, newInfo);
      clearEditModalForm();
      const updateMyResources = renderMyResourcesFunctionGenerator();
      updateMyResources();
      $(".modal").modal("close");
    });

  };

  const updateEditForm = (title, description, url, is_private, category) => {
    placeInput($title, title);
    placeInput($description, description);
    placeInput($url, url);
    placeInput($category, category);
    $category.formSelect();
    if (is_private) $private.attr("checked", true);
  };

  const clearEditModalForm = () => {
    $submitEditedResourceBtn.off("click");
    $title.val("");
    $description.val("");
    $url.val("");
    $private.removeAttr("checked");
    $("#edit-Resource-form").hide();
  };

  return async (resourceId) => {
    clearEditModalForm();
    const [resourceDetails] = await getDetailsOfResources(resourceId);
    const { title, url, description, is_private, catergory } = resourceDetails;
    const $editResourceForm = $("#edit-resource-form");
    const $editModalContent = $(`#${resourceId}-edit-form-modal`);
    $editModalContent.append($editResourceForm);
    updateEditForm(title, description, url, is_private, catergory);
    $editResourceForm.show();
    registerSubmitResourceEdit(resourceId, $editResourceForm);
  };
};







