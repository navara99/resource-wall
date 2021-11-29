const loginEventListener = () => {

  const $loginForm = $("#login-form");

  $loginForm.submit( async (event) => {
    event.preventDefault();

    const data = $loginForm.serialize();

    const userInfo = await login(data);

    updateView("resources", userInfo)
  });

};
