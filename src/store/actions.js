export const sendToken = ({ commit }, token) => {
  commit("SEND_TOKEN", token);
};

export const getUser = ({ commit }, user) => {
  commit("GET_USER", user);
};
