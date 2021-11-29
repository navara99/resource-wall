const newResourceEventListener = () => {
  const $newResourceForm = $("#new-resource-form");

  $newResourceForm.submit(async (event) => {
    event.preventDefault();

    const data = $newResourceForm.serialize();

    submitResource(data);

    updateView("resourceDetails");
  });
};
