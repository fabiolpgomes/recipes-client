import { api } from "../../api/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function UserEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [userNameCopy, setUserNameCopy] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [preview, setPreview] = useState();

  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      try {
        const response = await api.get(`/users/profile`);
        setUser(response.data);
        setUserNameCopy(response.data.name);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setProfilePicture(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", profilePicture);
      const response = await api.post("/upload-image", uploadData);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();
      await api.put(`/users/edit`, { ...user, picture: imgURL });
      toast.success(`Usuário editado com sucesso.`);
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar usuário.");
    }
  }

  useEffect(() => {
    if (!profilePicture) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(profilePicture);
    setPreview(objectURL);
    return () => URL.revokeObjectURL(objectURL);
  }, [profilePicture]);

  async function handleDelete() {
    try {
      toast.success((t) => (
        <span>
          <b>{user.name}</b> deletado com sucesso.
        </span>
      ));
      await api.delete(`users/delete`);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error((t) => (
        <span>
          Erro ao deletar <b>{user.name}</b>.
        </span>
      ));
    }
  }

  return (
    <div className="container-xl main-container bg-secondary border border-dark rounded p-3">
      <h2>{userNameCopy}</h2>

      {!loading && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <img
                src={preview ? preview : user.picture}
                alt=""
                className="profile-img"
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-bold" htmlFor="profilePicture">
                Foto
              </label>
              <input
                className="form-control"
                id="profilePicture"
                type="file"
                name="profilePicture"
                onChange={handleImage}
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
                required
                onChange={handleChange}
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
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              SALVAR
            </button>
          </form>
        </>
      )}

      <button
        type="button"
        className="mt-3 btn btn-danger"
        onClick={handleDelete}
      >
        DELETAR
      </button>

      <Link to={`/profile`}>
        <button type="button" className="mt-3 btn btn-primary">
          VOLTAR
        </button>
      </Link>
    </div>
  );
}

export default UserEdit;
