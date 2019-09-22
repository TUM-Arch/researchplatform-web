function Auth() {
  let userid = sessionStorage.getItem("userId");
  return userid === "tempuser" ? true : false;
}

export default Auth;
