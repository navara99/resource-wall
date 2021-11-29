const getMyDetails = async () => {
  console.log("getMyDetails");
  return await $.ajax({
    url: "/api/users/me",
  });
}
