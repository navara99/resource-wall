const showEditResourceModal = async (resourceId) => {
  const [resourceDetails] = await getDetailsOfResources(resourceId);
  const { title, url, description, is_private, category_id } = resourceDetails;
  const $editResourceForm = $("#edit-resource-form");
  const $editModalContent = $("#edit-form-modal");
  $editModalContent.append($editResourceForm);
  $editResourceForm.show();
  console.log(resourceId);
  console.log(resourceDetails);
};

const closeEditModal = () => {
  $("#title-edit").value("");
  $("")
}


