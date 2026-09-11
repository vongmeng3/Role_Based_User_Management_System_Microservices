require("dotenv").config();

const express = require("express");

const connectDB = require("./connectDB");
const User = require("./user");

const app = express();

app.use(express.json());



// =====================================
// Search User
// GET /admin/searchuser?search=
// =====================================

app.get("/admin/searchuser", async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({
                message: "Search value is required"
            });
        }

        const users = await User.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }).select("-password");

        res.status(200).json({
            message: "Search completed",
            users: users
        });

    } catch (error) {
        console.error("Search error:", error);

        res.status(500).json({
            message: "Search failed",
            error: error.message
        });
    }
});


// =====================================
// View All Users
// GET /admin/viewalluser
// =====================================

app.get("/admin/viewalluser", async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            message: "Users retrieved successfully",
            count: users.length,
            users: users
        });

    } catch (error) {
        console.error("View users error:", error);

        res.status(500).json({
            message: "Failed to retrieve users",
            error: error.message
        });
    }
});


// =====================================
// Delete User
// DELETE /admin/deluser?emailid=
// =====================================

app.delete("/admin/deluser", async (req, res) => {
    try {
        const { emailid } = req.query;

        if (!emailid) {
            return res.status(400).json({
                message: "Email ID is required"
            });
        }

        const user = await User.findOne({ email: emailid });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.deleteOne({ email: emailid });

        res.status(200).json({
            message: "User deleted successfully",
            email: emailid
        });

    } catch (error) {
        console.error("Delete error:", error);

        res.status(500).json({
            message: "Delete failed",
            error: error.message
        });
    }
});


// =====================================
// Test Route
// =====================================

app.get("/", (req, res) => {
    res.json({
        message: "Admin Microservice is running"
    });
});


// =====================================
// Start Server
// =====================================

app.listen(process.env.PORT, () => {
    console.log(
        `Admin Service running on port ${process.env.PORT}`
    );
});