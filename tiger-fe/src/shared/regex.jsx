export const priceCheck = (price) => {
  let regExp = /[^0-9]/g;
  return regExp.test(price);
};
export const yearsCheck = (years) => {
  let regExp = /[^0-9]/g;
  return regExp.test(years);
};
export const passengersCheck = (passengers) => {
  let regExp = /[^0-9]/g;
  return regExp.test(passengers);
};
export const fuelEfficiencyCheck = (fuelEfficiency) => {
  let regExp = /[0-9]/g;
  return regExp.test(fuelEfficiency);
};

export const emailCheck = (email) => {
  let regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};
export const pwCheck = (pw) => {
  let regExp = /^(?=.*\d)(?=.*[zA-ZS]).{8,}/;
  return regExp.test(pw);
};

// export const priceCheck = (string) => {
//   // let regExp = /[0-9]/g;
//   let regExp = /[^0-9]/g;
//   string = string.replace(regExp, "");
//   return string;
// };
// export const yearsCheck = (string) => {
//   let regExp = /[^0-9]/g;
//   string = string.replace(regExp, "");
//   return string;
// };
// export const passengersCheck = (string) => {
//   let regExp = /[^0-9]/g;
//   string = string.replace(regExp, "");
//   return string;
// };
// export const fuelEfficiencyCheck = (string) => {
//   let regExp = /[^0-9]/g;
//   string = string.replace(regExp, "");
//   return string;
// };
