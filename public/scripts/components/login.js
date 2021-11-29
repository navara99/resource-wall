const loginEventListener = () => {

  const $loginForm2 = $("#login-form2");

  $loginForm2.submit( async (event) => {
    event.preventDefault();

    const data = $loginForm2.serialize();

    const userInfo = await login(data);

    updateView("resources", userInfo)
  });

};
