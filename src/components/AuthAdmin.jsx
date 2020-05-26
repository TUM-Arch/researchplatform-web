function AuthAdmin() {
  let isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin !== null && isAdmin !== undefined) {
    return isAdmin === "true" ? true : false;
  }
}

export default AuthAdmin;
