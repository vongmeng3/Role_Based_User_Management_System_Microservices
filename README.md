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

```mermaid
flowchart TD
    Client([👤 Client / Postman])

    Client --> Gateway["🚪 API Gateway<br/>Port: 3000"]

    Gateway --> Register["📝 Register<br/>Port: 3001"]
    Gateway --> Login["🔑 Login<br/>Port: 3002"]
    Gateway --> User["👥 User<br/>Port: 3003"]

    User --> Admin["🛡️ Admin<br/>Port: 3004"]

    Admin --> DB[(MongoDB)]

    classDef gateway fill:#4A5568,stroke:#2D3748,color:#fff,stroke-width:2px
    classDef service fill:#3182CE,stroke:#2C5282,color:#fff,stroke-width:2px
    classDef db fill:#38A169,stroke:#276749,color:#fff,stroke-width:2px
    classDef client fill:#805AD5,stroke:#553C9A,color:#fff,stroke-width:2px

    class Client client
    class Gateway gateway
    class Register,Login,User,Admin service
    class DB db
```

---

## ⚙️ Services

| Service      | Port  | Responsibility                          |
|--------------|-------|------------------------------------------|
| API Gateway  | 3000  | JWT validation, role validation, routing |
| Register     | 3001  | New user registration                    |
| Login        | 3002  | Authentication & JWT issuance            |
| User         | 3003  | User profile & data operations           |
| Admin        | 3004  | Admin-level operations                   |

---

## 🗄️ Database

All persistent data is stored in **MongoDB**.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies for each service
cd api-gateway && npm install
cd ../register-service && npm install
cd ../login-service && npm install
cd ../user-service && npm install
cd ../admin-service && npm install
```

---
