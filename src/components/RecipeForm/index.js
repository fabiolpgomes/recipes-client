import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

function RecipeForm() {
  const startRef = useRef();
  const navigate = useNavigate();
  const createButton = useRef();
  const [preview, setPreview] = useState();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [recipeForm, setRecipeForm] = useState({
    title: "",
    cuisine: "",
  });
  const [recipePicture, setRecipePicture] = useState("");

  function handleChange(e) {
    setRecipeForm({ ...recipeForm, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setRecipePicture(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", recipePicture);
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
      await api.post("/recipes/create", { ...recipeForm, picture: imgURL });
      toast.success("Receita criada com sucesso.");
      navigate("/recipes");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar receita.");
    }
  }

  useEffect(() => {
    if (!recipePicture) {
      setPreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(recipePicture);
    setPreview(objectURL);
    return () => URL.revokeObjectURL(objectURL);
  }, [recipePicture]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <img src={preview} alt="" className="profile-img" />
        </div>
        <div className="mb-2">
          <label className="form-label fw-bold" htmlFor="recipePicture">
            Foto
          </label>
          <input
            className="form-control"
            id="recipePicture"
            type="file"
            name="recipePicture"
            onChange={handleImage}
          />
        </div>

        <div className="mb-2">
          <label className="form-label" htmlFor="title">
            Título
          </label>
          <input
            ref={startRef}
            className="form-control"
            id="title"
            type="text"
            value={recipeForm.title}
            name="title"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="cuisine">
            Cozinha
          </label>
          <input
            className="form-control"
            type="text"
            id="cuisine"
            value={recipeForm.cuisine}
            name="cuisine"
            required
            onChange={handleChange}
          />
        </div>

        <button ref={createButton} type="submit" className="btn btn-primary">
          CRIAR RECEITA
        </button>
      </form>
    </>
  );
}

export default RecipeForm;
