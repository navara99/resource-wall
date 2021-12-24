const newResourceEventListener = () => {
  const $newResourceForm = $("#new-resource-form");

  $newResourceForm.submit(async function (event) {

    try {
      event.preventDefault();
      const formData = new FormData(this);

      const newResourceDetails = await submitResource(formData);
      const { id } = newResourceDetails;

      updateView("resourceDetails", null, id);
      return $newResourceForm.trigger("reset");
    } catch (err) {
      console.log(err);
      updateError(err);
    }
  });
};
