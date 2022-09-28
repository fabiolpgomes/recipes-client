import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default HomePage;