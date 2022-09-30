import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-xxl main-container">
      <div className="container-sm bg-secondary border border-dark rounded p-3">
        <h2>BEM VINDO AO LAB REPICES</h2>
        <hr className="bg-dark" />
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link to="/sign-up">
            <button type="button" className="btn btn-primary btn-lg">
              CRIAR CONTA
            </button>
          </Link>
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

export default Home;
