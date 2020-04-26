function AuthUser() {
  let isAdmin = sessionStorage.getItem("isAdmin");
  if (isAdmin !== null && isAdmin !== undefined) {
    return isAdmin === "false" ? true : false;
  }
  return false;
}

export default AuthUser;
