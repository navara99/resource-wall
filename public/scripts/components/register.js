const registerEventListener = () => {
  const $registerForm = $("#register-form");

  $registerForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $registerForm.serialize();

      const userInfo = await register(data);

      historyManager(HOME, userInfo);

      return $registerForm.trigger("reset");
    } catch (err) {
      updateError(err);
    }
  });
};
