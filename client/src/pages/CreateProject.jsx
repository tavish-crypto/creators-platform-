import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setLoading(true);

      const response = await api.post("/projects", formData);

      setSuccess(response.data.message || "Project created successfully!");

      setFormData({
        title: "",
        description: "",
        technologies: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Create Project</h1>

      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "15px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            color: "green",
            marginBottom: "15px",
          }}
        >
          {success}
        </div>
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
          placeholder="Technologies (React, Node.js, MongoDB)"
          value={formData.technologies}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}

export default CreateProject;