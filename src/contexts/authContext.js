import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({
    token: "",
    user: {},
  });

  useEffect(() => {
    const loggedInUserJSON = localStorage.getItem("loggedInUser"); //pega o user do local storage, mas ele tá em JSON
    const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""'); // pega o json e transforma em OBJETO.

    if (parseLoggedInUser.token) {
      //se meu usuário estiver logado. POIS, SÓ USUÁRIO LOGADOS TEM TOKEN!!!
      setLoggedInUser(parseLoggedInUser);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
