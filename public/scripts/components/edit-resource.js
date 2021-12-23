const createEditModal = () => {
  const $editResourceForm = $("#edit-resource-form");

  const $modal = $(`
  <div id="${id}-edit" class="modal">
    <a href="#!" id="close-edit" class="modal-close  waves-effect waves-light btn-flat">
      <i class="material-icons right">close</i>
    </a>
    <div class="modal-content">
      <h4>Edit ${title}</h4>
    </div>
    <div class="modal-footer">
      <a href="#!" id="${id}-delete" class="modal-close  waves-effect waves-light red btn">Confirm</a>
  </div>
</div>
`);


  return $modal;
}


const showEditResourceModal = async (resourceId) => {
  const resourceDetails = await getDetailsOfResources(resourceId);
  const { title, url, description, is_private, category_id } = resourceDetails;


  console.log(resourceId);
  console.log(resourceDetails);

};


