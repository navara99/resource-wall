


const showEditResourceModal = async (resourceId) => {
  const resourceDetails = await getDetailsOfResources(resourceId);
  const { title, url, description, is_private, category_id } = resourceDetails;

  console.log(resourceId);
  console.log(resourceDetails);

};


