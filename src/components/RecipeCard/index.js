import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div
      className="card bg-light border border-3 border-primary"
      style={{ width: "18rem" }}
    >
      <img src={recipe.picture} className="card-img-top" alt="Recipe"></img>
      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>
        <Link to={`/recipes/${recipe._id}`} className="btn btn-sm btn-info">
          DETALHES
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
