import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

function OnlyLogged({ Component }) {
  const { loggedInUser } = useContext(AuthContext);
  if (loggedInUser) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
}

function OnlyAdmin({ Component }) {
  const { loggedInUser } = useContext(AuthContext);
  if (loggedInUser.user.role === "ADMIN") {
    return <Component />;
  } else {
    return <Navigate to="/error" />;
  }
}

export { OnlyLogged, OnlyAdmin };
