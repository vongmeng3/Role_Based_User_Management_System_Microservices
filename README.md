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
    Client([👤 Client])

    Client --> Gateway

    subgraph Gateway["🚪 API Gateway Microservice"]
        direction TB
        G1[JWT Validation]
        G2[Role Validation]
        G3[Request Routing]
    end

    Gateway --> Reg
    Gateway --> Login
    Gateway --> Admin
    Gateway --> User

    subgraph Reg["📝 Registration Service"]
    end
    subgraph Login["🔑 Login Service"]
    end
    subgraph Admin["🛡️ Admin Service"]
    end
    subgraph User["👥 User Service"]
    end

    RegDB[(MongoDB)]
    AdminDB[(MongoDB)]
    UserDB[(MongoDB)]
    JWT[/JWT Token/]

    Reg --> RegDB
    Login -.-> JWT
    Admin --> AdminDB
    User --> UserDB

    classDef gateway fill:#4A5568,stroke:#2D3748,color:#fff,stroke-width:2px
    classDef service fill:#3182CE,stroke:#2C5282,color:#fff,stroke-width:2px
    classDef db fill:#38A169,stroke:#276749,color:#fff,stroke-width:2px
    classDef token fill:#DD6B20,stroke:#9C4221,color:#fff,stroke-width:2px
    classDef client fill:#805AD5,stroke:#553C9A,color:#fff,stroke-width:2px

    class Client client
    class Gateway,G1,G2,G3 gateway
    class Reg,Login,Admin,User service
    class RegDB,AdminDB,UserDB db
    class JWT token
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
