const registerEventListener = () => {
  const $registerForm = $("#register-form");

  $registerForm.submit(async (event) => {
    event.preventDefault();

    const data = $registerForm.serialize();

    const userInfo = await register(data);

    updateView("resources", userInfo);
  });
};
