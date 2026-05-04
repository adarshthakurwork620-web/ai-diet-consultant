# 🥗 NutriAI - AI-Powered Diet Consultation Platform

> A full-stack AI diet consultation web application built with React, Flask, and Groq AI.

![NutriAI Banner](https://img.shields.io/badge/NutriAI-AI%20Diet%20Consultant-green?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🎨 Frontend | [ai-diet-consultant-liart.vercel.app](https://ai-diet-consultant-liart.vercel.app) |
| 🔧 Backend API | [nutriai-backend-xspo.onrender.com](https://nutriai-backend-xspo.onrender.com) |

---

## 📸 Screenshots

> Login → Register → Dashboard → AI Chat → Meal Plan

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login & registration system
- 🤖 **AI Consultation** — Real-time diet advice powered by Groq AI (LLaMA 3.1)
- 📊 **Dashboard** — Personalized health metrics & calorie tracking
- 🍽️ **Meal Planner** — 7-day Indian meal plan generation
- 📱 **Responsive UI** — Mobile-friendly design with Tailwind CSS
- 🗄️ **Database** — SQLite with Flask-SQLAlchemy ORM

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI Framework |
| Tailwind CSS | Styling |
| React Router v6 | Navigation |

### Backend
| Technology | Purpose |
|---|---|
| Python Flask | REST API |
| Flask-SQLAlchemy | ORM |
| SQLite | Database |
| JWT | Authentication |
| Groq API | AI Engine |
| Gunicorn | Production Server |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Groq API Key (free at console.groq.com)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/adarshthakurwork620-web/ai-diet-consultant.git
cd ai-diet-consultant
```

### 2️⃣ Setup Backend
```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file: