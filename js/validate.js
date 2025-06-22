function setError(element, message) {
  const box = element.parentElement;
  const errorMsg = box.querySelector(".error");

  errorMsg.innerText = message;
  box.classList.add("error");
  box.classList.remove("success");
}

function setSuccess(element, message) {
  const box = element.parentElement;
  const errorMsg = box.querySelector(".error");

  errorMsg.innerText = message;
  box.classList.add("success");
  box.classList.remove("remove");
}

function validateText(value, section) {
  if (value === "") {
    setError(section, "This field is required");
    return false;
  } else if (!isValidAlphabetic(value)) {
    setError(section, "This field should only contain alphabetic characters");
    return false;
  } else {
    setSuccess(section, "");
    return true;
  }
}

function validateDescription(value, section) {
  if (value === "") {
    setError(section, "This field is required");
    return false;
  } else if (!isValidDescription(value)) {
    setError(section, "This field containes invalid characters");
    return false;
  } else {
    setSuccess(section, "");
    return true;
  }
}

function validateName(value, section) {
  if (value === "") {
    setError(section, "This field is required");
    return false;
  } else if (!isValidName(value)) {
    setError(section, "This field contain invalid characters");
    return false;
  } else {
    setSuccess(section, "");
    return true;
  }
}

function validateUrl(value, section) {
  if (value === "") {
    setError(section, " This field is required");
    return false;
  } else if (!isValidUrl(value)) {
    setError(section, "Invalid URL");
    return false;
  } else {
    setSuccess(section, "");
    return true;
  }
}

function validateEmail(value) {
  if (value === "") {
    setError(email, "This field required");
    return false;
  } else if (!isValidEmailInput(value)) {
    setError(email, "Please enter a valid email address");
    return false;
  } else {
    setSuccess(email, "");
    return true;
  }
}

function validateMessage(value) {
  if (value === "") {
    setError(message, "This field is required");
    return false;
  } else if (!isValidDescription(value)) {
    setError(message, "This field containes invalid characters");
    return false;
  } else {
    setSuccess(message, "");
    return true;
  }
}

function validateUsername(value) {
  if (value === "") {
    setError(username, "Username is required");
    return false;
  } else if (value.length < 3 || value.length > 20) {
    setError(username, "Username must be 3 to 20 characters long");
    return false;
  } else if (!isValidUsername(value)) {
    setError(username, "Invalid Username Format");
    return false;
  } else {
    setSuccess(username, "");
    return true;
  }
}

function validatePassword(value) {
  if (value === "") {
    setError(password, "Password is required");
    return false;
  } else if (value.length < 8) {
    setError(password, "Password must be at least 8 characters long.");
    return false;
  } else if (!isValidPassword(value)) {
    setError(
      password,
      "Password must contain at least one uppercase letter, lowercase letter, digit, and special character (@, $, !, %, *, ?, or &)"
    );
    return false;
  } else {
    setSuccess(password, "");
    return true;
  }
}

function sanitizeInput(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

function reloadPage(event) {
  window.location.reload();
}

/*Helper Validate Functions*/
function isValidAlphabetic(input) {
  const regex = /^[a-zA-Z\s.&.]+$/;
  return regex.test(input);
}

function isValidDescription(input) {
  const regex = /^[A-Za-z\s,!.'’\-]+(?:\s[A-Za-z\s,!.'’\-]+)*$/;
  return regex.test(input);
}

function isValidName(input) {
  const regex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*(?:\s+[a-zA-Z]\.)?$/;
  return regex.test(input);
}

function isValidEmailInput(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}

function isValidUsername(input) {
  const regex = /^[a-zA-Z0-9_.-]{3,20}$/;
  return regex.test(input);
}

function isValidPassword(input) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(input);
}
