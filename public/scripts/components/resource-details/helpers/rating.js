const displayRating = (rating, numOfRating) => {
  if (!rating) return "No rating yet";
  if (numOfRating === 1) {
    return `${toTwoDecimalPlaces(rating)} (Based on ${numOfRating} rating)`;
  }
  return `${toTwoDecimalPlaces(rating)} (Based on ${numOfRating} ratings)`;
};

const toTwoDecimalPlaces = (numString) => {
  const float = parseFloat(numString);
  const twoDecimal = Math.round(float * 100) / 100;
  return twoDecimal;
};

const ratingHelperFunctionsGenerator = (resourceInfo, domObj) => {
  const { $rating, starElms, $ratingString, $detailsStars, $averageRating } =
    domObj;
  const { current_username, id } = resourceInfo;
  let { currentRating, averageRating, numOfRating } = resourceInfo;

  const addClassToStars = () => {
    const rate = currentRating || 0;
    for (let i = 0; i < rate; i++) {
      starElms[i].addClass("bright");
    }
    for (let i = rate; i < 5; i++) {
      starElms[i].removeClass("bright");
    }
  };

  const initRatingSetup = () => {
    if (!current_username) {
      $rating.hide();
    } else {
      $rating.show();
    }

    $detailsStars
      .mouseenter(() => {
        starElms.forEach((elm) => elm.removeClass("bright"));
      })
      .mouseleave(() => {
        addClassToStars(currentRating);
      });

    starElms.forEach((elm, index) => ratingOnClick(elm, id, index + 1));

    updateRatingStr();
    updateRating();
  };

  const updateRatingStr = () => {
    if (!currentRating) return $ratingString.html("Rate it:&nbsp;");
    addClassToStars(currentRating);
    $ratingString.html("You rated:&nbsp;");
  };

  const ratingOnClick = ($elm, id, newRating) => {
    $elm.unbind();
    $elm.on("click", async () => {
      if (current_username) {
        const isNewRating = await rateResource(id, `rating=${newRating}`);
        if (isNewRating) {
          numOfRating++;
          averageRating = averageRating
            ? (averageRating * numOfRating + newRating) / numOfRating
            : newRating;
        } else {
          averageRating =
            (averageRating * numOfRating - currentRating + newRating) /
            numOfRating;
        }
        currentRating = newRating;
        updateRating();
        updateRatingStr();
      }
    });
  };

  const updateRating = () => {
    const ratingText = displayRating(averageRating, numOfRating);
    $averageRating.text(ratingText);
  };

  return { initRatingSetup };
};
