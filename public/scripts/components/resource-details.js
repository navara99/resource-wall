const updateResourceDeails = () => {
  const $descriptions = $("#details-desciption");

  return (resourceDetails) => {
    const { description } = resourceDetails[0];
    $descriptions.text(description);
  };
}
