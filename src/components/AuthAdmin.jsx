function AuthAdmin() {
  let isAdmin = sessionStorage.getItem("isAdmin");
  if (isAdmin !== null && isAdmin !== undefined) {
    return isAdmin === "true" ? true : false;
  }
  return false;
}

export default AuthAdmin;
