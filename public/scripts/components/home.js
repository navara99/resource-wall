const createScreenshot = (media_url) => {
  return $(`<img src = ${media_url}/>`)
};

const createEmbedVideo = (media_url) => {
  return $(`
    <iframe
    width="100%"
    height="250"
    src=${media_url}
    frameborder="0" allow="accelerometer; autoplay;
    clipboard-write; encrypted-media;
    gyroscope;
    picture-in-picture"
    allowfullscreen>
    </iframe>"`
  );
};

const getCardAction = (likesAmount, commentsAmount, averageRating) => {
  return $(`
  <div class="card-action">
    <div class="card-summary">
      <i class="fas fa-star card-icon"></i>4.5
    </div>
    <div class="card-summary">
      <i class="fas fa-heart card-icon"></i>100
    </div>
    <div class="card-summary">
      <i class="fas fa-comment-alt card-icon"></i>30
    </div>
  </div>
  `)
};

const getCardContent = (description) => {
  return $(`<div class="card-content"><p>${description}</p></div>`);
};

const getCardTitle = (title) => {
  return $(`<span class="card-title">${title}</span>`);
};

const getUrlLink = (url) => {
  return $(`
  <div class="url-wrapper truncate">
    <a href=${url} class="card-url btn-flat">${url}</a>
  </div>
  `);
};

const getLikeLink = () => {
  return $(`<i class="fas fa-heart card-heart"></i>`);
};

const clearResources = ()=> {
  $("columns").empty();
};

const displayResources = async () => {
  const result = await getAllResources();
  const { allResources } = result;
  console.log(allResources);
  allResources.forEach((resource) => {
    const { id, user_id, title, description, url, media_url, created_on, is_video } = resource;

    const $card = $("<div>").addClass("card");
    const $resourceMedia = is_video ? createEmbedVideo(media_url) : createScreenshot(media_url);
    const $figure = $("<figure>");

    const $cardAction = getCardAction();
    const $cardContent = getCardContent(description);
    const $cardTitle = getCardTitle(title);
    const $urlLink = getUrlLink(url);
    const $likeLink = getLikeLink();
    const $cardImage = $("<div>").addClass("card-image").prepend($urlLink, $likeLink, $resourceMedia, $cardTitle);
    const $resourceInfo = $card.prepend($cardImage, $cardContent, $cardAction);
    const $item = $figure.prepend($resourceInfo);

    $("#columns").prepend($item);
  });
};

{/* <figure>
<div class="card">
  <div class="card-image">
    <div class="url-wrapper truncate">
      <a href="wwww.google.com" class="card-url btn-flat">https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwf</a>
    </div>
    <i class="fas fa-heart card-heart"></i>
    <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"/>
    <span class="card-title">Card Title</span>
  </div>
  <div class="card-content">
    <p>
      I am a very simple card. I am good at containing small bits of
      information. I am convenient because I require little markup
      to use effectively.
    </p>
  </div>
  <div class="card-action">
    <div class="card-summary">
      <i class="fas fa-star card-icon"></i>4.5
    </div>
    <div class="card-summary">
      <i class="fas fa-heart card-icon"></i>100
    </div>
    <div class="card-summary">
      <i class="fas fa-comment-alt card-icon"></i>30
    </div>
  </div>
</div>
</figure> */}
