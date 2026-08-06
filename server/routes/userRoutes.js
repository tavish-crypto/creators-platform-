const express = require("express");

const {
    registerUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Get All Users
router.get("/", getAllUsers);

// Get User By ID
router.get("/:id", getUserById);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

module.exports = router;