const getMyDetails = (getDefaultProfilePic) => {
  return $.ajax({
    url: `/api/users/me/${getDefaultProfilePic}`,
  });
};

const getUserDetails = (id) => {
  return $.ajax({
    url: `/api/users/${id}`,
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

const deleteResource = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/resources/${id}`
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
    data,
  });
};

const rateResource = (id, data) => {
  return $.ajax({
    method: "POST",
    url: `/api/resources/${id}/rating`,
    data,
  });
};

const getdetailsOfResources = (id) => {
  return $.ajax({
    url: `/api/resources/${id}`,
  });
};

const searchResource = (searchQuery) => {
  return $.ajax({
    url: `/api/resources/search/${searchQuery}`,
  });
};

const getUserResources = (id) => {
  return $.ajax({
    url: `/api/resources/user/${id}`,
  });
};

const getHtmlFromAPI = (url) => {
  return $.ajax({
    url: `/api/resources/media/${url}`,
  });
};

const getResourcesByCategory = (category) => {
  return $.ajax({
    url: `/api/resources/category/${category}`,
  });
};

