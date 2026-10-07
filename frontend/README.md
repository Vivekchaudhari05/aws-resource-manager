# ☁️ AWS Resource Manager

> **A full-stack AWS infrastructure management platform built with React, Flask, Python, and Boto3.**

AWS Resource Manager is a full-stack cloud infrastructure management application that provides a centralized web interface for discovering and managing AWS resources such as **Amazon EC2 instances and Amazon S3 buckets and objects**.

Instead of performing every operation manually through the AWS Management Console, users can interact with AWS resources through a simple and centralized dashboard.

---

## 🚀 1. Project Overview

### 📌 Project Name

**AWS Resource Manager**

### 🎯 Objective

The main objective of this project is to build a centralized platform that simplifies AWS resource management through a web interface.

The application connects a **React frontend** with a **Flask backend**, while the backend uses **Boto3** to communicate with AWS services.

### 🏗️ Architecture

```text
                         👤 User
                           │
                           ▼
                  🖥️ React Frontend
                           │
                           │ REST API
                           ▼
                   ⚙️ Flask Backend
                           │
                           │ Boto3
                           ▼
                     ☁️ AWS Services
                    ┌──────┼──────┐
                    ▼      ▼      ▼
                  EC2     S3     IAM/STS
```

---

## ✨ 2. Key Features

### 📊 Dashboard

The dashboard provides an overview of AWS resources and application activity.

Features include:

* 🖥️ EC2 instance count
* 🪣 S3 bucket count
* ☁️ Total discovered AWS resources
* 📋 Recent operations
* 🟢 AWS connection status
* 📦 Resource overview
* 📈 EC2 instance status information
* 🕒 Recent activity

### 🖥️ EC2 Management

The EC2 section provides functionality for managing EC2 instances.

Supported operations include:

* 📋 List EC2 instances
* 🔍 View instance information
* ▶️ Start instances
* ⏹️ Stop instances
* 🔄 Reboot instances
* 🗑️ Terminate instances
* 🚀 Launch new EC2 instances
* 📌 View instance state
* 🌐 View private/public IP information
* 📍 View Availability Zone
* 🔗 View VPC and subnet information

### 🪣 S3 Management

The S3 section provides functionality for managing buckets and objects.

Supported operations include:

* 📋 List S3 buckets
* ➕ Create S3 buckets
* 🎯 Select a bucket
* 📂 List bucket objects
* ⬆️ Upload files
* ⬇️ Download objects
* 🗑️ Delete objects
* ✏️ Custom object keys
* ✅ Object validation
* ⚠️ Delete confirmation
* 📄 Display object metadata

### 📝 Activity Tracking

The application records important AWS operations performed through the application.

Examples include:

* 🪣 Create Bucket
* ⬆️ Upload Object
* ⬇️ Download Object
* 🗑️ Delete Object
* 🖥️ EC2 operations

Activity information includes:

* 🆔 Action ID
* ⚡ Action
* 📦 Resource type
* 🔗 Resource ID
* 🟢 Status
* 🕒 Timestamp

> ℹ️ Activity data is currently maintained in memory and is reset when the Flask application restarts.

### 🛡️ Error Handling

The backend includes centralized error handling for:

* ☁️ AWS `ClientError` exceptions
* ⚠️ General application exceptions
* ❌ Validation errors
* 🚫 Invalid API requests

---

## 🛠️ 3. Technology Stack

### 🖥️ Frontend

* ⚛️ React
* 🟨 JavaScript
* ⚡ Vite
* 🌐 HTML
* 🎨 CSS
* 🔌 REST API integration

### ⚙️ Backend

* 🐍 Python
* 🌶️ Flask
* 🔗 Flask-CORS
* ☁️ Boto3
* 🔐 python-dotenv

### ☁️ AWS

* 🖥️ Amazon EC2
* 🪣 Amazon S3
* 🔐 AWS IAM
* 🪪 AWS STS

### 🔧 Development Tools

* 💻 Visual Studio Code
* 📦 Git
* 🐙 GitHub
* ☁️ AWS CLI
* 🌐 Google Chrome

---

## 📁 4. Project Structure

```text
aws-resource-manager/
│
├── 🖥️ frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── activity/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── ec2/
│   │   │   ├── layout/
│   │   │   └── s3/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── ⚙️ backend/
│   ├── aws/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   ├── app.py
│   └── requirements.txt
│
├── 📚 docs/
├── 📄 README.md
├── 📜 LICENSE
└── 🚫 .gitignore
```

---

## 🖥️ 5. Frontend Architecture

The React frontend follows a component-based architecture.

```text
⚛️ React Application
│
├── 📄 Pages
│   ├── 📊 Dashboard
│   ├── 🖥️ EC2
│   ├── 🪣 S3
│   ├── ☁️ Resources
│   ├── 📝 Activity
│   └── ⚙️ Settings
│
├── 🧩 Components
│   ├── 📊 Dashboard
│   ├── 🖥️ EC2
│   ├── 🪣 S3
│   ├── 📝 Activity
│   ├── 🔧 Common
│   └── 🧱 Layout
│
├── 🔌 Services
│   ├── 🌐 API
│   ├── 🖥️ EC2 Service
│   ├── 🪣 S3 Service
│   ├── ☁️ Resource Service
│   └── 📝 Activity Service
│
├── 🪝 Hooks
│   ├── useEC2
│   ├── useS3
│   ├── useResources
│   └── useActivity
│
├── 🔄 Context
│   ├── AppContext
│   └── NotificationContext
│
└── 🛠️ Utilities
    ├── Constants
    ├── Formatters
    └── Validators
```

### 🎨 Frontend Responsibilities

The frontend is responsible for:

* 🖥️ User interface
* 🖱️ User interactions
* 📝 Form handling
* 🔌 API requests
* 📊 Displaying AWS resource information
* ⏳ Loading states
* ❌ Error states
* ⚠️ Confirmation dialogs
* 🔔 Notifications

> 🔐 **AWS credentials and Boto3 are not used in the React frontend.**

---

## ⚙️ 6. Backend Architecture

The Flask backend is organized into separate layers.

```text
🌶️ Flask Application
│
├── 🛣️ Routes
│   ├── 🖥️ EC2
│   ├── 🪣 S3
│   ├── 📊 Dashboard
│   ├── ☁️ Resources
│   └── 📝 Activity
│
├── ⚙️ Services
│   ├── 🖥️ EC2 Service
│   ├── 🪣 S3 Service
│   ├── 📊 Dashboard Service
│   ├── ☁️ Resource Service
│   └── 📝 Activity Service
│
├── ☁️ AWS
│   ├── AWS Session
│   ├── EC2 Client
│   ├── S3 Client
│   └── IAM Client
│
├── 🔧 Configuration
│
├── 📦 Models
│
├── 🛠️ Utilities
│   ├── Validators
│   ├── Logger
│   └── Error Handler
│
└── 🧪 Tests
```

### 🛣️ Route Layer

Handles HTTP requests and API responses.

### ⚙️ Service Layer

Contains application and AWS business logic.

### ☁️ AWS Layer

Creates Boto3 sessions and AWS service clients.

### 🛠️ Utility Layer

Provides validation and centralized error handling.

This separation makes the application easier to maintain, test, and extend.

---

## ☁️ 7. AWS Services

### 🖥️ Amazon EC2

Used for:

* 📋 Discovering EC2 instances
* ▶️ Starting instances
* ⏹️ Stopping instances
* 🔄 Rebooting instances
* 🗑️ Terminating instances
* 🚀 Launching instances
* 📄 Reading instance metadata

### 🪣 Amazon S3

Used for:

* 📋 Listing buckets
* ➕ Creating buckets
* 📂 Listing objects
* ⬆️ Uploading objects
* ⬇️ Downloading objects
* 🗑️ Deleting objects

### 🔐 AWS IAM / STS

Used for AWS identity and permission management.

The application relies on the standard **Boto3 credential chain** during development.

---

## 🔌 8. API Endpoints

### 💚 Health

```text
GET /api/health
```

Checks whether the Flask backend is running.

### 📊 Dashboard

```text
GET /api/dashboard
```

Returns dashboard resource information.

### 🖥️ EC2

```text
GET    /api/ec2/instances
POST   /api/ec2/launch
POST   /api/ec2/start
POST   /api/ec2/stop
POST   /api/ec2/reboot
DELETE /api/ec2/terminate
```

### 🪣 S3

```text
GET    /api/s3/buckets
POST   /api/s3/buckets

GET    /api/s3/objects

POST   /api/s3/upload

DELETE /api/s3/object

GET    /api/s3/download
```

### ☁️ Resources

```text
GET /api/resources
```

Returns a summary of available AWS resources.

### 📝 Activity

```text
GET /api/activity
```

Returns recorded application activity.

---

## 📦 9. Local Development Setup

### 📋 Prerequisites

Install the following:

* 🐍 Python 3.x
* 🟢 Node.js
* 📦 npm
* 📦 Git
* ☁️ AWS CLI
* ☁️ AWS account
* 💻 Visual Studio Code

---

## 🔐 10. AWS Configuration

Configure AWS CLI credentials before starting the backend.

```cmd
aws configure
```

Provide:

```text
AWS Access Key ID
AWS Secret Access Key
Default region name: ap-south-1
Default output format: json
```

Verify the AWS identity:

```cmd
aws sts get-caller-identity
```

The application uses the Boto3 credential chain rather than storing AWS credentials in the React application.

> 🔒 Never commit AWS access keys, secret keys, or `.env` files to GitHub.

---

## ⚙️ 11. Backend Setup

Open CMD and navigate to the backend:

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\backend
```

Activate the virtual environment:

```cmd
venv\Scripts\activate
```

Install dependencies:

```cmd
pip install -r requirements.txt
```

Start the Flask backend:

```cmd
python app.py
```

The backend runs at:

```text
http://127.0.0.1:5000
```

### 💚 Health Check

Open:

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

---

## 🖥️ 12. Frontend Setup

Open another CMD window.

Navigate to the frontend:

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\frontend
```

Install dependencies:

```cmd
npm install
```

Start the Vite development server:

```cmd
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

---

## 🔄 13. Frontend to Backend Communication

The React application communicates with Flask through REST APIs.

```text
🌐 Browser
    │
    ▼
⚛️ React
    │
    │ HTTP / REST
    ▼
🌶️ Flask
    │
    │ Boto3
    ▼
☁️ AWS
```

The Flask backend allows requests from:

```text
http://localhost:5173
```

through Flask-CORS.

---

## 🔐 14. Security Considerations

The project follows several basic security practices:

* 🔒 AWS credentials are not stored in React source code.
* 🛡️ AWS operations are performed by the Flask backend.
* 🔑 AWS permissions should follow the principle of least privilege.
* 🌱 Environment variables can be used for configuration.
* 🚫 `.env` files should not be committed to Git.
* ✅ Input validation is performed before AWS operations.
* ⚠️ AWS errors are handled centrally.
* 🗑️ Destructive operations require explicit user actions.

For production deployment, **AWS IAM roles should be preferred over long-lived access keys**.

---

## 🧪 15. Testing

The project includes backend test directories for AWS resource functionality.

Testing areas include:

* 🖥️ EC2 operations
* 🪣 S3 operations
* 🔌 Resource APIs
* ✅ Input validation
* ⚠️ API error handling

### 🐍 Python Syntax Check

```cmd
python -m py_compile app.py
```

### ⚛️ Frontend Production Build

```cmd
cd frontend
npm run build
```

---

## 🚀 16. Production Build

To create the frontend production build:

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\frontend
npm run build
```

Vite generates the production files inside:

```text
frontend/dist/
```

The generated build can later be deployed to a suitable hosting platform such as Amazon S3, CloudFront, or another web server.

---

## 📈 17. Current Project Status

The current implementation includes:

* ✅ React frontend
* ✅ Flask backend
* ✅ AWS Boto3 integration
* ✅ EC2 resource management
* ✅ S3 bucket management
* ✅ S3 object management
* ✅ Dashboard
* ✅ Activity tracking
* ✅ API validation
* ✅ AWS error handling
* ✅ Centralized backend configuration
* ✅ CORS configuration
* ✅ Production frontend build

---

## 🔮 18. Future Enhancements

Possible future improvements include:

* 💾 Persistent activity database
* 🔐 User authentication
* 👥 Role-based access control
* 📊 CloudWatch monitoring
* 📈 EC2 CPU utilization charts
* 🔎 Advanced S3 object search
* 📄 Pagination for large resource lists
* 🏷️ AWS resource tagging
* 🌍 Multi-region support
* 🏗️ Infrastructure deployment using AWS services
* 🐳 Docker containerization
* 🔄 CI/CD pipeline
* 🧪 Automated backend and frontend testing
* ☁️ Production deployment

---

## 🎓 19. Learning Outcomes

This project demonstrates practical experience with:

* ⚛️ React application development
* 🌶️ Flask REST API development
* 🐍 Python backend architecture
* ☁️ AWS SDK for Python (Boto3)
* 🖥️ Amazon EC2
* 🪣 Amazon S3
* 🔐 AWS IAM
* 🪪 AWS STS
* 🔑 AWS credential management
* 🔌 REST API integration
* ⚠️ Error handling
* ✅ Input validation
* 🤖 Cloud resource automation
* 📦 Git and GitHub workflow
* 🏗️ Full-stack application architecture

---

## 🏁 20. Conclusion

AWS Resource Manager provides a centralized interface for interacting with AWS infrastructure through a modern web application.

The project demonstrates how a **React frontend** can communicate with a **Flask backend**, while the backend uses **Boto3** to securely interact with AWS services.

It provides practical experience in:

* ☁️ Cloud automation
* 🔌 REST API development
* 🖥️ AWS resource management
* 🔐 Security and permissions
* ✅ Validation
* ⚠️ Error handling
* 🏗️ Full-stack application architecture

---

## 👨‍💻 Author



> 🚀 Built as a practical AWS, Python, and full-stack development project.

---

## ⭐ Project Highlights

```text
⚛️ React
        ↓
🌶️ Flask REST API
        ↓
🐍 Python + Boto3
        ↓
☁️ AWS
 ┌──────┼──────┐
 ▼      ▼      ▼
EC2     S3    IAM/STS
```

**AWS Resource Manager — Manage AWS resources from one place. ☁️🚀**
