# Pipeline Description

## Overview

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the **SpiceStory** project. The pipeline is managed using **CircleCI** and automates the process of building, testing, and deploying the application.

## Pipeline Workflow

The pipeline is triggered automatically when changes are pushed to the GitHub repository. The workflow consists of the following stages:

1. **Checkout Code**: The pipeline pulls the latest code from the GitHub repository.
2. **Install Dependencies**:
   - Installs project dependencies for both frontend and backend.
3. **Run Tests**:
   - Executes unit tests to validate code correctness and stability.
4. **Build and Package**:
   - Builds the frontend (Angular) application.
   - Packages the backend (Node.js with Express) application.
5. **Deploy to AWS**:
   - Deploys the frontend to **Amazon S3**.
   - Deploys the backend to **AWS Elastic Beanstalk**.

## Steps in Detail

### 1. Checkout Code

- The pipeline retrieves the latest source code from the GitHub repository.

### 2. Install Dependencies

- The backend dependencies are installed using `npm install`.
- The frontend dependencies are installed using `npm install` inside the `client/` directory.

### 3. Run Tests

- The backend tests are executed using `npm test`.
- Ensures that any breaking changes are caught before deployment.

### 4. Build and Package

- The frontend application is built using Angular's production configuration (`npm run build --configuration=production`).
- The backend application is compiled and prepared for deployment (`npm run build`).

### 5. Deploy to AWS

- **Frontend Deployment:** The built frontend application is uploaded to an **AWS S3** bucket.
- **Backend Deployment:** The backend is deployed to **AWS Elastic Beanstalk**.
- Environment variables such as `DB_HOST`, `PORT`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` are configured in **CircleCI**.

## Pipeline Configuration

The pipeline is defined in `.circleci/config.yml`, which includes all the above steps using CircleCI’s job execution workflow.
