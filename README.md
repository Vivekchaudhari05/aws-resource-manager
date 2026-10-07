# ☁️ AWS Resource Manager

> A full-stack AWS infrastructure management platform built with **React, Flask, Python, and Boto3**.

AWS Resource Manager provides a centralized web interface for viewing and managing AWS resources such as **Amazon EC2 instances and Amazon S3 buckets**.

The project combines a modern React frontend with a Flask REST API backend. The backend communicates with AWS using **Boto3**, allowing users to perform common AWS resource management operations without directly interacting with the AWS Console for every task.

---

## 📌 Project Overview

**AWS Resource Manager** is designed to simplify AWS infrastructure management through a single dashboard.

Instead of manually performing every operation through the AWS Management Console, users can interact with AWS resources through a web-based interface.

The application currently focuses on:

* 🖥️ Amazon EC2 instance management
* 🪣 Amazon S3 bucket management
* 📦 S3 object management
* 📊 AWS resource dashboard
* 📝 Activity tracking
* 🔌 AWS connection monitoring
* 📈 Resource summaries
* ⚙️ Infrastructure management operations

The project follows a clean separation between the frontend, backend, and AWS infrastructure.

---

## 🎯 Project Objective

The main objective of this project is to build a practical platform that demonstrates how **Python and Boto3 can be used to automate and manage AWS resources** through a custom web application.

### Key objectives

* ☁️ Connect a web application with AWS services
* 🐍 Use Python and Boto3 for AWS automation
* ⚛️ Build a modern React-based frontend
* 🔌 Develop REST APIs using Flask
* 🖥️ Manage EC2 instances
* 🪣 Manage S3 buckets and objects
* 📊 Display AWS resource information
* 📝 Track infrastructure operations
* 🔐 Follow secure AWS credential practices
* 🧪 Implement validation and error handling
* 📚 Build professional project documentation

---

# 🏗️ System Architecture

The application follows a three-layer architecture:

```text
                    👤 USER
                      │
                      ▼
             ⚛️ React Frontend
                      │
                  REST API
                      │
                      ▼
              🐍 Flask Backend
                      │
                    Boto3
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
        IAM         EC2          S3
       ☁️ AWS       🖥️ AWS       🪣 AWS
```

### Architecture Flow

```text
User
 │
 ▼
React Application
 │
 │ HTTP / REST
 ▼
Flask REST API
 │
 │ Business Logic
 ▼
Service Layer
 │
 │ Boto3
 ▼
AWS SDK
 │
 ├── Amazon EC2
 ├── Amazon S3
 └── AWS IAM
```

### Architecture Principles

* ⚛️ React handles the user interface.
* 🔌 Flask handles REST API requests.
* 🐍 Python services contain AWS business logic.
* ☁️ Boto3 communicates with AWS.
* 🔐 AWS credentials are never stored in frontend code.
* 📦 Frontend and backend remain independently maintainable.

---

# ✨ Features

## 📊 Dashboard

The dashboard provides a centralized overview of AWS resources.

### Dashboard features

* 🖥️ EC2 instance count
* 🪣 S3 bucket count
* ☁️ Total discovered AWS resources
* 📝 Recent operation count
* 📋 Resource overview
* 📈 EC2 instance status information
* 🔌 AWS connection status
* 🕒 Recent activity

---

## 🖥️ EC2 Management

The EC2 section provides functionality for viewing and managing EC2 instances.

### Supported operations

* 📋 List EC2 instances
* 🔍 View instance details
* ▶️ Start an instance
* ⏹️ Stop an instance
* 🔄 Reboot an instance
* 🗑️ Terminate an instance
* 🚀 Launch an EC2 instance
* 🔎 Filter EC2 instances
* 📊 View instance status

> ⚠️ Destructive operations such as termination should be used carefully on real AWS resources.

---

## 🪣 S3 Management

The S3 section provides management capabilities for buckets and objects.

### Bucket operations

* 📋 List S3 buckets
* ➕ Create a bucket
* 🔍 View bucket details
* 🔎 Filter buckets

### Object operations

* 📋 List objects
* 📤 Upload files
* 📥 Download objects
* 🗑️ Delete objects
* 🔎 View object information
* 📏 Display object sizes

---

## 📝 Activity Tracking

The application records operations performed through the platform.

Tracked information includes:

* 🔢 Activity ID
* ⚙️ Action
* 📦 Resource type
* 🆔 Resource ID
* ✅ Operation status
* 🕒 Timestamp

Example:

```text
CREATE S3 BUCKET
Resource: aws-resource-manager-test
Status: success
Timestamp: 2026-10-06T17:16:17Z
```

> Activity data is currently stored in memory and resets when the Flask application restarts.

---

## 🔌 AWS Connection Status

The dashboard provides AWS connectivity information so users can identify whether the backend can communicate with AWS successfully.

The backend uses the AWS SDK for Python:

```text
Python
   │
   ▼
Boto3
   │
   ▼
AWS APIs
```

---

# 🛠️ Technology Stack

## Frontend

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| ⚛️ React      | User interface                  |
| ⚡ Vite        | Frontend development/build tool |
| 🟨 JavaScript | Application logic               |
| 🎨 CSS        | Styling                         |
| 🌐 Fetch API  | Backend communication           |

## Backend

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| 🐍 Python        | Backend programming language |
| 🌶️ Flask        | REST API framework           |
| ☁️ Boto3         | AWS SDK                      |
| 🔐 Botocore      | AWS error handling           |
| 🌐 Flask-CORS    | Cross-origin API access      |
| ⚙️ python-dotenv | Environment configuration    |

## Cloud

| AWS Service    | Purpose                         |
| -------------- | ------------------------------- |
| 🖥️ Amazon EC2 | Compute management              |
| 🪣 Amazon S3   | Object storage                  |
| 🔐 AWS IAM     | Identity and permissions        |
| 📡 AWS STS     | Credential/session verification |

---

# 📁 Project Structure

```text
aws-resource-manager/
│
├── 📄 README.md
│
├── 🐍 backend/
│   │
│   ├── 📄 app.py
│   │
│   ├── ☁️ aws/
│   │   ├── ec2_client.py
│   │   ├── s3_client.py
│   │   ├── iam_client.py
│   │   └── session.py
│   │
│   ├── ⚙️ config/
│   │   └── settings.py
│   │
│   ├── 📦 models/
│   │
│   ├── 🔌 routes/
│   │   ├── activity.py
│   │   ├── dashboard.py
│   │   ├── ec2.py
│   │   ├── resources.py
│   │   └── s3.py
│   │
│   ├── 🧠 services/
│   │   ├── activity_service.py
│   │   ├── dashboard_service.py
│   │   ├── ec2_service.py
│   │   ├── resource_service.py
│   │   └── s3_service.py
│   │
│   ├── 🧪 tests/
│   │
│   ├── 🛠️ utils/
│   │
│   └── 🐍 venv/
│
├── ⚛️ frontend/
│   │
│   ├── 📄 index.html
│   ├── 📄 package.json
│   ├── ⚙️ vite.config.js
│   │
│   ├── 📁 public/
│   │
│   └── 📁 src/
│       │
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       ├── index.css
│       │
│       ├── 🧩 components/
│       │   ├── activity/
│       │   ├── common/
│       │   ├── dashboard/
│       │   ├── ec2/
│       │   ├── layout/
│       │   └── s3/
│       │
│       ├── 🌐 context/
│       │   ├── AppContext.jsx
│       │   └── NotificationContext.jsx
│       │
│       ├── 🪝 hooks/
│       │   ├── useActivity.js
│       │   ├── useEC2.js
│       │   ├── useResources.js
│       │   └── useS3.js
│       │
│       ├── 📄 pages/
│       │   ├── Activity.jsx
│       │   ├── Dashboard.jsx
│       │   ├── EC2.jsx
│       │   ├── Resources.jsx
│       │   ├── S3.jsx
│       │   └── Settings.jsx
│       │
│       ├── 🔌 services/
│       │   ├── activityService.js
│       │   ├── api.js
│       │   ├── ec2Service.js
│       │   ├── resourceService.js
│       │   └── s3Service.js
│       │
│       ├── 🎨 styles/
│       │   ├── components.css
│       │   ├── index.css
│       │   ├── layout.css
│       │   ├── responsive.css
│       │   └── variables.css
│       │
│       └── 🛠️ utils/
│           ├── constants.js
│           ├── formatters.js
│           └── validators.js
│
├── 📚 docs/
│   │
│   ├── architecture/
│   │   ├── system-architecture.md
│   │   ├── frontend-architecture.md
│   │   └── backend-architecture.md
│   │
│   ├── api/
│   │   └── api-documentation.md
│   │
│   ├── screenshots/
│   │   ├── README.md
│   │   ├── 01-dashboard.png
│   │   ├── 02-ec2.png
│   │   ├── 03-s3.png
│   │   ├── 04-activity.png
│   │   ├── 05-resources.png
│   │   └── 06-settings.png
│   │
│   ├── setup.md
│   └── testing.md
│
└── 🔐 .gitignore
```

> `venv/`, `node_modules/`, `dist/`, cache files, and environment files should not be committed to Git.

---

# ⚛️ Frontend Architecture

The frontend follows a component-based React architecture.

```text
React Application
│
├── Pages
│   ├── Dashboard
│   ├── EC2
│   ├── S3
│   ├── Resources
│   ├── Activity
│   └── Settings
│
├── Components
│   ├── Dashboard Components
│   ├── EC2 Components
│   ├── S3 Components
│   ├── Activity Components
│   ├── Layout Components
│   └── Common Components
│
├── Hooks
│   ├── useEC2
│   ├── useS3
│   ├── useResources
│   └── useActivity
│
├── Services
│   └── API communication
│
├── Context
│   ├── Application state
│   └── Notifications
│
└── Utils
    ├── Validators
    ├── Formatters
    └── Constants
```

### Frontend responsibilities

* 🎨 Render user interface
* 🖱️ Handle user interactions
* 📋 Display AWS resource information
* 🔎 Filter and search resources
* 📤 Send API requests
* 📥 Display API responses
* ⚠️ Display errors and notifications
* 🚫 Never directly access AWS credentials

---

# 🐍 Backend Architecture

The backend follows a layered Flask architecture.

```text
HTTP Request
     │
     ▼
 Flask Routes
     │
     ▼
 Service Layer
     │
     ▼
 Boto3 / AWS Clients
     │
     ▼
 AWS Services
     │
     ▼
 HTTP Response
```

### Backend responsibilities

* 🔌 Provide REST APIs
* 🧠 Implement business logic
* ☁️ Communicate with AWS
* 🔐 Validate incoming requests
* ⚠️ Handle AWS errors
* 📝 Record activities
* 📦 Format API responses
* 🔒 Keep AWS credentials away from frontend code

---

# ☁️ AWS Services

## 🖥️ Amazon EC2

Used for:

* Listing instances
* Starting instances
* Stopping instances
* Rebooting instances
* Terminating instances
* Launching instances
* Viewing instance metadata

---

## 🪣 Amazon S3

Used for:

* Listing buckets
* Creating buckets
* Listing objects
* Uploading objects
* Downloading objects
* Deleting objects

---

## 🔐 AWS IAM

IAM is used to control permissions required by the application.

The application should follow the principle of least privilege.

Example permissions can include only the AWS actions required by the application rather than unrestricted administrator access.

---

## 📡 AWS STS

AWS STS is useful for verifying the active AWS identity and credentials used by the application.

---

# 🔌 API Endpoints

The backend API is available locally at:

```text
http://127.0.0.1:5000/api
```

## ❤️ Health

```http
GET /api/health
```

Checks whether the Flask backend is running.

---

## 📊 Dashboard

```http
GET /api/dashboard
```

Returns:

* EC2 resource summary
* S3 resource summary
* Resource counts
* Resource information

---

## 🖥️ EC2

```http
GET /api/ec2/instances
```

Returns EC2 instances.

```http
POST /api/ec2/start
```

Starts an EC2 instance.

```http
POST /api/ec2/stop
```

Stops an EC2 instance.

```http
POST /api/ec2/reboot
```

Reboots an EC2 instance.

```http
POST /api/ec2/terminate
```

Terminates an EC2 instance.

```http
POST /api/ec2/launch
```

Launches an EC2 instance.

---

## 🪣 S3

```http
GET /api/s3/buckets
```

Returns available S3 buckets.

```http
GET /api/s3/objects?bucket=<bucket-name>
```

Returns objects from a bucket.

```http
POST /api/s3/buckets
```

Creates an S3 bucket.

```http
POST /api/s3/upload
```

Uploads an object to S3.

```http
DELETE /api/s3/object
```

Deletes an S3 object.

```http
GET /api/s3/download?bucket=<bucket-name>&key=<object-key>
```

Downloads an S3 object.

---

## 📝 Activity

```http
GET /api/activity
```

Returns recorded application activities.

---

# 🚀 Setup Instructions

## 1️⃣ Clone the repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd aws-resource-manager
```

---

# 🐍 Backend Setup

Navigate to the backend:

```cmd
cd backend
```

Create a virtual environment:

```cmd
python -m venv venv
```

Activate it:

```cmd
venv\Scripts\activate
```

Install dependencies:

```cmd
pip install -r requirements.txt
```

---

## 🔐 Configure AWS Credentials

The application uses the standard AWS credential chain.

For local development, configure AWS CLI credentials:

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

> 🔐 Never place AWS access keys directly inside React source code or commit them to GitHub.

---

## ⚙️ Configure Environment

The backend uses environment configuration such as:

```text
AWS_REGION=ap-south-1
FLASK_ENV=development
```

A `.env` file may be used for local configuration.

Example:

```text
AWS_REGION=ap-south-1
FLASK_ENV=development
```

The `.env` file should remain excluded from Git.

---

## ▶️ Start Flask Backend

From the `backend` directory:

```cmd
python app.py
```

The backend should start at:

```text
http://127.0.0.1:5000
```

Test the health endpoint:

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

# ⚛️ Frontend Setup

Open another CMD window.

Navigate to:

```cmd
cd C:\Users\Anuj\Documents\Vivek\aws-resource-manager\frontend
```

Install dependencies:

```cmd
npm install
```

Start the development server:

```cmd
npm run dev
```

Vite will provide a local URL similar to:

```text
http://localhost:5173/
```

Open the URL in Chrome.

---

# 🔐 Security

Security is an important part of the project.

## Credential Security

The application should:

* 🔒 Never hard-code AWS access keys
* 🚫 Never expose AWS secrets in React
* 🚫 Never commit `.env` files
* 🚫 Never commit credentials to Git
* 🔑 Use IAM permissions
* 🎯 Follow least-privilege access
* ☁️ Prefer IAM roles when deployed to AWS

---

## 🔑 Recommended Credential Flow

### Local development

```text
Local Machine
     │
     ▼
AWS CLI Credentials
     │
     ▼
Boto3
     │
     ▼
AWS
```

### Production deployment

```text
Application Server
       │
       ▼
IAM Role
       │
       ▼
Boto3
       │
       ▼
AWS
```

This avoids storing long-term AWS credentials inside the application.

---

# 🧪 Testing

The project includes testing and validation documentation under:

```text
docs/testing.md
```

Testing areas include:

* ❤️ Backend health check
* 🔌 API endpoint testing
* ☁️ AWS connectivity
* 🖥️ EC2 data retrieval
* 🪣 S3 bucket retrieval
* 📦 S3 object operations
* 🔐 Input validation
* ⚠️ Error handling
* 🌐 Frontend/backend integration
* 🖥️ UI functionality

### Basic backend verification

```cmd
python app.py
```

Then open:

```text
http://127.0.0.1:5000/api/health
```

### Frontend verification

```cmd
npm run dev
```

Then open:

```text
http://localhost:5173/
```

---

# 📦 Production Build

The React frontend can be prepared for production using:

```cmd
cd frontend
npm run build
```

Vite generates the production files inside:

```text
frontend/dist/
```

The generated `dist/` directory contains optimized frontend assets.

Preview the production build locally:

```cmd
npm run preview
```

> `dist/` should normally be excluded from source control unless the deployment strategy specifically requires committing built assets.

---

# 📸 Project Screenshots

The project includes documented screenshots under:

```text
docs/screenshots/
```

Available screenshots include:

| Screenshot         | Description             |
| ------------------ | ----------------------- |
| `01-dashboard.png` | 📊 Main AWS dashboard   |
| `02-ec2.png`       | 🖥️ EC2 management      |
| `03-s3.png`        | 🪣 S3 management        |
| `04-activity.png`  | 📝 Activity tracking    |
| `05-resources.png` | ☁️ Resource overview    |
| `06-settings.png`  | ⚙️ Application settings |

---

# 📚 Project Documentation

Additional documentation is available in the `docs/` directory.

```text
docs/
│
├── architecture/
│   ├── system-architecture.md
│   ├── frontend-architecture.md
│   └── backend-architecture.md
│
├── api/
│   └── api-documentation.md
│
├── screenshots/
│   └── README.md
│
├── setup.md
└── testing.md
```

### 📐 Architecture Documentation

Contains detailed information about:

* System architecture
* Frontend architecture
* Backend architecture
* Application data flow

### 🔌 API Documentation

Contains:

* Endpoint descriptions
* Request formats
* Response formats
* Error handling

### 🚀 Setup Documentation

Contains detailed local development setup instructions.

### 🧪 Testing Documentation

Contains testing procedures and verification steps.

---

# 📊 Current Project Status

| Area                          | Status                |
| ----------------------------- | --------------------- |
| ⚛️ React Frontend             | ✅ Completed           |
| 🐍 Flask Backend              | ✅ Completed           |
| ☁️ AWS Integration            | ✅ Completed           |
| 🖥️ EC2 Integration           | ✅ Completed           |
| 🪣 S3 Integration             | ✅ Completed           |
| 📊 Dashboard                  | ✅ Completed           |
| 📝 Activity Tracking          | ✅ Completed           |
| 🔐 Input Validation           | ✅ Completed           |
| ⚠️ Error Handling             | ✅ Completed           |
| 📚 API Documentation          | ✅ Completed           |
| 📐 Architecture Documentation | ✅ Completed           |
| 🧪 Testing Documentation      | ✅ Completed           |
| 📸 Screenshots                | ✅ Completed           |
| 📖 Project README             | ✅ Completed           |
| 🚀 Production Build Support   | ✅ Implemented         |
| 🌐 Cloud Deployment           | 🔄 Future Enhancement |
| 🔐 Production Authentication  | 🔄 Future Enhancement |

---

# 🔮 Future Enhancements

The project can be extended with additional AWS services and production capabilities.

## ☁️ More AWS Services

Possible additions:

* 📦 DynamoDB
* 🌐 Amazon VPC
* ⚖️ Application Load Balancer
* 📈 CloudWatch
* 🔔 SNS
* ⚡ Lambda
* 🚀 Auto Scaling
* 🧰 Systems Manager

---

## 🔐 Authentication

Add user authentication and authorization using:

* Amazon Cognito
* JWT
* Role-based access control
* User management

---

## 💾 Persistent Activity Storage

Currently, activity records are stored in memory.

Future versions could use:

```text
React
  ↓
Flask
  ↓
Activity Service
  ↓
DynamoDB / RDS
```

This would allow activity history to survive application restarts.

---

## 📊 Advanced Monitoring

Future versions could include:

* 📈 CloudWatch metrics
* 🖥️ CPU utilization
* 💾 Memory monitoring
* 🌐 Network statistics
* 🚨 CloudWatch alarms
* 📊 Historical charts

---

## 🚀 Cloud Deployment

The complete application can eventually be deployed using AWS infrastructure such as:

```text
                    🌐 Users
                       │
                       ▼
                 ⚖️ Load Balancer
                       │
              ┌────────┴────────┐
              ▼                 ▼
          🖥️ EC2             🖥️ EC2
              │                 │
              └────────┬────────┘
                       ▼
                 🐍 Flask API
                       │
                       ▼
                    ☁️ AWS
```

Possible deployment services:

* Amazon EC2
* Elastic Beanstalk
* ECS
* AWS Lambda
* Application Load Balancer
* Amazon S3
* CloudFront

---

# 🎓 Learning Outcomes

This project provided practical experience in several areas.

### ☁️ AWS

* Understanding AWS services
* EC2 management
* S3 management
* IAM permissions
* AWS credential management
* AWS API interaction

### 🐍 Python

* Python application development
* Flask REST APIs
* Boto3
* AWS SDK integration
* Error handling
* Service-layer architecture

### ⚛️ React

* Component-based development
* React hooks
* State management
* Context API
* API integration
* Reusable UI components
* Form handling
* Modal and confirmation workflows

### 🌐 Full-Stack Development

* REST API architecture
* Frontend/backend communication
* Request/response handling
* Validation
* Error handling
* Application architecture

### 🔐 Security

* AWS credential protection
* IAM permissions
* Least-privilege concepts
* Environment variables
* Secure application design

### 🧰 DevOps & Engineering

* Git and GitHub
* Project documentation
* Testing
* Production builds
* Application structure
* Cloud-ready architecture

---

# 🧠 Key Technical Concepts Demonstrated

This project demonstrates understanding of:

```text
React
  │
  ▼
REST API
  │
  ▼
Flask
  │
  ▼
Python Services
  │
  ▼
Boto3
  │
  ▼
AWS APIs
  │
  ├── EC2
  ├── S3
  └── IAM
```

It also demonstrates important software engineering concepts:

* 🧩 Modular architecture
* ♻️ Reusable components
* 🔌 Service-based design
* 🧪 Testing and validation
* ⚠️ Centralized error handling
* 🔐 Secure credential management
* 📚 Technical documentation
* 📦 Production-ready build process

---

# 👨‍💻 Author


AWS | Cloud Computing | Python | React | Flask | Boto3

This project was developed as a hands-on learning project to understand **AWS automation, cloud infrastructure management, full-stack development, and practical DevOps concepts**.

---

# ⭐ Project Highlights

```text
☁️ AWS Resource Management
🐍 Python + Boto3
⚛️ React Frontend
🌶️ Flask REST API
🖥️ EC2 Management
🪣 S3 Management
🔐 IAM & Security
📊 AWS Dashboard
📝 Activity Tracking
🧪 Testing & Validation
📚 Complete Documentation
🚀 Cloud-Ready Architecture
```

---

# 🏁 Conclusion

**AWS Resource Manager** demonstrates how a custom full-stack application can be used to interact with AWS infrastructure through APIs.

By combining **React, Flask, Python, Boto3, and AWS services**, the project provides a practical foundation for automating cloud resource management.

The architecture is designed to be extended with additional AWS services, authentication, monitoring, persistent activity storage, and production cloud deployment.

> 🚀 **The goal of this project is not only to manage AWS resources, but also to understand how cloud services, backend APIs, frontend applications, security, and automation work together to build a real-world cloud management platform.**
