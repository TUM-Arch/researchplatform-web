function Auth() {
  let userid = sessionStorage.getItem("userid");
  return userid === "tempuser" ? true : false;
}

export default Auth;
