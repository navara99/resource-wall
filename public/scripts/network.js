const getMyDetails = () => {
  return $.ajax({
    url: "/api/users/me",
  });
};

const login = (data) => {
  console.log("function login: data -", data);
  return $.ajax({
    method: "POST",
    url: "api/users/login",
    data,
  });
};
