# Employee Management System (EMS)

A full‑stack **Employee Management System** built using **Node.js, Express, EJS, and MySQL**. This project provides an admin dashboard to manage **Managers, Employees, and Tasks** with authentication and role‑based access control.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* Admin login with session/cookie support
* Role‑based access (Admin / Manager / Employee)
* Protected routes using middleware

### 📊 Admin Dashboard

* Dashboard overview with total counts
* Manage Managers (Add / View / Update / Delete)
* Manage Employees (Add / View / Update / Delete)
* Manage Tasks (Add / Assign / View / Update / Delete)

### 👨‍💼 Manager & Employee

* Managers can view assigned employees & tasks
* Employees can view their profile & assigned tasks

### 🎨 UI & Layout

* Clean Admin Dashboard UI
* Reusable Header, Sidebar, and Footer (EJS Partials)
* Responsive layout

---

## 🛠 Tech Stack

**Frontend**

* EJS (Embedded JavaScript Templates)
* HTML5, CSS3

**Backend**

* Node.js
* Express.js

**Database**

* MySQL

**Other Tools & Libraries**

* body-parser
* cookie-parser
* dotenv
* express-session
* nodemon

---

## 📂 Project Structure

```
PR-12-EMPLOYEE-MANAGEMENT-SYSTEM
│
├── configs/
│   ├── axiosInstance.js
│   ├── database.js
│   └── dotenv.js
│
├── controllers/
│   ├── admin.controller.js
│   ├── employee.controller.js
│   ├── task.controller.js
│   └── user.controller.js
│
├── middlewares/
│   ├── userAuth.middleware.js
│   └── userRole.middleware.js
│
├── models/
│   ├── employee.model.js
│   ├── task.model.js
│   └── user.model.js
│
├── public/
│   └── assets/css/style.css
│
├── router/
│   ├── admin.route.js
│   ├── employee.route.js
│   ├── task.route.js
│   ├── user.route.js
│   └── index.js
│
├── views/
│   ├── pages/
│   └── partials/
│
├── .env
├── .env.example
├── package.json
├── index.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/devanshi78/PR-12-Employee-Management-System
cd employee-management-system
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file using `.env.example`

```env
PORT=8081
MONGODB_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"
```

### 4️⃣ Start the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:8081
```

---

## 🧪 Default Admin Login (Example)

```
Email: admin@example.com
Password: ********
```

*(Change according to your database records)*

---

## 🖼 Screenshots

### 🔑 Admin Login

![Admin Login](./public/images/Screenshot%202025-12-30%20214245.png)

### 📊 Dashboard Overview

![Dashboard](./public/images/Screenshot%202025-12-30%20214305.png)

### ➕ Add Manager

![Add Manager](./public/images/Screenshot%202025-12-30%20214323.png)

### 👨‍💼 Managers List

![Managers](./public/images/Screenshot%202025-12-30%20214333.png)

---

## 🔐 Middleware Logic

* `userAuth.middleware.js` → checks login session
* `userRole.middleware.js` → restricts routes based on role

---

## 📌 Future Enhancements

* Password hashing (bcrypt)
* Forgot password functionality
* Pagination & search
* Task status tracking
* Deployment (Vercel / Render)

---

## 👩‍💻 Author

**Devanshi Parekh**

---

## 🌍 Live Demo

🔗 Project Live URL:  
https://pr-12-employee-management-system.onrender.com

---

## 📄 License

This project is for **learning and educational purposes**.