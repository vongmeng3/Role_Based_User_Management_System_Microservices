require("dotenv").config();

const express = require("express");

const connectDB = require("./connectDB");
const User = require("./user");

const app = express();

app.use(express.json());


// =====================================
// View Own Profile
// GET /user/viewprofile
// =====================================

app.get("/user/viewprofile", async (req, res) => {
    try {
        // The user ID will be sent from API Gateway
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "User ID not provided"
            });
        }

        const user = await User.findById(userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile retrieved successfully",
            user: user
        });

    } catch (error) {
        console.error("View profile error:", error);

        res.status(500).json({
            message: "Failed to retrieve profile"
        });
    }
});


// =====================================
// Update Own Profile
// PUT /user/updateprofile
// =====================================

app.put("/user/updateprofile", async (req, res) => {
    try {
        // The user ID will be sent from API Gateway
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "User ID not provided"
            });
        }

        const { name, phone } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name,
                phone
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Update profile error:", error);

        res.status(500).json({
            message: "Failed to update profile"
        });
    }
});


// =====================================
// Test Route
// =====================================

app.get("/", (req, res) => {
    res.json({
        message: "User Microservice is running"
    });
});


// =====================================
// Start Server
// =====================================

app.listen(process.env.PORT, () => {
    console.log(
        `User Service running on port ${process.env.PORT}`
    );
});