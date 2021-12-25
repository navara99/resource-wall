const registerEventListener = () => {
  const $registerForm = $("#register-form");

  $registerForm.submit(async (event) => {
    try {
      event.preventDefault();

      const data = $registerForm.serialize();

      await register(data);

      historyManager(HOME);

      return $registerForm.trigger("reset");
    } catch (err) {
      updateError(err);
    }
  });
};
