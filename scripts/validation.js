const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgId = `#${inputEl.id}-error`;
  const errorMsgEl = formEl.querySelector(errorMsgId);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgId = `#${inputEl.id}-error`;
  const errorMsgEl = formEl.querySelector(errorMsgId);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("modal__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("modal__button_disabled");
  }
};

const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__submit-btn");

  // toggleBlueButtonState(inputList.buttonElement);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(validationConfig);
