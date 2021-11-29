// Client facing scripts here

$(() => {

  const $homeButton = $("#home-button");
  const $profileButton = $("#profile-button");
  const $loginButton = $("#login-button");
  const $registerButton = $("#register-button");

  $homeButton.on("click", () => {
    updateView("resources");
  });

  $profileButton.on("click", () => {
    updateView("updateProfile");
  });

  $loginButton.on("click", () => {
    updateView("login");
  });

  $registerButton.on("click", () => {
    updateView("register");
  });

});
