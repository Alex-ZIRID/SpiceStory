# **Application Dependencies**

## **Frontend (Angular Application)**

The frontend is built with **Angular** and uses the following dependencies:

### **Key Dependencies:**

- `@angular/core` → Angular core framework.
- `@angular/router` → Handles routing/navigation.
- `@angular/common/http` → Manages API calls.
- `@angular/forms` → Handles user input and validation.
- `rxjs` → Reactive programming library for handling observables.
- `zone.js` → Required for Angular change detection.

### **Development Dependencies:**

- `@angular-devkit/build-angular` → Angular CLI for building the project.
- `karma` → Test runner for unit tests.
- `jasmine-core` → Testing framework for writing unit tests.

---

## **Backend (Node.js Express API)**

The backend is built with **Node.js + Express** and connects to **PostgreSQL**.

### **Key Dependencies:**

- `express` → Web framework for handling routes and middleware.
- `pg` → PostgreSQL client for database interactions.
- `dotenv` → Loads environment variables from `.env`.
- `cors` → Enables Cross-Origin Resource Sharing.
- `jsonwebtoken` → Handles user authentication via JWT.
- `bcryptjs` → Hashes and secures user passwords.

### **Development Dependencies:**

- `nodemon` → Automatically restarts the server during development.
- `jest` → Testing framework for writing unit tests.
- `supertest` → Used for API endpoint testing.

---

## **CI/CD & Deployment**

- **CircleCI** automates build, test, and deployment steps.
- **AWS Elastic Beanstalk** hosts the backend API.
- **AWS RDS (PostgreSQL)** stores all user and recipe data.
- **AWS S3** hosts the static frontend website.

These dependencies ensure the **full functionality** of the SpiceStory application across frontend, backend, and deployment.
