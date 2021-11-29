const getMyDetails = () => {
  return $.ajax({
    url: "/api/users/me",
  });
}
