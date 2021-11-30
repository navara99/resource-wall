const newResourceEventListener = () => {
  const $newResourceForm = $("#new-resource-form");

  $newResourceForm.submit(async (event) => {
    try {
      event.preventDefault();
      const data = $newResourceForm.serialize();

      const resourceDetails = await submitResource(data);
      const { id } = resourceDetails;

      const allResourceDetails = await getdetailsOfResources(id);
      console.log(allResourceDetails);

      updateView("resourceDetails");

      return $newResourceForm.trigger("reset");

    } catch (err) {
      updateView(err);
    }
  });
};
