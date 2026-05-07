# AI Resume Analyzer API (with Authentication, RAG & Caching)

---

# Overview

AI Resume Analyzer is a backend application that analyzes resumes and evaluates their compatibility with a given job description.

It leverages AI along with **Retrieval-Augmented Generation (RAG)** to provide more accurate and context-aware insights. The system also uses **Redis caching** to optimize performance and reduce repeated AI calls.

The application generates an ATS (Applicant Tracking System) score and structured insights including strengths, weaknesses, missing skills, and actionable suggestions.

The project is fully containerized using Docker and Docker Compose, enabling consistent development and deployment environments.

---

# Key Highlights

- AI-powered resume analysis with contextual understanding (RAG)
- ATS scoring with keyword matching
- Redis caching for performance optimization
- JWT-based authentication
- Dockerized backend architecture
- Scalable and modular backend architecture

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- OpenAI API
- Redis (Caching Layer)
- Docker & Docker Compose

---

# File Processing

- Multer (file upload handling)
- pdf-parse (PDF parsing)
- Mammoth (DOCX parsing)

---

# Core Concepts Implemented

# Retrieval-Augmented Generation (RAG)

- Resume text is split into chunks
- Each chunk is converted into embeddings
- Embeddings are stored in an in-memory vector store (per user)
- Relevant chunks are retrieved using cosine similarity based on job description
- Only relevant context is sent to AI → improves accuracy and reduces noise

---

# Redis Caching

- AI responses are cached using Redis
- Prevents repeated OpenAI API calls for same input
- Improves response time and reduces cost

---

# Docker Containerization

The application is containerized using Docker and Docker Compose.

Docker is used to:

- Standardize development and deployment environments
- Run backend and Redis services together
- Simplify project setup using a single command
- Improve scalability and deployment consistency

---

# Features

# Authentication

- User Registration
- User Login
- JWT-based authentication for protected routes

---

# Resume Analysis

- Analyze resume with job description using AI + RAG
- Generate:
  - Score out of 100
  - Strengths
  - Weaknesses
  - Missing skills
  - Suggestions

---

# ATS Analysis

- Evaluate resume compatibility with job description
- Generate:
  - ATS Score
  - Matched Keywords
  - Missing Keywords
  - Suggestions

---

# Data Storage

- Stores resume and analysis results in MongoDB
- User-specific data isolation (RAG embeddings tied to userId)

---

# Project Structure

```
src/
├── controllers/
├── routes/
├── models/
├── config/
├── middlewares/
├── services/
│   ├── aiServices.ts
│   ├── vectorServices.ts   # RAG logic
│   ├── redisService.ts    # Redis caching
├── utils/
│   ├── chunker.ts
│   ├── embeddings.ts
│   ├── fileParser.ts
│   ├── similarity.ts
├── store/
│   └── vectorStore.ts
├── app.ts

Dockerfile
docker-compose.yml
.env

```

---

# Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
REDIS_URL=your_redis_url
```

---

# Installation & Run

# 1. Install dependencies

```
npm install
```

# 2. Run Using Docker Compose

```
docker-compose up --build
```

# 3. Start Redis (required for caching)

```
redis-server
```

# 4. Run in development

```
npm run dev
```

# 5. Production

```
npm run build
npm start
```

---

# Docker Setup

# Dockerfile

The project uses a Dockerfile to containerize the Node.js backend application.

**docker-compose.yml**

Docker Compose is used to orchestrate:

- Node.js backend service
- Redis caching service
- MongoDB is hosted on MongoDB Atlas (cloud database).

---

# API Endpoints

# Auth

**POST** `/api/auth/register`
**POST** `/api/auth/login`

---

# Resume

# Analyze Resume (Protected)

**POST** `/api/resume/analyze`
Authorization: Bearer `<token>`

---

# Request Body

```
{
  "resumeText": "Experienced Node.js developer...",
  "jobDescription": "Required skills: Node.js, Express...",
  "includeATS": true
}
```

---

# File Upload

**POST** `/api/resume/analyze/file`

---

# Processing Flow

1. User uploads resume
2. Extract text from file
3. Text is split into chunks
4. Embeddings are generated and stored (per user)
5. Relevant chunks are retrieved based on query (RAG)
6. Context is sent to AI model
7. Response is generated
8. Redis caches the response
9. Result is stored in MongoDB

---

# Security

- JWT-based authentication
- Password hashing using bcrypt
- Rate limiting
- Centralized error handling
- Environment-based configuration

---

# Future Improvements

- AI-based resume rewriting
- Integration with vector databases (Pinecone/Chroma)
- Multi-session context handling
- CI/CD pipeline integration

---

# Author

Backend project demonstrating:

- Advanced Node.js backend development
- AI system design (RAG architecture)
- Performance optimization using caching
- Dockerized backend deployment
- Scalable API architecture

---

# Conclusion

This project showcases the ability to:

- Build production-ready backend systems
- Implement AI with real-world architecture (RAG)
- Optimize performance using Redis caching
- Containerize applications using Docker & Docker Compose
- Design scalable and secure APIs
