const loginEventListener = () => {
  const $loginForm = $("#login-form");

  $loginForm.submit(async(event) => {
    try {
      event.preventDefault();

      const data = $loginForm.serialize();

      const userInfo = await login(data);

      historyManager(HOME, userInfo);

      return $loginForm.trigger("reset");
    } catch (err) {
      updateError(err);
    }
  });
};
