function AuthAdmin(store) {
  const state = store && store.getState();
  console.log(state);
  if (state && state.loginPage.isAdmin && state.loginPage.userId && state.loginPage.jwt) {
    return true;
  }
  return false;
}

export default AuthAdmin;
