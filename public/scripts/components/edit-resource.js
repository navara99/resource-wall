const showEditResourceModal = async (resourceId) => {
  const resourceDetails = await getDetailsOfResources(resourceId);
  const { title, url, description, is_private, category_id } = resourceDetails;
  const $editResourceForm = $("#edit-resource-form");

  console.log(resourceId);
  console.log(resourceDetails);
};


