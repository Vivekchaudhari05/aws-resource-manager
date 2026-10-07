\# 🐍 Backend Architecture



\## 1. Overview



The backend of \*\*AWS Resource Manager\*\* is built using \*\*Python, Flask, and Boto3\*\*.



It acts as the communication layer between the React frontend and AWS services. The frontend sends REST API requests to the Flask backend, and the backend performs AWS operations using the Boto3 SDK.



The backend is designed with a layered architecture to keep API routes, business logic, AWS integration, configuration, and error handling separated.



\### Backend Responsibilities



\* 🌐 Provide REST API endpoints

\* ☁️ Communicate with AWS services

\* 🔧 Execute AWS resource operations

\* ✅ Validate incoming requests

\* 📊 Prepare dashboard and resource data

\* 📝 Track application activities

\* ❌ Handle AWS and application errors

\* 🔐 Keep AWS credentials away from the frontend

\* 🔄 Return structured JSON responses



\---



\# 2. Backend Architecture



The backend follows a layered architecture:



```text

┌──────────────────────────────┐

│       React Frontend         │

└──────────────┬───────────────┘

&#x20;              │

&#x20;              │ REST API / HTTP

&#x20;              ▼

┌──────────────────────────────┐

│        Flask Routes          │

│                              │

│  EC2 | S3 | Dashboard        │

│  Resources | Activity        │

└──────────────┬───────────────┘

&#x20;              │

&#x20;              ▼

┌──────────────────────────────┐

│       Service Layer          │

│                              │

│ EC2 | S3 | Dashboard         │

│ Resources | Activity         │

└──────────────┬───────────────┘

&#x20;              │

&#x20;              ▼

┌──────────────────────────────┐

│       AWS Client Layer       │

│                              │

│ EC2 | S3 | IAM | Session     │

└──────────────┬───────────────┘

&#x20;              │

&#x20;              ▼

┌──────────────────────────────┐

│            Boto3             │

└──────────────┬───────────────┘

&#x20;              │

&#x20;              ▼

┌──────────────────────────────┐

│        AWS Services          │

│                              │

│      EC2 | S3 | IAM          │

└──────────────────────────────┘

```



The React frontend does \*\*not\*\* communicate directly with AWS.



\---



\# 3. Backend Directory Structure



The current backend structure is:



```text

backend/

├── aws/

│   ├── ec2\_client.py

│   ├── iam\_client.py

│   ├── s3\_client.py

│   └── session.py

│

├── config/

│   └── settings.py

│

├── models/

│

├── routes/

│   ├── activity.py

│   ├── dashboard.py

│   ├── ec2.py

│   ├── resources.py

│   └── s3.py

│

├── services/

│   ├── activity\_service.py

│   ├── dashboard\_service.py

│   ├── ec2\_service.py

│   ├── resource\_service.py

│   └── s3\_service.py

│

├── tests/

│

├── utils/

│

├── venv/

│

└── app.py

```



The `venv/` directory is the local Python virtual environment and is not part of the application architecture.



\---



\# 4. Application Entry Point



The main Flask application is:



```text

backend/app.py

```



The application is responsible for:



\* Creating the Flask application

\* Loading configuration

\* Configuring CORS

\* Registering API blueprints

\* Registering error handlers

\* Starting the Flask development server



The API uses the following base path:



```text

/api/

```



The backend health endpoint is:



```text

GET /api/health

```



\---



\# 5. Flask Application Structure



The Flask application follows a blueprint-based structure.



The main application registers the following blueprints:



```text

Activity

Dashboard

EC2

Resources

S3

```



Conceptually:



```text

app.py

&#x20; │

&#x20; ├── activity\_bp

&#x20; ├── dashboard\_bp

&#x20; ├── ec2\_bp

&#x20; ├── resources\_bp

&#x20; └── s3\_bp

```



This keeps individual API areas separated instead of placing all endpoints inside `app.py`.



\---



\# 6. Configuration Layer



Configuration is handled by:



```text

backend/config/settings.py

```



The configuration layer loads environment variables using `python-dotenv`.



Current configuration includes:



```text

AWS\_REGION

FLASK\_ENV

DEBUG

```



The default AWS region is:



```text

ap-south-1

```



which represents the AWS Mumbai region.



Example configuration:



```text

AWS\_REGION=ap-south-1

FLASK\_ENV=development

```



Configuration values should be managed through environment variables rather than hard-coded application secrets.



\---



\# 7. AWS Integration Layer



AWS integration is contained inside the:



```text

backend/aws/

```



directory.



Current structure:



```text

aws/

├── ec2\_client.py

├── iam\_client.py

├── s3\_client.py

└── session.py

```



This layer isolates Boto3 client creation from the application service layer.



\---



\# 8. AWS Session



File:



```text

backend/aws/session.py

```



The session module creates a Boto3 session using the configured AWS region.



The application uses the standard AWS credential provider chain.



This allows credentials to be supplied through supported AWS mechanisms such as:



\* AWS CLI credentials

\* Environment variables

\* IAM roles

\* Other supported Boto3 credential providers



The frontend never receives these credentials.



\---



\# 9. AWS Client Modules



Dedicated modules are used for AWS service clients.



\### EC2 Client



```text

backend/aws/ec2\_client.py

```



Provides the Boto3 EC2 client.



\### S3 Client



```text

backend/aws/s3\_client.py

```



Provides the Boto3 S3 client.



\### IAM Client



```text

backend/aws/iam\_client.py

```



Provides IAM-related AWS integration.



Separating these clients keeps AWS-specific connection logic outside the business logic.



\---



\# 10. Route Layer



The API routes are stored in:



```text

backend/routes/

```



Current route modules:



```text

routes/

├── activity.py

├── dashboard.py

├── ec2.py

├── resources.py

└── s3.py

```



The route layer is responsible for:



1\. Receiving HTTP requests

2\. Reading request parameters

3\. Performing request-level validation

4\. Calling service-layer functions

5\. Returning JSON responses



The routes should remain lightweight and should not contain unnecessary AWS business logic.



\---



\# 11. EC2 API



EC2 endpoints are implemented in:



```text

backend/routes/ec2.py

```



The EC2 backend supports operations including:



\* Listing instances

\* Starting instances

\* Stopping instances

\* Rebooting instances

\* Terminating instances

\* Launching instances



General request flow:



```text

React EC2 Page

&#x20;     ↓

EC2 API Route

&#x20;     ↓

EC2 Service

&#x20;     ↓

EC2 Client

&#x20;     ↓

Boto3

&#x20;     ↓

Amazon EC2

```



\---



\# 12. S3 API



S3 endpoints are implemented in:



```text

backend/routes/s3.py

```



The S3 API supports:



\* Listing buckets

\* Listing objects

\* Creating buckets

\* Uploading objects

\* Downloading objects

\* Deleting objects



Current endpoints include:



```text

GET    /api/s3/buckets

GET    /api/s3/objects

POST   /api/s3/buckets

POST   /api/s3/upload

GET    /api/s3/download

DELETE /api/s3/object

```



S3 routes delegate AWS operations to the S3 service layer.



\---



\# 13. Dashboard API



Dashboard functionality is implemented in:



```text

backend/routes/dashboard.py

```



The primary dashboard endpoint is:



```text

GET /api/dashboard

```



The dashboard endpoint collects resource information and returns aggregated information for the React dashboard.



The request flow is:



```text

Dashboard Page

&#x20;     ↓

GET /api/dashboard

&#x20;     ↓

Dashboard Route

&#x20;     ↓

Dashboard Service

&#x20;     ↓

Resource Service

&#x20;     ↓

EC2 + S3

&#x20;     ↓

Dashboard Response

```



\---



\# 14. Resource API



Resource-related endpoints are implemented in:



```text

backend/routes/resources.py

```



The resource layer provides AWS resource information used by the application.



The resource service combines information from supported AWS services.



For example:



```text

Amazon EC2

&#x20;    +

Amazon S3

&#x20;    ↓

Resource Summary

```



This information can then be consumed by the dashboard.



\---



\# 15. Activity API



Activity functionality is implemented in:



```text

backend/routes/activity.py

```



The activity API provides information about operations performed through the application.



Examples include:



\* S3 bucket creation

\* S3 object upload

\* S3 object deletion

\* S3 object download

\* EC2 operations



The current activity implementation uses an in-memory data structure.



Therefore, activity history is reset when the Flask application restarts.



\---



\# 16. Service Layer



Business logic is implemented inside:



```text

backend/services/

```



Current service modules:



```text

services/

├── activity\_service.py

├── dashboard\_service.py

├── ec2\_service.py

├── resource\_service.py

└── s3\_service.py

```



The service layer separates business logic from Flask route handling.



\---



\# 17. EC2 Service



File:



```text

backend/services/ec2\_service.py

```



The EC2 service handles operations such as:



\* Listing instances

\* Starting instances

\* Stopping instances

\* Rebooting instances

\* Terminating instances

\* Launching instances



Example flow:



```text

HTTP Request

&#x20;    ↓

EC2 Route

&#x20;    ↓

ec2\_service.py

&#x20;    ↓

ec2\_client.py

&#x20;    ↓

Boto3

&#x20;    ↓

Amazon EC2

```



The service layer prevents the route from directly managing AWS operations.



\---



\# 18. S3 Service



File:



```text

backend/services/s3\_service.py

```



The S3 service handles:



\* Listing buckets

\* Listing objects

\* Creating buckets

\* Uploading objects

\* Downloading objects

\* Deleting objects



Example:



```text

HTTP Request

&#x20;    ↓

S3 Route

&#x20;    ↓

s3\_service.py

&#x20;    ↓

s3\_client.py

&#x20;    ↓

Boto3

&#x20;    ↓

Amazon S3

```



\---



\# 19. Resource Service



File:



```text

backend/services/resource\_service.py

```



The resource service collects information from AWS resources.



For example:



```text

EC2 Service

&#x20;    │

&#x20;    ├── EC2 instances

&#x20;    │

&#x20;    └─────────────┐

&#x20;                  │

&#x20;                  ▼

&#x20;            Resource Service

&#x20;                  ▲

&#x20;                  │

&#x20;    ┌─────────────┘

&#x20;    │

&#x20;    └── S3 Service

&#x20;          │

&#x20;          └── S3 buckets

```



The resulting resource summary is used by the dashboard.



\---



\# 20. Dashboard Service



File:



```text

backend/services/dashboard\_service.py

```



The dashboard service prepares the data required by the dashboard.



It uses the resource service to obtain current AWS resource information.



Flow:



```text

Resource Service

&#x20;      ↓

Dashboard Service

&#x20;      ↓

Dashboard Route

&#x20;      ↓

React Dashboard

```



This keeps dashboard aggregation logic outside the route layer.



\---



\# 21. Activity Service



File:



```text

backend/services/activity\_service.py

```



The activity service records application operations.



An activity contains information such as:



```json

{

&#x20; "id": 1,

&#x20; "action": "Upload Object",

&#x20; "resource\_type": "S3",

&#x20; "resource\_id": "example.txt",

&#x20; "status": "success",

&#x20; "timestamp": "2026-10-06T17:16:17Z"

}

```



The current implementation stores activities in memory.



\### Current limitation



Because the activities are stored in memory:



```text

Flask Restart

&#x20;     ↓

Activity List Reset

```



A future production version can store activities in a persistent database.



\---



\# 22. Validation



Input validation is performed before executing AWS operations.



Validation is especially important for S3 operations.



\### S3 Bucket Validation



The backend validates:



\* Required bucket name

\* Bucket name format

\* AWS-compatible bucket naming requirements



\### S3 Object Validation



The backend validates:



\* Bucket name

\* Object key

\* Object key length

\* Invalid path formats

\* Invalid characters where applicable



\### Upload Validation



Uploaded files are validated before being sent to Amazon S3.



The current application limits uploads to:



```text

10 MB

```



\---



\# 23. Error Handling



The application uses centralized error handling.



AWS errors such as:



```text

botocore.exceptions.ClientError

```



are handled by the backend instead of exposing raw exceptions to the frontend.



The application also handles general Python/application exceptions.



A typical error response follows the structure:



```json

{

&#x20; "status": "error",

&#x20; "message": "AWS operation failed"

}

```



This provides a consistent format for frontend error handling.



\---



\# 24. CORS



The Flask backend uses \*\*Flask-CORS\*\*.



During local development, the React application runs at:



```text

http://localhost:5173

```



The Flask backend runs at:



```text

http://127.0.0.1:5000

```



Therefore, CORS allows the frontend to communicate with the backend during development.



```text

React

localhost:5173

&#x20;    │

&#x20;    │ HTTP

&#x20;    ▼

Flask

127.0.0.1:5000

```



For production deployment, CORS should be restricted to the actual frontend domain.



\---



\# 25. API Response Structure



The backend follows a consistent JSON response structure.



\### Successful Response



```json

{

&#x20; "status": "success",

&#x20; "data": {}

}

```



\### Error Response



```json

{

&#x20; "status": "error",

&#x20; "message": "Something went wrong"

}

```



This allows the React frontend to handle responses consistently.



\---



\# 26. Backend Request Flow



The general backend request flow is:



```text

User

&#x20; ↓

React Component

&#x20; ↓

Frontend Service

&#x20; ↓

HTTP Request

&#x20; ↓

Flask Route

&#x20; ↓

Validation

&#x20; ↓

Service Layer

&#x20; ↓

AWS Client

&#x20; ↓

Boto3

&#x20; ↓

AWS Service

&#x20; ↓

AWS Response

&#x20; ↓

Service Layer

&#x20; ↓

Flask Route

&#x20; ↓

JSON Response

&#x20; ↓

React UI

```



\---



\# 27. S3 Upload Flow



The S3 upload process follows this architecture:



```text

User selects file

&#x20;      ↓

UploadFileModal

&#x20;      ↓

FormData

&#x20;      ↓

POST /api/s3/upload

&#x20;      ↓

Flask S3 Route

&#x20;      ↓

Upload Validation

&#x20;      ↓

S3 Service

&#x20;      ↓

Boto3 put\_object()

&#x20;      ↓

Amazon S3

&#x20;      ↓

Success Response

&#x20;      ↓

Activity Recorded

&#x20;      ↓

Frontend Refresh

```



This keeps AWS operations entirely inside the backend.



\---



\# 28. S3 Download Flow



The download flow is:



```text

User clicks Download

&#x20;      ↓

React

&#x20;      ↓

GET /api/s3/download

&#x20;      ↓

Flask S3 Route

&#x20;      ↓

S3 Service

&#x20;      ↓

Boto3 get\_object()

&#x20;      ↓

Amazon S3

&#x20;      ↓

Object Data

&#x20;      ↓

Flask Response

&#x20;      ↓

Browser Download

```



\---



\# 29. S3 Delete Flow



The delete flow is:



```text

User clicks Delete

&#x20;      ↓

Confirmation Dialog

&#x20;      ↓

DELETE /api/s3/object

&#x20;      ↓

Flask S3 Route

&#x20;      ↓

S3 Service

&#x20;      ↓

Boto3 delete\_object()

&#x20;      ↓

Amazon S3

&#x20;      ↓

Activity Recorded

&#x20;      ↓

Frontend Refresh

```



A confirmation dialog is used on the frontend before the destructive operation is sent to the backend.



\---



\# 30. EC2 Data Flow



The EC2 page follows this general flow:



```text

User opens EC2 page

&#x20;      ↓

React EC2 Page

&#x20;      ↓

GET /api/ec2/instances

&#x20;      ↓

Flask EC2 Route

&#x20;      ↓

EC2 Service

&#x20;      ↓

EC2 Client

&#x20;      ↓

Boto3

&#x20;      ↓

Amazon EC2

&#x20;      ↓

Instance Data

&#x20;      ↓

JSON Response

&#x20;      ↓

React Instance Table

```



\---



\# 31. Security Architecture



Security is an important part of the backend design.



\### 🔐 AWS Credentials



AWS credentials are not stored inside React components or frontend JavaScript.



\### 🔐 Backend AWS Access



Only the Flask backend communicates with AWS.



\### 🔐 Credential Provider Chain



Boto3 uses the AWS credential provider chain instead of requiring credentials to be hard-coded.



\### 🔐 Environment Configuration



Environment variables are used for configurable application values.



\### 🔐 Input Validation



User-provided values are validated before AWS operations.



\### 🔐 CORS



Cross-origin access is restricted during development.



\### 🔐 Error Handling



Internal application and AWS errors are converted into controlled API responses.



\---



\# 32. Testing



The backend can be tested at multiple levels:



\### API Testing



Endpoints can be tested directly through a browser or API client.



\### AWS Integration Testing



Backend responses can be verified against AWS Console resources.



\### Frontend Integration Testing



React pages can be tested against the running Flask API.



\### Health Check



The basic backend health endpoint is:



```text

GET /api/health

```



A successful response confirms that the Flask application is running.



\---



\# 33. Development Environment



The backend runs locally using Flask.



Backend URL:



```text

http://127.0.0.1:5000

```



Example startup commands:



```cmd

cd C:\\Users\\Anuj\\Documents\\Vivek\\aws-resource-manager\\backend

venv\\Scripts\\activate

python app.py

```



The React frontend runs separately using Vite:



```text

http://localhost:5173

```



\---



\# 34. Backend Technologies



| Technology    | Purpose                        |

| ------------- | ------------------------------ |

| Python        | Backend programming language   |

| Flask         | REST API framework             |

| Boto3         | AWS SDK for Python             |

| Flask-CORS    | Cross-origin API access        |

| python-dotenv | Environment configuration      |

| Botocore      | AWS error handling             |

| AWS EC2       | Compute resource management    |

| Amazon S3     | Object storage management      |

| AWS IAM       | Identity and access management |



\---



\# 35. Design Principles



The backend follows these principles:



\### Separation of Concerns



Routes, services, AWS clients, configuration, and utilities are separated.



\### Reusability



Common AWS clients and service functions can be reused.



\### Maintainability



Business logic is kept outside route functions where possible.



\### Security



AWS credentials are never exposed to the React frontend.



\### Scalability



The architecture can be extended to support additional AWS services.



\### Consistency



API responses follow a predictable structure.



\### Error Resilience



AWS and application errors are centrally handled.



\---



\# 36. Future Improvements



The backend can be extended with:



\* 🔐 Authentication

\* 👥 Role-based access control

\* 🗄️ Persistent activity storage

\* 📊 CloudWatch metrics integration

\* ⚖️ Load Balancer management

\* 📈 Auto Scaling management

\* 🔔 SNS notifications

\* 📝 Structured application logging

\* 🧪 Expanded automated testing

\* 🐳 Docker deployment

\* ☁️ AWS cloud deployment

\* 🔑 Fine-grained IAM policies

\* ⚡ API pagination

\* 🚀 Production monitoring



\---



\# 37. Conclusion



The AWS Resource Manager backend provides a structured and secure bridge between the React frontend and AWS infrastructure.



The main architecture is:



```text

React

&#x20; ↓

Flask Routes

&#x20; ↓

Service Layer

&#x20; ↓

AWS Clients

&#x20; ↓

Boto3

&#x20; ↓

AWS Services

```



This separation makes the application easier to:



\* Understand

\* Maintain

\* Test

\* Debug

\* Extend

\* Deploy



The architecture also provides a strong foundation for adding additional AWS services and production-level features in the future.



