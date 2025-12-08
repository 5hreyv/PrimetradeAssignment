# 🟦 PrimeTrade Intelligence – Full-Stack Assignment  
A secure, scalable **backend + frontend** system built for the **PrimeTrade Backend/Frontend Developer Intern task**.

<div align="center">
  <img src="screenshots/dashboard1.png" width="700">
</div>

---

## 📌 Overview  
This project demonstrates:

- Secure REST API development with authentication  
- Role-based access control  
- CRUD operations for Crypto Trade Signals  
- React frontend integrated with JWT-protected APIs  
- Professional UI with **Dark/Light theme toggle**  
- Full Postman documentation  

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT login & registration  
- Password hashing (bcrypt)  
- Role-based access (`user` / `admin`)  
- Protected routes for signals  

### 📊 Trade Signal CRUD
- Create, read, update, delete signals  
- Filters → symbol, risk level, status  
- Secure ownership checks  
- Performance score output  

### 🎨 Frontend (React)
- Login + Register pages  
- Dashboard with signals table  
- Form to create new signals  
- **Dark / Light theme toggle**  
- Web3-style UI  
- Fully responsive  

### 🧪 API Documentation
- Postman Collection  
- Postman Environment  

### ⚙️ Tech Stack
**Backend:** Node.js, Express, PostgreSQL, JWT, bcrypt  
**Frontend:** React (Vite), Axios, React Router  

---

## 📂 Folder Structure  

```txt
primetrade-intelligence-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js

primetrade-intelligence-ui/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── vite.config.js

postman/
├── primetrade-postman-collection.json
└── primetrade-postman-environment.json

screenshots/
├── login.png
├── register.png
├── dashboard1.png
├── dashboard2.png
├── dashboard3.png
├── dashboard4.png
├── light_login.png
├── light_register.png
└── light_dashboard1.png
```

---

## 🖼️ Screenshots

### 🔒 Login  
<div align="center">
  <img src="screenshots/login.png" width="500">
</div>

### 🧾 Register  
<div align="center">
  <img src="screenshots/register.png" width="500">
</div>

### 📊 Dashboard (Dark Mode)  
<div align="center">
  <img src="screenshots/dashboard1.png" width="700">
</div>

### ☀️ Dashboard (Light Mode)  
<div align="center">
  <img src="screenshots/light_dashboard1.png" width="700">
</div>

---

## 🔧 Environment Variables  

### Backend `.env`

```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/primetrade
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🛠️ Project Setup

### 1️⃣ Backend Setup  

```sh
cd primetrade-intelligence-api
npm install
npm run dev
```

Backend runs at:  
`http://localhost:5000`

---

### 2️⃣ Frontend Setup  

```sh
cd primetrade-intelligence-ui
npm install
npm run dev
```

Frontend runs at:  
`http://localhost:5173`

---

## 🧪 Postman Documentation  

Postman files inside `/postman`:

```txt
primetrade-postman-collection.json
primetrade-postman-environment.json
```

Import them into Postman to test all APIs.

---

## 📈 Scalability Notes  
This system is designed with clean architecture principles:

- Modular service/controller architecture  
- Database-ready for replication/sharding  
- Easy to integrate Redis caching  
- Environment-based configuration  
- Clean separation of frontend & backend  
- Could be expanded into microservices (auth, signals, analytics)  

---

## 👩‍💻 Author  

**Shreya Katare**  
GitHub: https://github.com/5hreyv  

---

## 📜 License  
Licensed under the MIT License.

<div align="center">
  ⭐ Thank you for reviewing the PrimeTrade Assignment! ⭐
</div>
