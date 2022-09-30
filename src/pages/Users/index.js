import { useState, useEffect, useRef } from "react";
import UserCard from "../../components/UserCard";
import { api } from "../../api/api";

function Users() {
  const startRef = useRef();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      try {
        const response = await api.get("/users/all");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="container-xl main-container bg-secondary border border-dark rounded p-3">
      <h2>USUÁRIOS</h2>
      <input
        ref={startRef}
        className="form-control p-2 mt-4"
        type="search"
        value={search}
        onChange={handleSearch}
        placeholder="Procure um usuário pelo nome"
      />

      {!loading && (
        <>
          <div className="mt-3 d-flex flex-column gap-3">
            {users
              .filter((user) => {
                return user.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((user) => {
                return <UserCard key={user._id} user={user} />;
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default Users;
