const createEditModal = () => {
  const $modal = $(`
  <div id="${id}-confirm-delete" class="modal">
    <a href="#!" id="close-confirm-delete" class="modal-close  waves-effect waves-light btn-flat">
      <i class="material-icons right">close</i>
    </a>
    <div class="modal-content">
      <h4>Are you sure?</h4>
      <p>Are you sure you want to delete ${title}?</p>
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


