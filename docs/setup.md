# ⚙️ AWS Resource Manager — Setup Guide

This guide explains how to configure, run, verify, and troubleshoot the **AWS Resource Manager** project in a local development environment.

---

## 📋 1. Prerequisites

Before running the project, make sure the following tools are installed:

| Tool                  | Purpose                              |
| --------------------- | ------------------------------------ |
| 🐍 Python 3.10+       | Flask backend                        |
| ⚛️ Node.js 18+        | React frontend                       |
| 📦 npm                | Frontend dependency management       |
| 🌿 Git                | Version control                      |
| ☁️ AWS CLI            | AWS authentication and configuration |
| 💻 Visual Studio Code | Development environment              |
| 🌐 Google Chrome      | Application testing                  |

### 🔎 Verify Installations

Open **CMD** and run:

```cmd
python --version
node --version
npm --version
git --version
aws --version
```

---

# ☁️ 2. AWS Configuration

AWS Resource Manager uses **boto3** to communicate with AWS services.

The default AWS Region is:

```text
ap-south-1
```

📍 **AWS Region:** Mumbai

### 🔐 Configure AWS CLI

Run:

```cmd
aws configure
```

Enter your AWS credentials when prompted.

Then verify the configured AWS identity:

```cmd
aws sts get-caller-identity
```

A successful response should return information such as:

```json
{
    "UserId": "...",
    "Account": "...",
    "Arn": "..."
}
```

> 🔒 **Security:** Never commit AWS Access Keys, Secret Keys, or other credentials to GitHub.

---

# 📁 3. Project Location

The project should be located at:

```text
C:\Users\Anuj\Documents\Vivek\aws-resource-manager
```

### 🗂️ Project Structure

```text
aws-resource-manager/
│
├── 📁 backend/
│   ├── 📁 aws/
│   ├── 📁 config/
│   ├── 📁 models/
│   ├── 📁 routes/
│   ├── 📁 services/
│   ├── 📁 tests/
│   ├── 📁 utils/
│   ├── 📁 venv/
│   └── 🐍 app.py
│
├── 📁 frontend/
│   ├── 📁 public/
│   ├── 📁 src/
│   ├── 📄 package.json
│   └── ⚛️ vite.config.js
│
├── 📁 docs/
│   ├── 📁 api/
│   ├── 📁 architecture/
│   └── 📁 screenshots/
│
└── 📄 README.md
```

---

# 🐍 4. Backend Setup

The backend is built using **Python + Flask + boto3**.

### 📍 Navigate to Backend

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\backend
```

---

## 4.1 🛠️ Create Virtual Environment

If the virtual environment does not already exist:

```cmd
python -m venv venv
```

---

## 4.2 ▶️ Activate Virtual Environment

```cmd
venv\Scripts\activate
```

After activation, CMD should display something similar to:

```text
(venv) C:\Users\Anuj\Documents\Vivek\aws-resource-manager\backend>
```

---

## 4.3 📦 Install Backend Dependencies

Install the required packages:

```cmd
pip install flask flask-cors boto3 python-dotenv
```

### 🔎 Verify Packages

```cmd
pip show flask
pip show flask-cors
pip show boto3
pip show python-dotenv
```

---

# ⚙️ 5. Backend Configuration

The backend configuration is stored in:

```text
backend/config/settings.py
```

The default AWS Region is:

```text
AWS_REGION=ap-south-1
```

The project uses the **boto3 credential chain** for AWS authentication.

This allows local development to use AWS CLI credentials without storing credentials directly inside the application source code.

### 🔐 Credential Flow

```text
💻 Local Machine
       │
       ▼
☁️ AWS CLI Credentials
       │
       ▼
🐍 boto3
       │
       ▼
☁️ AWS Services
```

---

# ▶️ 6. Start the Flask Backend

From the backend directory:

```cmd
venv\Scripts\activate
python app.py
```

The Flask backend should start at:

```text
http://127.0.0.1:5000
```

Expected development server output will be similar to:

```text
* Running on http://127.0.0.1:5000
```

---

# ❤️ 7. Verify Backend Health

Open Google Chrome and visit:

```text
http://127.0.0.1:5000/api/health
```

Expected response:

```json
{
    "status": "success",
    "message": "AWS Resource Manager backend is running"
}
```

If this response appears, the Flask backend is working correctly. ✅

---

# ⚛️ 8. Frontend Setup

The frontend is built using **React + Vite**.

Open a **second CMD window**.

Navigate to:

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\frontend
```

---

## 8.1 📦 Install Frontend Dependencies

Run:

```cmd
npm install
```

This installs the packages defined in:

```text
frontend/package.json
```

---

# ▶️ 9. Start the React Frontend

Run:

```cmd
npm run dev
```

Vite should display a local development URL similar to:

```text
http://localhost:5173/
```

Open the URL in **Google Chrome**.

---

# 🔗 10. Frontend → Backend Communication

The application follows a clear separation between the frontend and backend.

```text
                 👤 User
                   │
                   ▼
          ⚛️ React Frontend
                   │
                   │ REST API
                   ▼
           🐍 Flask Backend
                   │
                   │ boto3
                   ▼
              ☁️ AWS
        ┌──────────┼──────────┐
        ▼          ▼          ▼
      🔐 IAM      💻 EC2     🪣 S3
```

### 🌐 Backend API Base URL

```text
http://127.0.0.1:5000/api
```

### ⚛️ Frontend URL

```text
http://localhost:5173
```

---

# 🧪 11. API Verification

Important API endpoints include:

| Method | Endpoint             | Purpose                 |
| ------ | -------------------- | ----------------------- |
| `GET`  | `/api/health`        | ❤️ Backend health check |
| `GET`  | `/api/dashboard`     | 📊 Dashboard data       |
| `GET`  | `/api/ec2/instances` | 💻 EC2 instances        |
| `GET`  | `/api/s3/buckets`    | 🪣 S3 buckets           |
| `GET`  | `/api/resources`     | ☁️ AWS resource summary |
| `GET`  | `/api/activity`      | 📝 Activity history     |

### 📊 Example

Open:

```text
http://127.0.0.1:5000/api/dashboard
```

The response should contain AWS resource information such as EC2 and S3 data.

---

# 🖥️ 12. Development Workflow

For normal development, use **two CMD windows**.

### 🐍 Terminal 1 — Backend

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\backend
venv\Scripts\activate
python app.py
```

### ⚛️ Terminal 2 — Frontend

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\frontend
npm run dev
```

Then open:

```text
http://localhost:5173/
```

---

# 🔐 13. Security Guidelines

Follow these rules when working on the project:

### 🔑 Credentials

* ❌ Never hard-code AWS access keys.
* ❌ Never hard-code AWS secret keys.
* ❌ Never commit `.env` files.
* ❌ Never expose AWS credentials in React code.
* ✅ Use AWS CLI credentials for local development.
* ✅ Prefer IAM roles when deploying the backend to AWS.

### 🛡️ Application Security

* ✅ Validate API input.
* ✅ Handle AWS errors properly.
* ✅ Keep AWS operations inside the backend.
* ✅ Do not allow the frontend to directly access AWS credentials.
* ✅ Apply least-privilege IAM permissions.

---

# 🧹 14. Files That Should Not Be Committed

The following files and directories should normally be excluded from Git:

```text
backend/venv/
backend/__pycache__/
frontend/node_modules/
frontend/dist/
.env
*.pyc
```

These files are generated locally and are not required in the GitHub repository.

---

# 🛠️ 15. Troubleshooting

## ❌ Backend Does Not Start

Check Python:

```cmd
python --version
```

Activate the virtual environment:

```cmd
venv\Scripts\activate
```

Then start Flask:

```cmd
python app.py
```

---

## ❌ AWS Authentication Error

Run:

```cmd
aws sts get-caller-identity
```

If authentication fails, configure AWS CLI again:

```cmd
aws configure
```

Then retry:

```cmd
aws sts get-caller-identity
```

---

## ❌ Frontend Cannot Connect to Backend

First verify that Flask is running.

Open:

```text
http://127.0.0.1:5000/api/health
```

If the health endpoint works, check the frontend API configuration.

---

## ❌ CORS Error

The backend is configured to allow the React development server:

```text
http://localhost:5173
```

Make sure the frontend is running on the expected Vite port.

---

## ❌ S3 Error

Check:

* ☁️ AWS credentials
* 🌎 AWS Region
* 🪣 Bucket name
* 🔐 IAM permissions
* 📦 Bucket existence

---

## ❌ EC2 Error

Check:

* ☁️ AWS credentials
* 🆔 Instance ID
* 🌎 AWS Region
* 🔐 IAM permissions
* 💻 Current EC2 instance state

---

# 🏗️ 16. Production Build

When the frontend is ready for production, create the production build.

Navigate to:

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\frontend
```

Run:

```cmd
npm run build
```

The production files will be generated inside:

```text
frontend/dist/
```

> 📌 `dist/` is a generated directory and normally should not be committed to GitHub.

---

# 🔄 17. Complete Application Startup

### Step 1 — Configure AWS

```cmd
aws sts get-caller-identity
```

### Step 2 — Start Backend

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\backend
venv\Scripts\activate
python app.py
```

### Step 3 — Start Frontend

Open another CMD:

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\frontend
npm run dev
```

### Step 4 — Open Application

```text
http://localhost:5173/
```

### Step 5 — Verify

Check:

* 📊 Dashboard
* 💻 EC2
* 🪣 S3
* ☁️ Resources
* 📝 Activity
* ⚙️ Settings

---

# ✅ 18. Setup Checklist

Before considering the development environment ready:

* [ ] 🐍 Python installed
* [ ] ⚛️ Node.js installed
* [ ] 📦 npm installed
* [ ] 🌿 Git installed
* [ ] ☁️ AWS CLI installed
* [ ] 🔐 AWS credentials configured
* [ ] 🆔 `aws sts get-caller-identity` works
* [ ] 🐍 Backend virtual environment created
* [ ] 📦 Backend dependencies installed
* [ ] ▶️ Flask backend starts successfully
* [ ] ❤️ `/api/health` works
* [ ] 📦 Frontend dependencies installed
* [ ] ▶️ React frontend starts successfully
* [ ] 🔗 Frontend connects to backend
* [ ] 📊 Dashboard loads AWS data
* [ ] 💻 EC2 page loads
* [ ] 🪣 S3 page loads
* [ ] ☁️ Resources page loads
* [ ] 📝 Activity page loads
* [ ] ⚙️ Settings page loads

---

# 🏆 19. Final Architecture

```text
                         👤 USER
                           │
                           ▼
                  ┌─────────────────┐
                  │  ⚛️ React UI    │
                  │    Frontend     │
                  └────────┬────────┘
                           │
                        REST API
                           │
                           ▼
                  ┌─────────────────┐
                  │  🐍 Flask API   │
                  │     Backend     │
                  └────────┬────────┘
                           │
                         boto3
                           │
                           ▼
              ┌─────────────────────────┐
              │       ☁️ AWS Cloud      │
              ├──────────┬──────────────┤
              │          │              │
              ▼          ▼              ▼
           🔐 IAM      💻 EC2         🪣 S3
```

---

# 🎯 20. Setup Goal

The goal of this setup is to provide a clean local development environment where:

* ⚛️ React manages the user interface.
* 🐍 Flask manages the REST API.
* 🔧 Python services handle application logic.
* ☁️ boto3 communicates with AWS.
* 🔐 IAM controls AWS permissions.
* 💻 EC2 resources can be monitored and managed.
* 🪣 S3 buckets and objects can be managed.
* 📊 Dashboard data is retrieved from AWS.
* 📝 Application operations are tracked through the Activity system.

This separation keeps the application **secure, maintainable, scalable, and suitable for further cloud deployment**.
