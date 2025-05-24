# 🛍️ Product Page (a weekend project)

This is a minimal full-stack e-commerce product page built over a single weekend. It allows users to view photo products, add them to a cart, and make payments securely through Razorpay. The backend handles authentication, protected routes, and payment processing — all built with simplicity and performance in mind.

---

## ✨ Features

- 🖼️ Beautiful product display (photographs for sale)
- 🛒 Cart functionality
- 💳 Razorpay payment integration
- 🔒 JWT-based user authentication
- 🔐 Password hashing using bcrypt
- 🍪 Auth tokens stored in cookies
- 🚫 Protected routes for checkout
- 🌐 Fully responsive with Tailwind CSS

---

## ⚙️ Technologies Used

### Frontend (Vite + React)
- React
- Tailwind CSS
- Axios
- React Router

### Backend (Node + Express)
- Express.js
- CORS
- dotenv
- bcryptjs
- jsonwebtoken (JWT)
- cookie-parser
- Razorpay Node SDK

### Other Tools
- Razorpay Dashboard for payments
- Render for backend deployment
- Vercel for frontend deployment
- Cloudinary for hosting product images

---

## 🚀 How It Was Built (In One Weekend?!)

The goal was to challenge myself to build a working product store in just 48 hours — from authentication to checkout. I started with a basic React setup using Vite for speed, implemented the cart UI, and wired it to a simple Express backend. JWT and bcrypt were added for secure login. Finally, Razorpay was integrated and tested in dev mode.

---

## 🧠 What I Learned

- Integrating Razorpay with custom product metadata
- Storing JWTs securely in HTTP-only cookies
- Managing CORS properly across dev and prod
- Deploying a full-stack app with Vercel + Render in record time
- Keeping things minimal but functional

---

## 📸 Live Demo

[Frontend](https://product-page-git-main-mayurs-projects-8fbc2ff1.vercel.app/)  
[Backend](https://product-page-pcoy.onrender.com)

---


