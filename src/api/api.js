import axios from "axios";

//configurando nossas URLs de API
const apiURLs = {
  development: "http://localhost:4000",
  production: "LINK DO SERVIDOR DEPLOYADO VAI AQUI!!!!!!",
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

//adicionar SE HOUVER, o token no header
api.interceptors.request.use((config) => {
  const loggedInUserJSON = localStorage.getItem("loggedInUser"); //pega o user, mas ele tá em JSON
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""'); // pega o json e transforma em OBJETO.

  /*  if (!parseLoggedInUser) {
    return config;
  } */

  if (parseLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }

  return config;
});

export { api };
