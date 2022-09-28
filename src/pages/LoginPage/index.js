import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setLoggedInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      /* const response = await axios.post(
            "http://localhost:4000/users/login",
            form
          ); */

      const response = await api.post("/users/login", form);

      localStorage.setItem("loggedInUser", JSON.stringify(response.data)); //transformando em json
      setLoggedInUser({ ...response.data });

      navigate("/profile");
      console.log(response.data); //token + user
    } catch (error) {
      console.log(error);
      toast.error(`User not active, check your inbox email`);
    }
  }

  console.log(process.env);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={form.email}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
