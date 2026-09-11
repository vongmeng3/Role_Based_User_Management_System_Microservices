require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const connectDB = require("./connectDB");
const User = require("./User");

const app = express();

app.use(express.json());



// =====================================
// Register User
// POST /register/userregister
// =====================================

app.post("/register/userregister", async (req, res) => {
    try { 
        const { name, email, password, phone, role } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role === "admin" ? "admin" : "user"
        });

        // Return success
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});


// =====================================
// Test Route
// =====================================

app.get("/", (req, res) => {
    res.json({
        message: "Registration Microservice is running"
    });
});


// =====================================
// Start Server
// =====================================

app.listen(process.env.PORT, () => {
    console.log(
        `Register Service running on port ${process.env.PORT}`
    );
});