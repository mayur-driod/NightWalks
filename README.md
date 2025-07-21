# 🌙 Attacus & Psyche

> A bespoke event management platform for night walks under the stars.

![Screenshot 2025-05-26 214751](https://github.com/user-attachments/assets/4c5e9bc7-8953-4582-8a23-8d83dba840f7)

---

![Status](https://img.shields.io/badge/status-in%20development-blueviolet)
![Stars](https://img.shields.io/github/stars/mayur-driod/NightWalks?style=social)
![Issues](https://img.shields.io/github/issues/mayur-driod/NightWalks)
![License](https://img.shields.io/github/license/mayur-driod/NightWalks)
![Contributors](https://img.shields.io/github/contributors/mayur-driod/NightWalks)

---

## 🛍️ About

**Attacus & Psyche** is a full-stack platform to manage **night walk conservation events**.  
Users can browse curated events, register guests, make secure payments, and admins can manage participant data effortlessly.

Built with performance and user experience in mind - both frontend and backend are modern, secure, and elegant.

---

## 🌟 Features

- 🌌 Curated display of night walk events  
- 🛒 Add to cart & register participants  
- 💳 Seamless **Razorpay** payment integration  
- 🔒 **JWT-based authentication**  
- 🔐 Secure password hashing using `bcrypt`  
- 🍪 Auth stored in **HTTP-only cookies**  
- 🧾 Downloadable participant data (`CSV`) & order history (`XLSX`)  
- 📤 Admin export tools for event management  
- 📱 Fully responsive design via **Tailwind CSS**  
- 📸 Cloudinary image uploads for events or profiles  

---

## ⚙️ Tech Stack

### 🖥 Frontend – React + Vite + Tailwind

- React 19  
- Vite  
- Tailwind CSS 4  
- Axios  
- React Router DOM  
- EmailJS  
- Lucide Icons  

### 🌐 Backend – Express + MongoDB

- Express 5  
- MongoDB & Mongoose  
- Razorpay SDK  
- JSON Web Tokens (JWT)  
- bcrypt  
- Multer + Cloudinary  
- Nodemailer / React Email  
- json-2-csv & xlsx for export features  

---

## 🗂️ System Architecture

```mermaid
graph TD;
    A[Frontend: React + Vite] -->|Axios API Calls| B(Express.js Backend);
    B --> C[MongoDB];
    B --> D[Razorpay SDK];
    B --> E[Cloudinary Uploads];
    B --> F[CSV/XLSX Export];
    B --> G[JWT Auth];
    B --> H[Nodemailer / EmailJS];
    C -->|Mongoose| B;
```

✅ Built with modular separation of concerns and scalable exports/auth/payment workflows.

## 📦 Project Structure
```
/frontend
  ├── src/
  │   ├── pages
  │   ├── components/
  │   ├── services/ (API)
  │   └── assets/

  /Emails
    ├── Email.html
  
 /backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── utils/
  └── index.js
```

### 📸 Live Demo
🌐 Frontend → Functioning Master [deployement](https://attacus-and-psyche.vercel.app/)

### 🖥️ Backend → Deployed on Render.

## 🚧 Current Status
We’re still adding features, testing, debugging, and ensuring the platform is stable and robust.  A significant amount of work remains, but around 90% of the project is complete.

✨ Contributors
<table> <tr> <td align="center"> <a href="https://github.com/mayur-driod"> <img src="https://avatars.githubusercontent.com/your-username" width="100px;" alt=""/> <br /> <sub><b>mayur k setty</b></sub> </a><br />👑 Project Lead </td> </tr> </table>

### 📃 License
This project is licensed under the MIT License.

### 📬 Contact
For feedback, bugs, or collaborations:
📧 settymayurk@gmail.com
[🔗 LinkedIn](https://www.linkedin.com/in/mayurksetty/)

Feel free to fork this repository and submit PR's as contributions. Follow the Contributions.md for PR's to get accepted.

🌏 *made with ❤️ in India by Mayur.*
  

