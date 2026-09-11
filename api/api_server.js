require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const authenticateToken = require("./middleware/middleware");
const requireRole = require("./middleware/rolemiddleware");

const app = express();

app.use(cors());
app.use(express.json());


// ================================
// Registration Service
// ================================

app.post("/register/userregister", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.REGISTER_SERVICE_URL}/register/userregister`,
            req.body
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                message: "Registration service error"
            }
        );
    }
});


// ================================
// Login Service
// ================================

app.post("/auth/login", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.LOGIN_SERVICE_URL}/auth/login`,
            req.body
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                message: "Login service error"
            }
        );
    }
});


// ================================
// User Service
// ================================

// User must have a valid JWT and "user" role
app.get(
    "/user/viewprofile",
    authenticateToken,
    requireRole("user"),
    async (req, res) => {
        try {
            const response = await axios.get(
                `${process.env.USER_SERVICE_URL}/user/viewprofile`,
                {
                    headers: {
                        "x-user-id": req.user.id
                    }
                }
            );

            res.status(response.status).json(response.data);

        } catch (error) {
            res.status(error.response?.status || 500).json(
                error.response?.data || {
                    message: "User service error"
                }
            );
        }
    }
);


// User must have a valid JWT and "user" role
app.put(
    "/user/updateprofile",
    authenticateToken,
    requireRole("user"),
    async (req, res) => {
        try {
            const response = await axios.put(
                `${process.env.USER_SERVICE_URL}/user/updateprofile`,
                req.body,
                {
                    headers: {
                        "x-user-id": req.user.id
                    }
                }
            );

            res.status(response.status).json(response.data);

        } catch (error) {
            res.status(error.response?.status || 500).json(
                error.response?.data || {
                    message: "User service error"
                }
            );
        }
    }
);


// ================================
// Admin Service
// ================================

// Admin must have a valid JWT and "admin" role
app.get(
    "/admin/searchuser",
    authenticateToken,
    requireRole("admin"),
    async (req, res) => {
        try {
            const response = await axios.get(
                `${process.env.ADMIN_SERVICE_URL}/admin/searchuser`,
                {
                    params: req.query
                }
            );

            res.status(response.status).json(response.data);

        } catch (error) {
            res.status(error.response?.status || 500).json(
                error.response?.data || {
                    message: "Admin service error"
                }
            );
        }
    }
);


// Admin must have a valid JWT and "admin" role
app.get(
    "/admin/viewalluser",
    authenticateToken,
    requireRole("admin"),
    async (req, res) => {
        try {
            const response = await axios.get(
                `${process.env.ADMIN_SERVICE_URL}/admin/viewalluser`
            );

            res.status(response.status).json(response.data);

        } catch (error) {
            res.status(error.response?.status || 500).json(
                error.response?.data || {
                    message: "Admin service error"
                }
            );
        }
    }
);


// Admin must have a valid JWT and "admin" role
app.delete(
    "/admin/deluser",
    authenticateToken,
    requireRole("admin"),
    async (req, res) => {
        try {
            const response = await axios.delete(
                `${process.env.ADMIN_SERVICE_URL}/admin/deluser`,
                {
                    params: req.query
                }
            );

            res.status(response.status).json(response.data);

        } catch (error) {
            res.status(error.response?.status || 500).json(
                error.response?.data || {
                    message: "Admin service error"
                }
            );
        }
    }
);


// ================================
// Gateway Test Route
// ================================

app.get("/", (req, res) => {
    res.json({
        message: "API Gateway is running"
    });
});


// ================================
// Start Server
// ================================

app.listen(process.env.PORT, () => {
    console.log(
        `API Gateway running on port ${process.env.PORT}`
    );
});