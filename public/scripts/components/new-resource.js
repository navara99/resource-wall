const newResourceEventListener = () => {
  const $newResourceForm = $("#new-resource-form");

  $newResourceForm.submit(async function (event) {

    try {
      event.preventDefault();
      const formData = new FormData(this);
      console.log("***********", ...formData, "********");
      const data = $newResourceForm.serialize();
      const newResourceDetails = await submitResource(data);
      const { id } = newResourceDetails;

      updateView("resourceDetails", null, id);

      return $newResourceForm.trigger("reset");
    } catch (err) {
      updateError(err);
    }
  });
};
