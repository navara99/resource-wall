const showEditResourceModal = async (resourceId) => {
  const resourceDetails = await getDetailsOfResources(resourceId);
  console.log(resourceId);
  console.log(resourceDetails);
};


