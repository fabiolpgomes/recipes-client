import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div
      className="card bg-light border border-3 border-primary"
      style={{ width: "18rem" }}
    >
      <div className="card-body">
        <h3 className="card-title">{user.name}</h3>
        <h6 className="card-text">{user.email}</h6>
        <Link to={`/users/user/${user._id}`} className="btn btn-sm btn-info">
          PERFIL
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
