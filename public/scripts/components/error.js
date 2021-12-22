const updateErrorFunctionGenerator = () => {
  const $errorMsg = $("#error-message");
  return ({ responseText }) => {
    const msg = responseText.slice(10, -2);
    $errorMsg.text(msg);
    updateView("error");
  };
};
