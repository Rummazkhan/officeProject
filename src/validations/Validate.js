export const validateEmail = (email) => {
  return email.length >= 1;
};

export const validatePassword = (password) => {
  return password.length >= 1;
};

export const validateUsername = (username) => {
  return username.length >= 1;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateItem = (item) => {
  return item.length >= 1 && parseInt(item) >= 0;
};

export const validateExtras = (extra) => {
  return extra.length >= 1;
};
