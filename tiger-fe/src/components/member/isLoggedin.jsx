const isLoggedin = () => {
  return !!localStorage.getItem("name");
};

export default isLoggedin;
