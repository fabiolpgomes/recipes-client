import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";

function RecipeEdit() {
  const { idRecipe } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [recipeTitleCopy, setRecipeTitleCopy] = useState("");
  const [recipePicture, setRecipePicture] = useState("");
  const [preview, setPreview] = useState();

  useEffect(() => {
    setLoading(true);
    async function fetchRecipe() {
      try {
        const response = await api.get(`/recipes/recipe/${idRecipe}`);
        setRecipe(response.data);
        setRecipeTitleCopy(response.data.title);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [idRecipe]);

  function handleChange(e) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
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

    try {
      const imgURL = await handleUpload();
      await api.put(`/recipes/edit/${idRecipe}`, {
        ...recipe,
        picture: imgURL,
      });
      toast.success(`Receita editada com sucesso.`);
      navigate(`/recipes/${idRecipe}`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar receita.");
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

  async function handleDelete() {
    try {
      toast.success((t) => (
        <span>
          <b>{recipe.name}</b> deletado com sucesso.
        </span>
      ));
      await api.delete(`/recipes/delete/${idRecipe}`);
      navigate("/recipes");
    } catch (error) {
      console.log(error);
      toast.error((t) => (
        <span>
          Erro ao deletar <b>{recipe.name}</b>.
        </span>
      ));
    }
  }

  return (
    <div className="container-xl main-container bg-secondary border border-dark rounded p-3">
      <h2>{recipeTitleCopy}</h2>

      {!loading && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <img
                src={preview ? preview : recipe.picture}
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
              <label className="form-label" htmlFor="title">
                Título
              </label>
              <input
                className="form-control"
                id="title"
                type="text"
                value={recipe.title}
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
                value={recipe.cuisine}
                name="cuisine"
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

      <Link to={`/recipes/recipe/${recipe._id}`}>
        <button type="button" className="mt-3 btn btn-primary">
          VOLTAR
        </button>
      </Link>
    </div>
  );
}

export default RecipeEdit;
