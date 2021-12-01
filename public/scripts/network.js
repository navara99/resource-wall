const getMyDetails = () => {
  return $.ajax({
    url: "/api/users/me",
  });
};

const login = (data) => {
  return $.ajax({
    method: "POST",
    url: "api/users/login",
    data,
  });
};

const logout = () => {
  return $.ajax({
    method: "POST",
    url: "api/users/logout",
  });
};

const register = (data) => {
  return $.ajax({
    method: "POST",
    url: "api/users/register",
    data,
  });
};

const updateProfile = (data) => {
  return $.ajax({
    method: "POST",
    url: "/api/users/edit",
    data,
  });
};

const changePassword = (data) => {
  return $.ajax({
    method: "POST",
    url: "/api/users/password",
    data,
  });
};

const submitResource = (data) => {
  return $.ajax({
    method: "POST",
    url: "/api/resources",
    data,
  });
};

const getAllResources = () => {
  return $.ajax({
    url: "/api/resources",
  });
};

const likeResource = (id) => {
  return $.ajax({
    method: "POST",
    url: `/api/resources/${id}/like`,
  });
};

const commentResource = (id, data) => {
  return $.ajax({
    method: "POST",
    url: `/api/resources/${id}/comment`,
    data
  });
};

const getdetailsOfResources = (id) => {
  return $.ajax({
    url: `/api/resources/${id}`,
  });
};
