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
