import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar/index";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Users from "./pages/Users";
import Recipes from "./pages/Recipes";
import UserProfile from "./pages/UserProfile";
import UserEdit from "./pages/UserEdit";
import RecipeCreate from "./pages/RecipeCreate";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeEdit from "./pages/RecipeEdit";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { AuthContextComponent } from "./contexts/authContext";
import { OnlyLogged } from "./components/ProtectRoute";
import { OnlyAdmin } from "./components/ProtectRoute";
import ActivateAccount from "./pages/ActivateAccount";
import ConfirmEmail from "./pages/ConfirmEmail";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route
            path="/activate-account/:idUser"
            element={<ActivateAccount />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<OnlyLogged Component={UserProfile} />}
          />
          <Route path="/profile-edit" element={<UserEdit />} />

          <Route path="/users" element={<Users />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route
            path="/create-recipes"
            element={<OnlyAdmin Component={RecipeCreate} />}
          />
          <Route path="/recipes/:idRecipe" element={<RecipeDetail />} />

          <Route path="*" element={<Error />} />

          <Route path="/users/user/:idUser" element={<UserProfile />} />
          <Route path="/recipes/edit/:idRecipe" element={<RecipeEdit />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
