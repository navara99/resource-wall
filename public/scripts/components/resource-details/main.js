const timestampToTimeAgo = (timestamp) => timeago.format(new Date(timestamp));

const getHostname = (url) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser.hostname;
};

const initDisplay = (resourceInfo, domObj) => {
  const {
    owner_id,
    first_name,
    last_name,
    owner_username,
    owner_url,
    created_on,
    url,
    description,
    title,
  } = resourceInfo;

  const {
    $mediaURL,
    $ownerSection,
    $ownerName,
    $createdOn,
    $title,
    $ownerProfilePicture,
    $mediaDisplayedURL,
    $descriptions,
    $link,
    $displayLink,
  } = domObj;

  const hostname = getHostname(url);

  $title.text(title);
  $descriptions.text(description);

  $mediaURL.attr("href", url);
  $mediaDisplayedURL.text(hostname);
  $link.attr("href", url);
  $displayLink.text(hostname);

  $ownerProfilePicture.attr("src", owner_url);
  $ownerName.text(`${first_name} ${last_name} (@${owner_username})`);
  $ownerSection.unbind();
  $ownerSection.on("click", () => {
    updateUserDetails(owner_id);
  });

  $createdOn.text(timestampToTimeAgo(created_on));
};

const makeInfoObj = (id, details) => {
  const {
    description,
    url,
    title,
    rating,
    number_of_rating,
    number_of_comment,
    my_profile_url,
    is_video,
    media_url,
    number_of_like,
    liked,
    current_username,
    rated,
    created_on,
    owner_username,
    owner_id,
    first_name,
    last_name,
    owner_url,
  } = details;

  const resourceInfo = {
    id,
    current_username,
    my_profile_url,
    number_of_comment,
    numOfLike: parseInt(number_of_like),
    currentRating: rated,
    averageRating: rating,
    numOfRating: parseInt(number_of_rating),
    currentLike: liked > 0 ? true : false,
  };

  const infoForSetup = {
    id,
    owner_id,
    first_name,
    last_name,
    owner_username,
    owner_url,
    created_on,
    url,
    description,
    title,
  };

  const infoForMedia = {
    id,
    is_video,
    media_url,
  };

  return {
    infoForSetup,
    resourceInfo,
    infoForMedia,
    title,
  };
};

const getMedia = async ({ id, is_video, media_url }, $media) => {
  const newMedia = await getHtmlFromAPI(id);
  if (newMedia.html) return $media.html(newMedia.html);
  const $newMedia = is_video
    ? createEmbedVideo(media_url)
    : createScreenshot(media_url);
  $media.append($newMedia);
};

const updateResourceDetailsFunctionGenerator = () => {
  const $media = $("#details-media");

  const $1Star = $("#one-star");
  const $2Star = $("#two-star");
  const $3Star = $("#three-star");
  const $4Star = $("#four-star");
  const $5Star = $("#five-star");

  const domObj = {
    $likesNum: $("#details-likes-num"),
    $numOfComment: $("#details-num-of-comments"),
    $detailsComments: $("#details-comments"),
    $likeIcon: $("#details-like-icon"),
    $rating: $("#details-rating"),
    starElms: [$1Star, $2Star, $3Star, $4Star, $5Star],
    $averageRating: $("#details-average-rating"),
    $ratingString: $("#details-rating-string"),
    $detailsStars: $("#details-stars"),
  };

  const domObjForSetup = {
    $mediaURL: $("#details-link-on-media"),
    $ownerSection: $("#owner_profile-picture"),
    $ownerName: $("#details-owner-name"),
    $createdOn: $("#details-time"),
    $title: $("#details-title"),
    $ownerProfilePicture: $("#owner_profile-picture"),
    $mediaDisplayedURL: $("#details-display-link-on-media"),
    $descriptions: $("#details-desciption"),
    $link: $("#details-link"),
    $displayLink: $("#details-display-link"),
  };

  return async (id) => {
    try {
      const resourceComments = await getdetailsOfResources(id);

      $media.html("");

      const { infoForSetup, resourceInfo, infoForMedia, title } = makeInfoObj(
        id,
        resourceComments[0]
      );

      initDisplay(infoForSetup, domObjForSetup);

      // load media on the left
      getMedia(infoForMedia, $media);

      commentSetup(resourceComments, resourceInfo, domObj)();
      likeSetup(resourceInfo, domObj)();
      ratingSetup(resourceInfo, domObj)();

      return title;
    } catch (err) {
      console.log(err);
    }
  };
};
