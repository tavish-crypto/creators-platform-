import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);

      setFormData({
        title: res.data.project.title,
        description: res.data.project.description,
        technologies: res.data.project.technologies,
      });
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to load project."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.title ||
      !formData.description ||
      !formData.technologies
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      setUpdating(true);

      const res = await api.put(`/projects/${id}`, formData);

      setSuccess(res.data.message || "Project updated successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update project."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <h2>Loading Project...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Edit Project</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {success && (
        <p style={{ color: "green" }}>
          {success}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Project Description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="technologies"
          placeholder="Technologies"
          value={formData.technologies}
          onChange={handleChange}
        />

        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
}

export default EditProject;