import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="container-xxl main-container">
      <div className="container-sm bg-danger border border-dark rounded p-3">
        <h2>Opa, página não encontrada !!!</h2>
        <br />
        <p>
          Parece que você tentou acessar uma página que não existe em nosso
          domínio.
        </p>
        <hr className="bg-dark" />
        <Link to="/">
          <button type="button" className="btn btn-secondary btn-lg">
            MENU
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
