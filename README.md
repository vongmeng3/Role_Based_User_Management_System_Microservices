# 🔐 Role-Based User Management System

A **Central Identity and User Management Platform** built using independent microservices, API Gateway, JWT authentication, and MongoDB.

---

## 📌 Project Overview

This project provides a secure user management platform with two different roles:

- 👤 **User**
- 🛡️ **Admin**

The system uses an **API Gateway** to control communication between the client and the independent microservices.

---

## 🏗️ Architecture

```text
                 ┌─────────────────┐
                 │     Client      │
                 │    Postman      │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   API Gateway   │
                 │   Port: 3000    │
                 └────────┬────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
   ┌────────────┐  ┌────────────┐  ┌────────────┐
   │  Register  │  │   Login    │  │    User    │
   │   :3001    │  │   :3002    │  │   :3003    │
   └────────────┘  └────────────┘  └────────────┘
                                          │
                                          ▼
                                  ┌────────────┐
                                  │   Admin    │
                                  │   :3004    │
                                  └─────┬──────┘
                                        │
                                        ▼
                                  ┌────────────┐
                                  │  MongoDB   │
                                  └────────────┘
