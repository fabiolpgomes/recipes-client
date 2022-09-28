import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [img, setImg] = useState("");
  const [preview, setPreview] = useState();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  useEffect(() => {
    if (!img) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(img);
    console.log(objectURL);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [img]);
  console.log(img);
  async function handleUpload() {
    try {
      const uploadData = new FormData();
      console.log(uploadData);
      uploadData.append("picture", img);
      console.log(uploadData);

      const response = await api.post("/upload-image", uploadData);
      // response.data.url ->>> a url da minha imagem salva no cloudnary

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const imgURL = await handleUpload();

      await api.post("/users/sign-up", { ...form, profilePic: imgURL });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome:</label>
      <input
        name="username"
        type="text"
        value={form.name}
        onChange={handleChange}
      />

      <label>E-mail:</label>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <label>Senha:</label>
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <label>Profile Picture:</label>
      <input type="file" onChange={handleImage} />
      {img && <img src={preview} alt="" />}

      <button type="submit">Cadastrar</button>
    </form>
  );
}
export default Signup;
