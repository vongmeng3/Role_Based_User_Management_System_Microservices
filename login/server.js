require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connectDB = require("./connectDB");
const User = require("./user");

const app = express();

app.use(express.json());




// =====================================
// Login User
// POST /auth/login
// =====================================

app.post("/auth/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required"
            });
        }

        // Validate role
        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({
                message: "Role must be user or admin"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check role
        if (user.role !== role) {
            return res.status(403).json({
                message: "Incorrect role for this account"
            });
        }

        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Return successful login
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
});


// =====================================
// Test Route
// =====================================

app.get("/", (req, res) => {
    res.json({
        message: "Login Microservice is running"
    });
});


// =====================================
// Start Server
// =====================================

app.listen(process.env.PORT, () => {
    console.log(
        `Login Service running on port ${process.env.PORT}`
    );
});