const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const makeComment = ({ username, comment, profile_picture_url, timeAgo }) => {
  const $elm = $(`
  <li class="collection-item avatar hover-pointer">
  <img
    src="${escape(profile_picture_url)}"
    class="circle profile profile-picture"
    onClick="() => updateUserDetailsPage(comment_user_id)"
  />
    <span class="title">@${escape(username)}</span>
    <p>${escape(comment)}</p>
    <p class="secondary-content">${escape(timeAgo)}</p>
  </li>`);

  return $elm;
};

const commentForm = (imageURL) => {
  const elm = `
  <li
    class="collection-item avatar new-comment-container"
    id="make-new-comment">
    <img
    src="${escape(imageURL)}"
    class="circle profile profile-picture"
  />
    <form class="make-comment">
      <textarea
        id="new-comment"
        class="materialize-textarea"
        name="comment"
      ></textarea>
      <label class="label-icon" for="comment"></label>
      <span id="submit-button" class="fas fa-chevron-circle-right send-comment"></span>
    </form>
  </li>
  `;

  return elm;
};

const commentSetup = (
  commentDetails,
  resourceInfo,
  domObj
) => {
  const { $numOfComment, $detailsComments } = domObj;
  const { id, current_username, my_profile_url } = resourceInfo;
  let { number_of_comment } = resourceInfo;

  const compileComments = () => {
    const comments = [];
    for (const details of commentDetails) {
      const { comment, timestamp } = details;

      if (comment) {
        const newComment = {
          ...details,
          timeAgo: timestampToTimeAgo(timestamp),
        };

        comments.push(newComment);
      }
    }
    return comments;
  };

  const updateNumOfComment = () => $numOfComment.text(number_of_comment);

  const makeComments = () => {
    const comments = compileComments(commentDetails);
    $detailsComments.text("");

    comments.forEach((commentInfo) => {
      const $elm = makeComment(commentInfo);

      $detailsComments.prepend($elm);

      const { comment_user_id } = commentInfo;
      $elm.on("click", () => updateUserDetailsPage(comment_user_id));
    });

    // show comment form is user is logged in
    if (current_username) {
      const commentFormElm = commentForm(my_profile_url);
      $detailsComments.prepend(commentFormElm);

      $("#submit-button").on("click", async () => {
        if (current_username) {
          const data = $("#new-comment").serialize();

          if (data.length > 8) {
            $("#new-comment").val("");

            const commentInfo = await commentResource(id, data);
            const userInfo = await getMyDetails();

            const newCommentDetails = {
              ...commentInfo,
              ...userInfo,
            };

            commentDetails.push(newCommentDetails);
            makeComments();
            number_of_comment++;
            updateNumOfComment();
          }
        }
      });
    }
  };

  const initSetUp = () => {
    updateNumOfComment();
      makeComments();
  }

  return initSetUp;
};
