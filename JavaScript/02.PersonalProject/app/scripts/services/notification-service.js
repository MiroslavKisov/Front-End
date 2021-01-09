//This service is responsible for displaying messages
const notificationService = (() => {
  function success(message) {
    let messageElement = document.querySelector(constants.selectors.messageElementSuccess);
    messageElement.textContent = message;

    let successMessageDiv = document.getElementById(constants.selectors.successMessage);
    successMessageDiv.classList.remove(constants.selectors.notificationHidden);

    setTimeout(function() {
      successMessageDiv.classList.add(constants.selectors.notificationHidden);
    }, 3000);
  }

  function error(message) {
    let messageElement = document.querySelector(constants.selectors.messageElementError);
    messageElement.textContent = message;

    let errorMessageDiv = document.getElementById(constants.selectors.errorMessage);
    errorMessageDiv.classList.remove(constants.selectors.notificationHidden);

    setTimeout(function() {
      errorMessageDiv.classList.add(constants.selectors.notificationHidden);
    }, 3000);
  }

  return {
    success,
    error,
  }
})();