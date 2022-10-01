import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light mb-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-decoration-none brand">
          Recipes Good
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-4">
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link text-decooration-none"
                aria-current="page"
              >
                ProFile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/users"
                className="nav-item nav-link text-decooration-none"
              >
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/recipes"
                className="nav-item nav-link text-decooration-none"
              >
                Recipe
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
