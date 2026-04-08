# AI Resume Analyzer API (with Authentication)

# Overview

AI Resume Analyzer is a backend application that evaluates resumes using AI and provides structured insights such as score, strengths, weaknesses, missing skills, and improvement suggestions.

This project demonstrates:

- Secure backend API development
- AI integration using LLM APIs
- JWT-based authentication
- MongoDB data modeling
- Production-ready architecture

# Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- OpenAI API

# Features

# Authentication

- User Registration
- User Login
- JWT-based authentication for protected routes

# Resume Analysis

- Analyze resume text using AI
- Generate:
  - Score out of 100
  - Strengths
  - Weaknesses
  - Missing skills
  - Suggestions

# Data Storage

- Stores resume and analysis results in MongoDB
- User-specific data handling

# Project Structure

src/
├── controllers/
├── routes/
├── models/
├── config/
├── middlewares/
├── services/
|── app.ts

# Environment Variables

Create a `.env` file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key

# Installation & Run

# 1. Install dependencies

npm install

# 2. Run in development mode

npm run dev

# 3. Build & run production

npm run build
npm start

# API Endpoints

# Auth

# Register

POST /api/auth/register

# Login

GET /api/auth/login

### 📄 Resume

# Analyze Resume (Protected)

POST /api/resume/analyze
Authorization: Bearer <token>

# Request Body

{
"resumeText": "Experienced Node.js developer with 5 years..."
}

# Sample Response

{
"message": "Resume analyzed successfully",
"data": {
"score": 78,
"strengths": ["Strong backend experience"],
"weaknesses": ["Limited cloud exposure"],
"missingSkills": ["AWS", "Docker"],
"suggestions": ["Add cloud-based projects"]
}
}

# Testing Flow

1. Register user with email and password
2. Login → get JWT token
3. Call `/api/resume/analyze` with token
4. View AI-generated response

Use Postman / Thunder Client.

# Architecture

- MVC pattern (controllers, models, routes)
- Middleware for authentication and error handling
- Service layer for AI integration
- Scalable and modular folder structure

# Security

- JWT-based route protection
- Environment variables for sensitive data
- Password hashing using bcrypt

# Future Improvements

- Resume upload (PDF/DOC parsing)
- ATS score optimization
- Job description matching
- AI-based resume rewriting
- Rate limiting and caching

# Key Highlights

- Built AI-powered backend system
- Integrated LLM for real-world use case
- Implemented authentication & security
- Designed scalable API architecture

# Author

Backend project built to demonstrate:

- Advanced API development
- AI integration
- Production-level backend design

# Conclusion

This project showcases the ability to:

- Build secure and scalable backend systems
- Integrate AI into real-world applications
- Follow industry-standard development practices
