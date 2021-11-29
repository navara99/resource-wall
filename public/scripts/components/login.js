const loginEventListener = () => {
  const $loginForm = $("#login-form");

  $loginForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $loginForm.serialize();

      const userInfo = await login(data);

      $loginForm.trigger("reset");

      updateView("resources", userInfo);
    } catch (err) {
      updateView(err);
    }
  });
};
