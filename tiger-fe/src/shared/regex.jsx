export const priceCheck = (price) => {
  let regExp = /[0-9]/g;
  return regExp.test(price);
};
export const yearsCheck = (years) => {
  let regExp = /[0-9]/g;
  return regExp.test(years);
};
export const passengersCheck = (passengers) => {
  let regExp = /[0-9]/g;
  return regExp.test(passengers);
};
export const fuelEfficiencyCheck = (fuelEfficiency) => {
  let regExp = /[0-9]/g;
  return regExp.test(fuelEfficiency);
};
