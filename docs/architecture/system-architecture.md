\# 🏗️ AWS Resource Manager — System Architecture



\## 📌 Overview



AWS Resource Manager follows a \*\*three-layer architecture\*\* consisting of:



1\. 🖥️ React frontend

2\. ⚙️ Flask backend

3\. ☁️ AWS infrastructure



The frontend provides the user interface, the Flask backend manages application logic and AWS communication, and Boto3 connects the backend to AWS services.



\---



\# 🏗️ High-Level Architecture



```text

&#x20;                          👤 USER

&#x20;                            │

&#x20;                            ▼

&#x20;                   ┌──────────────────┐

&#x20;                   │  ⚛️ React UI     │

&#x20;                   │   Frontend       │

&#x20;                   └────────┬─────────┘

&#x20;                            │

&#x20;                            │ HTTP / REST API

&#x20;                            ▼

&#x20;                   ┌──────────────────┐

&#x20;                   │ 🌶️ Flask API     │

&#x20;                   │    Backend       │

&#x20;                   └────────┬─────────┘

&#x20;                            │

&#x20;                            │ Application Logic

&#x20;                            ▼

&#x20;                   ┌──────────────────┐

&#x20;                   │ ⚙️ Service Layer │

&#x20;                   └────────┬─────────┘

&#x20;                            │

&#x20;                            │ Boto3

&#x20;                            ▼

&#x20;                   ┌──────────────────┐

&#x20;                   │ ☁️ AWS Layer     │

&#x20;                   └────────┬─────────┘

&#x20;                            │

&#x20;            ┌───────────────┼───────────────┐

&#x20;            ▼               ▼               ▼

&#x20;       ┌─────────┐     ┌─────────┐     ┌─────────┐

&#x20;       │ 🖥️ EC2 │     │ 🪣 S3   │     │ 🔐 IAM  │

&#x20;       └─────────┘     └─────────┘     │  / STS  │

&#x20;                                       └─────────┘

```



\---



\# 🔄 Request Flow



A typical user operation follows this flow:



```text

👤 User

&#x20;  │

&#x20;  │ 1. Performs an action

&#x20;  ▼

⚛️ React Component

&#x20;  │

&#x20;  │ 2. Sends REST API request

&#x20;  ▼

🌶️ Flask Route

&#x20;  │

&#x20;  │ 3. Validates request

&#x20;  ▼

⚙️ Service Layer

&#x20;  │

&#x20;  │ 4. Executes business logic

&#x20;  ▼

☁️ Boto3 Client

&#x20;  │

&#x20;  │ 5. Sends AWS API request

&#x20;  ▼

☁️ AWS Service

&#x20;  │

&#x20;  │ 6. Returns AWS response

&#x20;  ▼

⚙️ Flask Backend

&#x20;  │

&#x20;  │ 7. Formats response

&#x20;  ▼

⚛️ React Frontend

&#x20;  │

&#x20;  │ 8. Updates UI

&#x20;  ▼

👤 User

```



\---



\# 🖥️ Frontend Layer



The frontend is developed using \*\*React and Vite\*\*.



\### Responsibilities



\* 🎨 Render the user interface

\* 🖱️ Handle user interactions

\* 📝 Manage forms

\* 🔌 Send API requests

\* 📊 Display AWS resource information

\* ⏳ Handle loading states

\* ❌ Display errors

\* ⚠️ Display confirmation dialogs

\* 🔔 Display notifications



\### Main Pages



```text

📄 Pages

│

├── 📊 Dashboard

├── 🖥️ EC2

├── 🪣 S3

├── ☁️ Resources

├── 📝 Activity

└── ⚙️ Settings

```



\---



\# ⚙️ Backend Layer



The backend is developed using \*\*Python and Flask\*\*.



The backend acts as the central application layer between the frontend and AWS.



\### Responsibilities



\* 🔌 Provide REST APIs

\* ✅ Validate requests

\* ⚙️ Execute application logic

\* ☁️ Communicate with AWS

\* 🛡️ Handle AWS errors

\* 📝 Record application activity

\* 📦 Format API responses



\---



\# 🛣️ Route Layer



The route layer receives HTTP requests from the frontend.



Current route modules include:



```text

routes/

│

├── 🖥️ ec2.py

├── 🪣 s3.py

├── 📊 dashboard.py

├── ☁️ resources.py

└── 📝 activity.py

```



Each route module exposes APIs for a specific application feature.



\---



\# ⚙️ Service Layer



The service layer contains the application's business logic.



```text

services/

│

├── 📊 dashboard\_service.py

├── 📝 activity\_service.py

├── 🖥️ ec2\_service.py

├── ☁️ resource\_service.py

└── 🪣 s3\_service.py

```



\### Example



An EC2 request follows:



```text

React

&#x20; ↓

EC2 Route

&#x20; ↓

EC2 Service

&#x20; ↓

Boto3 EC2 Client

&#x20; ↓

Amazon EC2

```



\---



\# ☁️ AWS Layer



The AWS layer provides Boto3 clients and sessions.



```text

aws/

│

├── session.py

├── ec2\_client.py

├── s3\_client.py

└── iam\_client.py

```



\### Purpose



The AWS layer separates AWS SDK initialization from the application service logic.



This allows services to request an AWS client without directly managing session configuration.



\---



\# 🖥️ Amazon EC2



The application uses EC2 APIs to manage compute resources.



Supported operations include:



\* 📋 List instances

\* 🚀 Launch instances

\* ▶️ Start instances

\* ⏹️ Stop instances

\* 🔄 Reboot instances

\* 🗑️ Terminate instances



The backend retrieves information such as:



\* Instance ID

\* Instance type

\* State

\* Private IP

\* Public IP

\* Availability Zone

\* VPC ID

\* Subnet ID



\---



\# 🪣 Amazon S3



The application uses S3 APIs for object storage management.



Supported operations include:



\* 📋 List buckets

\* ➕ Create buckets

\* 📂 List objects

\* ⬆️ Upload objects

\* ⬇️ Download objects

\* 🗑️ Delete objects



The application also validates S3 bucket names and object keys before performing operations.



\---



\# 🔐 IAM and STS



AWS IAM and STS provide the identity and permissions layer.



The application uses the AWS credential chain provided by Boto3.



During development, credentials can be supplied through:



```text

AWS CLI configuration

&#x20;       │

&#x20;       ▼

Boto3 Credential Chain

&#x20;       │

&#x20;       ▼

Flask Backend

&#x20;       │

&#x20;       ▼

AWS Services

```



For production environments, IAM roles are preferred over long-lived access keys.



\---



\# 🛡️ Security Architecture



The frontend does not communicate directly with AWS.



```text

❌ React ───────────────► AWS

&#x20;      Direct credentials



✅ React ──► Flask ──► Boto3 ──► AWS

```



This provides a clear separation between:



\* 🖥️ User interface

\* ⚙️ Application logic

\* ☁️ AWS credentials

\* 🔐 AWS permissions



\---



\# 🔒 CORS



The Flask application uses Flask-CORS.



During local development, the backend accepts API requests from:



```text

http://localhost:5173

```



This allows the Vite development server to communicate with Flask.



\---



\# ⚠️ Error Handling



The backend uses centralized error handling.



```text

AWS ClientError

&#x20;      │

&#x20;      ▼

handle\_aws\_error()

&#x20;      │

&#x20;      ▼

Standard API Error Response

```



General application exceptions follow:



```text

Application Exception

&#x20;      │

&#x20;      ▼

handle\_general\_error()

&#x20;      │

&#x20;      ▼

Standard API Error Response

```



This prevents raw backend exceptions from being directly exposed to the frontend.



\---



\# 📝 Activity Architecture



Important operations are recorded by the activity service.



```text

User Action

&#x20;   │

&#x20;   ▼

API Route

&#x20;   │

&#x20;   ▼

AWS Operation

&#x20;   │

&#x20;   ▼

add\_activity()

&#x20;   │

&#x20;   ▼

Activity Store

&#x20;   │

&#x20;   ▼

Activity Page

```



Current activity records contain:



\* 🆔 ID

\* ⚡ Action

\* 📦 Resource type

\* 🔗 Resource ID

\* 🟢 Status

\* 🕒 Timestamp



> ℹ️ Activity storage is currently in memory. It can later be replaced with a persistent database.



\---



\# 📊 Dashboard Architecture



The dashboard combines resource information from multiple services.



```text

&#x20;                 📊 Dashboard

&#x20;                      │

&#x20;         ┌────────────┴────────────┐

&#x20;         ▼                         ▼

&#x20; Resource Service           Activity Service

&#x20;         │                         │

&#x20;    ┌────┴────┐                   │

&#x20;    ▼         ▼                   ▼

&#x20;   EC2        S3              Activities

&#x20;    │         │                   │

&#x20;    └────┬────┘                   │

&#x20;         ▼                         ▼

&#x20;      Dashboard Data

&#x20;             │

&#x20;             ▼

&#x20;         ⚛️ React UI

```



\---



\# 🔄 Example: S3 Upload Flow



```text

👤 User

&#x20; │

&#x20; │ Selects file

&#x20; ▼

⚛️ UploadFileModal

&#x20; │

&#x20; │ FormData

&#x20; ▼

🔌 S3 Service

&#x20; │

&#x20; │ POST /api/s3/upload

&#x20; ▼

🌶️ Flask S3 Route

&#x20; │

&#x20; │ Validate bucket/key/file

&#x20; ▼

⚙️ S3 Service

&#x20; │

&#x20; │ Boto3 put\_object()

&#x20; ▼

🪣 Amazon S3

&#x20; │

&#x20; │ Response

&#x20; ▼

⚙️ Flask

&#x20; │

&#x20; │ Activity logging

&#x20; ▼

⚛️ React

&#x20; │

&#x20; ▼

🔔 UI notification

```



\---



\# 🖥️ Example: EC2 Management Flow



```text

👤 User

&#x20; │

&#x20; │ Select EC2 action

&#x20; ▼

⚛️ EC2 Page

&#x20; │

&#x20; │ REST API

&#x20; ▼

🌶️ EC2 Route

&#x20; │

&#x20; ▼

⚙️ EC2 Service

&#x20; │

&#x20; ▼

☁️ Boto3

&#x20; │

&#x20; ▼

🖥️ Amazon EC2

&#x20; │

&#x20; ▼

📨 Response

&#x20; │

&#x20; ▼

⚛️ React UI

```



\---



\# 📁 Backend Architecture Summary



```text

backend/

│

├── ☁️ aws/

│   ├── session.py

│   ├── ec2\_client.py

│   ├── s3\_client.py

│   └── iam\_client.py

│

├── ⚙️ config/

│   └── settings.py

│

├── 📦 models/

│

├── 🛣️ routes/

│   ├── ec2.py

│   ├── s3.py

│   ├── dashboard.py

│   ├── resources.py

│   └── activity.py

│

├── ⚙️ services/

│   ├── activity\_service.py

│   ├── dashboard\_service.py

│   ├── ec2\_service.py

│   ├── resource\_service.py

│   └── s3\_service.py

│

├── 🧪 tests/

│

├── 🛠️ utils/

│

├── 🌶️ app.py

└── 📦 requirements.txt

```



\---



\# 📁 Frontend Architecture Summary



```text

frontend/

│

└── src/

&#x20;   │

&#x20;   ├── 🧩 components/

&#x20;   │   ├── activity/

&#x20;   │   ├── common/

&#x20;   │   ├── dashboard/

&#x20;   │   ├── ec2/

&#x20;   │   ├── layout/

&#x20;   │   └── s3/

&#x20;   │

&#x20;   ├── 📄 pages/

&#x20;   │   ├── Dashboard.jsx

&#x20;   │   ├── EC2.jsx

&#x20;   │   ├── S3.jsx

&#x20;   │   ├── Resources.jsx

&#x20;   │   ├── Activity.jsx

&#x20;   │   └── Settings.jsx

&#x20;   │

&#x20;   ├── 🔌 services/

&#x20;   ├── 🪝 hooks/

&#x20;   ├── 🔄 context/

&#x20;   ├── 🛠️ utils/

&#x20;   ├── 🎨 styles/

&#x20;   │

&#x20;   ├── App.jsx

&#x20;   └── main.jsx

```



\---



\# 🎯 Design Principles



The architecture follows several important design principles:



\### 🔹 Separation of Concerns



Each layer has a specific responsibility.



\### 🔹 Reusability



Reusable React components and backend services reduce duplicate code.



\### 🔹 Security



AWS credentials remain outside the frontend.



\### 🔹 Maintainability



Routes, services, AWS clients, and utilities are separated.



\### 🔹 Scalability



The architecture can be extended with additional AWS services.



\### 🔹 Testability



Backend logic is separated into services that can be tested independently.



\---



\# 🔮 Future Architecture Enhancements



Future versions could extend the architecture with:



```text

&#x20;                👤 User

&#x20;                   │

&#x20;                   ▼

&#x20;             ⚛️ React

&#x20;                   │

&#x20;                   ▼

&#x20;            🌐 API Gateway

&#x20;                   │

&#x20;                   ▼

&#x20;             ⚙️ Backend

&#x20;                   │

&#x20;       ┌───────────┼───────────┐

&#x20;       ▼           ▼           ▼

&#x20;      EC2         S3         IAM

&#x20;       │           │

&#x20;       └──────┬────┘

&#x20;              ▼

&#x20;       📊 CloudWatch

&#x20;              │

&#x20;              ▼

&#x20;       💾 Database

```



Potential improvements include:



\* 🔐 Authentication

\* 👥 Role-based access control

\* 💾 Persistent activity storage

\* 📊 CloudWatch integration

\* 🌍 Multi-region support

\* 🐳 Docker deployment

\* 🔄 CI/CD automation

\* ☁️ Production AWS deployment



\---



\# 🏁 Conclusion



AWS Resource Manager uses a clean full-stack architecture where \*\*React handles the user interface\*\*, \*\*Flask manages application logic and APIs\*\*, and \*\*Boto3 provides communication with AWS services\*\*.



This separation keeps the application organized, secure, maintainable, and ready for future expansion.



