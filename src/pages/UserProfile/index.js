import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      try {
        const response = await api.get(`/users/profile`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <div className="container-xl main-container bg-secondary border border-dark rounded p-3">
      <h2>{user.name}</h2>

      {!loading && (
        <>
          <div className="mt-3 d-flex flex-column gap-3">
            <div className="mb-2">
              <img
                src={user.picture}
                alt="User profile"
                className="profile-img"
                id="picture"
              />
            </div>
            <div className="mb-2">
              <label className="form-label" htmlFor="name">
                Nome
              </label>
              <input
                className="form-control"
                id="name"
                type="text"
                value={user.name}
                name="name"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="email">
                E-mail
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                value={user.email}
                name="email"
                disabled
              />
            </div>
          </div>
        </>
      )}
      <div className="d-flex gap-2">
        <Link to={`/profile-edit`} className="btn btn-warning">
          EDITAR
        </Link>
        <button type="button" onClick={handleLogout} className="btn btn-danger">
          SAIR
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
