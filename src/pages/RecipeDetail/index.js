import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";

function RecipeDetail() {
  const { idRecipe } = useParams();
  const [recipe, setRecipe] = useState({});
  const [reload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchRecipe() {
      try {
        const response = await api.get(`/recipes/recipe/${idRecipe}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [idRecipe, reload]);

  return (
    <div className="container-xl main-container bg-secondary border border-dark rounded p-3">
      <h2>{recipe.title}</h2>
      <img src={recipe.picture} alt="Recipe" className="profile-img" />

      {!loading && (
        <>
          <div className="mt-3 d-flex flex-column gap-3">
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
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="cuisine">
                Cozinha
              </label>
              <input
                className="form-control"
                type="text"
                id="cuisine"
                value={recipe.cuisine}
                name="cuisine"
                disabled
              />
            </div>
          </div>
        </>
      )}
      <div className="d-flex gap-2">
        <Link to={`/recipes/edit/${recipe._id}`} className="btn btn-warning">
          EDITAR
        </Link>
        <Link to="/recipes">
          <button type="button" className="btn btn-primary">
            VOLTAR
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RecipeDetail;
