const loginEventListener = () => {
  const $loginForm = $("#login-form");

  $loginForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $loginForm.serialize();

      await login(data);

      historyManager(HOME);

      return $loginForm.trigger("reset");
    } catch (e) {
      updateError(e);
    }
  });
};
