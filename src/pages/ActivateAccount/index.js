import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";

function ActivateAccount() {
  const { idUser } = useParams();
  useEffect(() => {
    async function activateAccount() {
      try {
        await api.get(`users/activate-account/${idUser}`);
      } catch (error) {
        console.log(error);
      }
    }

    activateAccount();
  }, []);

  return (
    <div className="container-xxl main-container">
      <div className="container-sm bg-secondary border border-dark rounded p-3">
        <h2>PARABÉNS SUA CONTA FOI ATIVADA COM SUCESSO!</h2>
        <hr className="bg-dark" />
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link to="/login">
            <button type="button" className="btn btn-primary btn-lg">
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ActivateAccount;
