const updateResourceDeails = () => {
  const $descriptions = $("#details-desciption");

  return (resourceDetails) => {
    const { description } = resourceDetails[0];
    const comments = [];
    for (const details of resourceDetails) {
      const { comment, user_id, first_name, last_name, username } = details;

    }
    $descriptions.text(description);
  };
}
