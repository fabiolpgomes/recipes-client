import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import profilePlaceholder from "../../assets/profile-placeholder.jpg";

function SignUpForm() {
  const startRef = useRef();
  const passwordInput = useRef();
  const createButton = useRef();
  const navigate = useNavigate();
  const [preview, setPreview] = useState();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profilePicture, setProfilePicture] = useState("");

  function handleChange(e) {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
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
    createButton.current.disabled = true;

    try {
      const imgURL = await handleUpload();
      await api.post("/users/sign-up", { ...userForm, picture: imgURL });
      toast.success("Conta criada com sucesso.");
      navigate("/confirm-email");
    } catch (error) {
      createButton.current.disabled = false;
      console.log(error);
      toast.error("Erro ao criar conta.");
    }
  }

  useEffect(() => {
    if (!profilePicture) {
      setPreview(profilePlaceholder);
      return;
    }
    const objectURL = URL.createObjectURL(profilePicture);
    setPreview(objectURL);
    return () => URL.revokeObjectURL(objectURL);
  }, [profilePicture]);

  function showPassword() {
    if (passwordInput.current.type === "password") {
      passwordInput.current.type = "text";
    } else {
      passwordInput.current.type = "password";
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <img src={preview} alt="" className="profile-img" />
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
          <label className="form-label fw-bold" htmlFor="name">
            Nome
          </label>
          <input
            ref={startRef}
            className="form-control"
            id="name"
            type="text"
            value={userForm.name}
            name="name"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-bold" htmlFor="email">
            E-mail
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            value={userForm.email}
            name="email"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold" htmlFor="password">
            Senha
          </label>
          <input
            ref={passwordInput}
            className="form-control"
            type="password"
            id="password"
            value={userForm.password}
            name="password"
            required
            onChange={handleChange}
          />
          <input type="checkbox" onClick={showPassword} />
          Show Password
        </div>

        <button ref={createButton} type="submit" className="btn btn-primary">
          CRIAR CONTA
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
