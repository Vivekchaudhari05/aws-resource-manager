\# 🔌 AWS Resource Manager API Documentation



This document describes the REST APIs provided by the \*\*AWS Resource Manager Flask backend\*\*.



\---



\## 🌐 Base URL



During local development:



```text

http://127.0.0.1:5000/api

```



\---



\## 💚 1. Health Check



\### Endpoint



```http

GET /api/health

```



\### Purpose



Checks whether the AWS Resource Manager backend is running.



\### Example



```text

GET http://127.0.0.1:5000/api/health

```



\### Successful Response



```json

{

&#x20; "status": "success",

&#x20; "message": "AWS Resource Manager backend is running"

}

```



\---



\# 📊 2. Dashboard APIs



\## Get Dashboard Data



\### Endpoint



```http

GET /api/dashboard

```



\### Purpose



Returns an overview of discovered AWS resources.



\### Example



```text

GET http://127.0.0.1:5000/api/dashboard

```



\### Response Structure



```json

{

&#x20; "status": "success",

&#x20; "data": {

&#x20;   "summary": {

&#x20;     "ec2\_instances": 1,

&#x20;     "s3\_buckets": 17

&#x20;   },

&#x20;   "resources": {

&#x20;     "ec2": {},

&#x20;     "s3": {}

&#x20;   }

&#x20; }

}

```



> The actual resource counts depend on the AWS account and region being used.



\---



\# 🖥️ 3. EC2 APIs



\## List EC2 Instances



\### Endpoint



```http

GET /api/ec2/instances

```



\### Purpose



Returns EC2 instances discovered in the configured AWS region.



\### Example



```text

GET http://127.0.0.1:5000/api/ec2/instances

```



\### Response



```json

{

&#x20; "status": "success",

&#x20; "data": \[

&#x20;   {

&#x20;     "instance\_id": "i-xxxxxxxxxxxxxxxxx",

&#x20;     "instance\_type": "t3.micro",

&#x20;     "state": "stopped",

&#x20;     "private\_ip": "172.31.x.x",

&#x20;     "public\_ip": null,

&#x20;     "availability\_zone": "ap-south-1b",

&#x20;     "vpc\_id": "vpc-xxxxxxxx",

&#x20;     "subnet\_id": "subnet-xxxxxxxx"

&#x20;   }

&#x20; ]

}

```



\---



\## 🚀 Launch EC2 Instance



\### Endpoint



```http

POST /api/ec2/launch

```



\### Purpose



Launches a new EC2 instance using the supplied AMI and instance configuration.



\### Request Body



```json

{

&#x20; "image\_id": "ami-xxxxxxxxxxxxxxxxx",

&#x20; "instance\_type": "t3.micro"

}

```



\### Example



```text

POST http://127.0.0.1:5000/api/ec2/launch

```



\### Important



Launching an EC2 instance creates a real AWS resource and may generate AWS charges.



\---



\## ▶️ Start EC2 Instance



\### Endpoint



```http

POST /api/ec2/start

```



\### Request Body



```json

{

&#x20; "instance\_id": "i-xxxxxxxxxxxxxxxxx"

}

```



\### Purpose



Starts a stopped EC2 instance.



\---



\## ⏹️ Stop EC2 Instance



\### Endpoint



```http

POST /api/ec2/stop

```



\### Request Body



```json

{

&#x20; "instance\_id": "i-xxxxxxxxxxxxxxxxx"

}

```



\### Purpose



Stops a running EC2 instance.



\---



\## 🔄 Reboot EC2 Instance



\### Endpoint



```http

POST /api/ec2/reboot

```



\### Request Body



```json

{

&#x20; "instance\_id": "i-xxxxxxxxxxxxxxxxx"

}

```



\### Purpose



Reboots an EC2 instance.



\---



\## 🗑️ Terminate EC2 Instance



\### Endpoint



```http

DELETE /api/ec2/terminate

```



\### Request Body



```json

{

&#x20; "instance\_id": "i-xxxxxxxxxxxxxxxxx"

}

```



\### Purpose



Terminates an EC2 instance.



> ⚠️ Termination is a destructive AWS operation. The instance should only be terminated when the user explicitly confirms the action.



\---



\# 🪣 4. S3 APIs



\## List S3 Buckets



\### Endpoint



```http

GET /api/s3/buckets

```



\### Purpose



Returns the S3 buckets available to the configured AWS identity.



\### Example



```text

GET http://127.0.0.1:5000/api/s3/buckets

```



\### Response



```json

{

&#x20; "status": "success",

&#x20; "data": \[

&#x20;   {

&#x20;     "name": "example-bucket",

&#x20;     "created\_at": "2026-10-01T10:00:00+00:00"

&#x20;   }

&#x20; ]

}

```



\---



\## ➕ Create S3 Bucket



\### Endpoint



```http

POST /api/s3/buckets

```



\### Request Body



```json

{

&#x20; "bucket\_name": "my-example-bucket"

}

```



\### Purpose



Creates a new S3 bucket in the configured AWS region.



\### Example



```text

POST http://127.0.0.1:5000/api/s3/buckets

```



\### Important



S3 bucket names must follow AWS naming requirements and must be globally unique.



\---



\## 📂 List S3 Objects



\### Endpoint



```http

GET /api/s3/objects?bucket=<bucket-name>

```



\### Purpose



Returns objects stored inside the selected S3 bucket.



\### Example



```text

GET /api/s3/objects?bucket=my-example-bucket

```



\### Response



```json

{

&#x20; "status": "success",

&#x20; "data": \[

&#x20;   {

&#x20;     "key": "documents/example.txt",

&#x20;     "size": 1024,

&#x20;     "last\_modified": "2026-10-01T10:00:00+00:00"

&#x20;   }

&#x20; ]

}

```



\---



\## ⬆️ Upload S3 Object



\### Endpoint



```http

POST /api/s3/upload

```



\### Content Type



```text

multipart/form-data

```



\### Form Fields



| Field        | Type   | Required | Description      |

| ------------ | ------ | -------- | ---------------- |

| `bucket`     | string | Yes      | Target S3 bucket |

| `object\_key` | string | Yes      | S3 object key    |

| `file`       | file   | Yes      | File to upload   |



\### Example



```text

POST /api/s3/upload

```



Form data:



```text

bucket = my-example-bucket

object\_key = documents/example.txt

file = example.txt

```



\### Purpose



Uploads a file to the selected S3 bucket.



\---



\## ⬇️ Download S3 Object



\### Endpoint



```http

GET /api/s3/download

```



\### Query Parameters



| Parameter | Required | Description    |

| --------- | -------- | -------------- |

| `bucket`  | Yes      | S3 bucket name |

| `key`     | Yes      | S3 object key  |



\### Example



```text

GET /api/s3/download?bucket=my-example-bucket\&key=documents/example.txt

```



\### Response



The API returns the actual object content as a downloadable HTTP response.



The response content type is taken from the S3 object metadata when available.



\---



\## 🗑️ Delete S3 Object



\### Endpoint



```http

DELETE /api/s3/object

```



\### Request Body



```json

{

&#x20; "bucket": "my-example-bucket",

&#x20; "key": "documents/example.txt"

}

```



\### Purpose



Deletes the specified object from S3.



> ⚠️ Object deletion is a destructive operation and should only be performed after user confirmation.



\---



\# ☁️ 5. Resource APIs



\## Get Resource Summary



\### Endpoint



```http

GET /api/resources

```



\### Purpose



Returns a summary of AWS resources discovered by the backend.



The resource service currently gathers:



\* 🖥️ EC2 instances

\* 🪣 S3 buckets



\---



\# 📝 6. Activity API



\## Get Activity



\### Endpoint



```http

GET /api/activity

```



\### Purpose



Returns operations recorded by the application.



\### Example



```text

GET http://127.0.0.1:5000/api/activity

```



\### Response



```json

{

&#x20; "status": "success",

&#x20; "data": \[

&#x20;   {

&#x20;     "id": 1,

&#x20;     "action": "Upload Object",

&#x20;     "resource\_type": "S3",

&#x20;     "resource\_id": "my-example-bucket/example.txt",

&#x20;     "status": "success",

&#x20;     "timestamp": "2026-10-01T10:00:00+00:00"

&#x20;   }

&#x20; ]

}

```



\### Activity Information



Each activity record contains:



\* 🆔 `id`

\* ⚡ `action`

\* 📦 `resource\_type`

\* 🔗 `resource\_id`

\* 🟢 `status`

\* 🕒 `timestamp`



> ℹ️ Activity records are currently stored in memory and are lost when the Flask application restarts.



\---



\# ❌ 7. Error Responses



The backend provides centralized error handling.



A typical validation error follows this structure:



```json

{

&#x20; "status": "error",

&#x20; "message": "bucket is required"

}

```



HTTP status codes may include:



| Status Code | Meaning                  |

| ----------: | ------------------------ |

|       `200` | ✅ Successful request     |

|       `201` | ✅ Resource created       |

|       `400` | ❌ Invalid request        |

|       `404` | ❌ Resource not found     |

|       `500` | ⚠️ Server error          |

|       `502` | ☁️ AWS service/API error |



\---



\# 🔐 8. API Security



The API follows these basic security principles:



\* 🔒 AWS credentials remain on the backend side.

\* 🚫 The React frontend never directly communicates with AWS using credentials.

\* 🛡️ Input validation is performed before AWS operations.

\* ⚠️ AWS exceptions are centrally handled.

\* 🔑 AWS permissions should follow least-privilege principles.

\* 🚫 Sensitive credentials should never be committed to GitHub.



\---



\# 🔄 9. Request Flow



A typical request follows this architecture:



```text

👤 User

&#x20; │

&#x20; ▼

⚛️ React Component

&#x20; │

&#x20; ▼

🔌 Frontend Service

&#x20; │

&#x20; │ HTTP Request

&#x20; ▼

🌶️ Flask Route

&#x20; │

&#x20; ▼

⚙️ Backend Service

&#x20; │

&#x20; ▼

☁️ Boto3 Client

&#x20; │

&#x20; ▼

☁️ AWS Service

&#x20; │

&#x20; ▼

📨 API Response

&#x20; │

&#x20; ▼

⚛️ React UI

```



\---



\# 🧪 10. API Testing



The APIs can be tested using:



\* 🌐 Google Chrome

\* 🧪 Postman

\* 💻 curl

\* 🖥️ Browser developer tools

\* ⚛️ React application



\### Example Health Check



```cmd

curl http://127.0.0.1:5000/api/health

```



\### Example Dashboard Request



```cmd

curl http://127.0.0.1:5000/api/dashboard

```



\---



\# 📌 11. API Summary



| Method   | Endpoint             | Purpose                |

| -------- | -------------------- | ---------------------- |

| `GET`    | `/api/health`        | Backend health check   |

| `GET`    | `/api/dashboard`     | Dashboard data         |

| `GET`    | `/api/ec2/instances` | List EC2 instances     |

| `POST`   | `/api/ec2/launch`    | Launch EC2 instance    |

| `POST`   | `/api/ec2/start`     | Start EC2 instance     |

| `POST`   | `/api/ec2/stop`      | Stop EC2 instance      |

| `POST`   | `/api/ec2/reboot`    | Reboot EC2 instance    |

| `DELETE` | `/api/ec2/terminate` | Terminate EC2 instance |

| `GET`    | `/api/s3/buckets`    | List S3 buckets        |

| `POST`   | `/api/s3/buckets`    | Create S3 bucket       |

| `GET`    | `/api/s3/objects`    | List S3 objects        |

| `POST`   | `/api/s3/upload`     | Upload S3 object       |

| `GET`    | `/api/s3/download`   | Download S3 object     |

| `DELETE` | `/api/s3/object`     | Delete S3 object       |

| `GET`    | `/api/resources`     | Resource summary       |

| `GET`    | `/api/activity`      | Activity history       |



\---



\## 🏁 Conclusion



The AWS Resource Manager API provides a clean REST interface between the React frontend and AWS infrastructure.



The Flask backend acts as the central control layer and uses \*\*Boto3\*\* to communicate with AWS services while keeping AWS credentials and cloud operations outside the frontend.



This architecture makes the application easier to maintain, secure, test, and extend with additional AWS services in the future.



