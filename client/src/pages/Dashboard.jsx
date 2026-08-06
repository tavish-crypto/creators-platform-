import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Dashboard() {
  const { user, logout, loading, isAuthenticated } = useAuth();

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState("");
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const fetchProjects = async (currentPage) => {
    try {
      setLoadingProjects(true);
      setError("");

      const res = await api.get(`/projects?page=${currentPage}&limit=5`);

      setProjects(res.data.projects);
      setPagination(res.data.pagination);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch projects."
      );
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/projects/${id}`);

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );

      alert("Project deleted successfully!");
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to delete project."
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>

      <Link to="/create-project">
        <button>Create New Project</button>
      </Link>

      <button
        onClick={logout}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>

      <hr />

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {loadingProjects ? (
        <h3>Loading Projects...</h3>
      ) : projects.length === 0 ? (
        <h3>No Projects Found</h3>
      ) : (
        <>
          {projects.map((project) => (
            <div
              key={project._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <p>
                <strong>Technologies:</strong>{" "}
                {project.technologies}
              </p>

              <Link to={`/edit-project/${project._id}`}>
                <button>Edit</button>
              </Link>

              <button
                onClick={() => handleDelete(project._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <span style={{ margin: "0 20px" }}>
              Page {pagination.page || 1} of{" "}
              {pagination.totalPages || 1}
            </span>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;