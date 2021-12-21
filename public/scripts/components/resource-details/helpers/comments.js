const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const makeComment = (username, comment, profilePicture, timeAgo) => {
  const $elm = $(`
  <li class="collection-item avatar hover-pointer">
  <img
    src="${escape(profilePicture)}"
    class="circle profile profile-picture"
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

const commentHelperFunctionsGenerator = (
  commentDetails,
  resourceInfo,
  { $numOfComment, $detailsComments }
) => {
  const compileComments = () => {
    const comments = [];
    for (const details of commentDetails) {
      const {
        comment,
        username,
        timestamp,
        profile_picture_url,
        comment_user_id,
      } = details;
      if (comment) {
        comments.push({
          comment,
          username,
          timeAgo: timestampToTimeAgo(timestamp),
          profile_picture_url,
          comment_user_id,
        });
      }
    }
    return comments;
  };

  const updateNumOfComment = () => {
    $numOfComment.text(resourceInfo.numOfComment);
  };

  const makeComments = () => {
    const comments = compileComments(commentDetails);
    $detailsComments.text("");
    comments.forEach((commentInfo) => {
      const {
        comment,
        username,
        timeAgo,
        profile_picture_url,
        comment_user_id,
      } = commentInfo;

      const $elm = makeComment(username, comment, profile_picture_url, timeAgo);
      $detailsComments.prepend($elm);
      $elm.on("click", () => {
        updateUserDetailsPage(comment_user_id);
      });
    });

    if (resourceInfo.current_username) {
      $detailsComments.prepend(
        commentForm(resourceInfo.my_profile_url)
      );
    }

    $("#submit-button").on("click", async () => {
      if (resourceInfo.current_username) {
        const data = $("#new-comment").serialize();
        if (data.length > 8) {
          $("#new-comment").val("");
          const commentInfo = await commentResource(resourceInfo.id, data);
          const { comment, timestamp, comment_user_id } = commentInfo;
          const userInfo = await getMyDetails();
          const { profile_picture_url, username } = userInfo;
          const newCommentDetails = {
            comment,
            username,
            timestamp,
            profile_picture_url,
            comment_user_id,
          };
          commentDetails.push(newCommentDetails);
          makeComments();
          resourceInfo.numOfComment++;
          updateNumOfComment();
        }
      }
    });
  };

  return { updateNumOfComment, makeComments };
};
