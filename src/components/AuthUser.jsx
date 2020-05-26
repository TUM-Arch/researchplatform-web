function AuthUser(store) {
  let isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin !== null && isAdmin !== undefined) {
    return isAdmin === "false" ? true : false;
  }
}

export default AuthUser;
