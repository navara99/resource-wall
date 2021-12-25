const newResourceEventListener = () => {
  const $newResourceForm = $("#new-resource-form");

  $newResourceForm.submit(async function (event) {
    try {
      event.preventDefault();
      const formData = new FormData(this);

      const newResourceDetails = await submitResource(formData);
      const { id } = newResourceDetails;

      historyManager(RESOURCE_DETAILS, id);
      return $newResourceForm.trigger("reset");
    } catch (e) {
      historyManager(ERROR, e);
    }
  });
};
