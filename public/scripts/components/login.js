const loginEventListener = () => {
  const $loginForm = $("#login-form");

  $loginForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $loginForm.serialize();

      const userInfo = await login(data);

      updateUserInfo(userInfo);
      updateHeader();
      updateView("resources");

      return $loginForm.trigger("reset");
    } catch (err) {
      updateView(err);
    }
  });
};
