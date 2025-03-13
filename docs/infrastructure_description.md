# Infrastructure Description

## Overview

The SpiceStory project utilizes AWS cloud services to deploy a fully functional web application, including a frontend, backend API, and a database. The infrastructure is designed for scalability, reliability, and security, leveraging the following AWS services:

- **Amazon S3**: Hosts the frontend static files.
- **AWS Elastic Beanstalk**: Deploys and manages the backend API.
- **Amazon RDS (PostgreSQL)**: Provides a managed relational database.
- **CircleCI**: Automates continuous integration and deployment.

## Infrastructure Components

### 1. **Frontend Hosting (Amazon S3)**

- The frontend application is built using Angular.
- Static files (HTML, CSS, JS) are stored in an **Amazon S3 bucket**.
- The bucket is configured for **public access** to serve content to users.
- The S3 website URL allows users to access the application directly.

### 2. **Backend Deployment (AWS Elastic Beanstalk)**

- The backend is built with **Node.js and Express.js**.
- It is deployed on **AWS Elastic Beanstalk**, which manages the application environment.
- The server listens on **port 8080** as required by Elastic Beanstalk.
- It handles API requests, processes user authentication, and manages recipes.

### 3. **Database (Amazon RDS - PostgreSQL)**

- A **PostgreSQL database instance** is provisioned using AWS RDS.
- Stores all application data, including users, recipes, and comments.
- Configured with **public accessibility disabled** for security.
- Security groups ensure that only the Elastic Beanstalk instance can connect.

### 4. **Continuous Integration & Deployment (CircleCI)**

- **CircleCI pipeline** automates building, testing, and deploying the application.
- Ensures every code change is tested before deployment.
- Deploys the frontend to **S3** and backend to **Elastic Beanstalk** upon successful build.

## Security Considerations

- **IAM Roles**: Access to AWS services is managed using IAM roles with least privilege access.
- **Environment Variables**: Sensitive credentials (e.g., DB credentials, API keys) are stored securely in **AWS and CircleCI environment variables**.
- **HTTPS Enforcement**: AWS ensures encryption in transit for API communication.

## Summary

The infrastructure follows best practices for cloud-based deployment, ensuring the system is **scalable, secure, and maintainable**. The combination of AWS services and CI/CD automation allows for **seamless updates and reliable performance**.
