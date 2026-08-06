import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        background: "#222",
        color: "white",
      }}
    >
      <h2>Creators Platform</h2>

      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>

        {isAuthenticated() ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <span>Hello, {user.name}</span>

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;