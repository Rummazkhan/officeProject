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

export const validateCup = (selectedCup) => {
  return selectedCup.length >= 1;
};

export const validateSugarVolume = (sugarQuantity) => {
  return sugarQuantity.length >= 1;
};

export const validateRoti = (roti) => {
  return roti.length >= 1;
};

export const validateAmount = (amount) => {
  return amount.length >= 1;
};

export const validateExtras = (extra) => {
  return extra.length >= 1;
};
