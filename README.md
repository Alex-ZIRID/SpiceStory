# 🍽️ SpiceStory - Recipe Sharing Platform

## About SpiceStory

SpiceStory is a dynamic recipe-sharing platform that allows users to explore, create, and share their favorite recipes. Users can register, log in, save recipes, and interact with other users' culinary creations. The platform ensures a seamless experience through a modern web interface and a robust backend API.

---

## Project Overview

This project is deployed on AWS using the following services:

- **Frontend:** Deployed on **Amazon S3** (Static Website Hosting)
- **Backend:** Hosted on **AWS Elastic Beanstalk** (Node.js API Server)
- **Database:** PostgreSQL on **Amazon RDS**
- **CI/CD:** CircleCI automates testing and deployment

---

## Live Application

**Frontend URL:** [SpiceStory Web App](http://spicestory-frontend.s3-website-us-east-1.amazonaws.com/)  
**Backend API Base URL:** `http://spicestory-env.eba-hhdpcdbw.us-east-1.elasticbeanstalk.com/api`

---

## Screenshots & Architecture

Screenshots of frontend, backend, Postman tests, and AWS architecture diagrams can be found inside the docs folder.

---

## Technologies Used

### **Frontend (Angular)**

- Angular 15+
- TypeScript
- SCSS
- Angular Material

### **Backend (Node.js + Express)**

- Node.js (v18)
- Express.js
- PostgreSQL (via `pg` package)
- JWT Authentication
- RESTful API Structure

### **Deployment & Infrastructure**

- **Amazon S3** (Frontend hosting)
- **Amazon RDS** (PostgreSQL Database)
- **AWS Elastic Beanstalk** (Backend hosting)
- **CircleCI** (CI/CD pipeline)

---

## Setup & Installation

### **Prerequisites**

- Node.js v18+
- PostgreSQL
- AWS CLI (For Deployment)

### **Clone the Repository**

```bash
 git clone https://github.com/Alex-ZIRID/SpiceStory.git
 cd SpiceStory
```

### **Backend Setup**

```bash
cd server
npm install
npm run build
npm start
```

### **Frontend Setup**

```bash
cd client
npm install
npm run build -- --configuration=production
```

---

## Test Credentials

To test the application, use the following user:

- **Email:** `john@smith.com`
- **Password:** `123456`

---

## Deployment Instructions

### **Frontend Deployment (S3)**

```bash
aws s3 sync client/dist/spicestory s3://your-s3-bucket-name --delete
```

### **Backend Deployment (Elastic Beanstalk)**

```bash
cd server
npm run build
eb deploy
```

---

## CI/CD with CircleCI

This project uses **CircleCI** to automate testing and deployments. Every push to the main branch triggers:

1. **Code Checkout**
2. **Dependency Installation**
3. **Build Process for Frontend & Backend**
4. **Tests Execution**
5. **Deployment to AWS**

To integrate CircleCI:

- Configure **AWS_ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY**, and **AWS_REGION** in CircleCI environment variables.

---

## API Endpoints

### **Authentication**

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | User Registration |
| POST   | `/api/auth/login`    | User Login        |
| GET    | `/api/auth/profile`  | Get User Profile  |

### **Recipes**

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/api/recipes`     | Fetch All Recipes   |
| GET    | `/api/recipes/:id` | Fetch Recipe by ID  |
| POST   | `/api/recipes`     | Create a New Recipe |
| PUT    | `/api/recipes/:id` | Update a Recipe     |
| DELETE | `/api/recipes/:id` | Delete a Recipe     |

---

## License

This project is open-source under the **MIT License**.

---

## Contributors

- **Alex Sanchez** - Project Lead & Developer

For inquiries, feel free to reach out!

---
