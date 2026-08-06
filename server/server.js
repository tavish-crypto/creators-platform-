const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "https://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
// Health Route
app.get("/api/health", (req, res) => {
    res.json({
        message: "Server is running!",
        timestamp: new Date(),
        database: "Connected"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});