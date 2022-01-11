export const SEND_TOKEN = (state, token) => {
  state.token = token;
  console.log(state.token)
  localStorage.setItem("access_token", token);
};

export const GET_USER = (state, user) => {
  state.user = user;
  console.log(state.user)
}
