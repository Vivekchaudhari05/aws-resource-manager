# 📸 AWS Resource Manager — Screenshots

This directory contains screenshots of the **AWS Resource Manager** application.

The screenshots provide a visual overview of the application's dashboard, AWS resource management pages, activity tracking, and configuration interface.

---

# 🖥️ 1. Screenshot Overview

The following screenshots are included:

| #  | Screenshot            | Description                                |
| -- | --------------------- | ------------------------------------------ |
| 01 | 📊 `01-dashboard.png` | Main AWS Resource Manager dashboard        |
| 02 | 💻 `02-ec2.png`       | EC2 instance management page               |
| 03 | 🪣 `03-s3.png`        | S3 bucket and object management page       |
| 04 | 📝 `04-activity.png`  | Application activity and operation history |
| 05 | ☁️ `05-resources.png` | AWS resource overview                      |
| 06 | ⚙️ `06-settings.png`  | Application settings page                  |

---

# 📁 2. Screenshot Directory

```text
screenshots/
│
├── 📊 01-dashboard.png
├── 💻 02-ec2.png
├── 🪣 03-s3.png
├── 📝 04-activity.png
├── ☁️ 05-resources.png
├── ⚙️ 06-settings.png
└── 📄 README.md
```

---

# 📊 3. Dashboard

### File

```text
01-dashboard.png
```

### Purpose

The dashboard provides a high-level overview of AWS resources managed by the application.

It includes information such as:

* 💻 EC2 instance count
* 🪣 S3 bucket count
* ☁️ Total AWS resources
* 📝 Recent operations
* 📊 Resource overview
* 🔗 AWS connection status

### Application Flow

```text
👤 User
  ↓
📊 Dashboard
  ↓
⚛️ React
  ↓
🐍 Flask API
  ↓
☁️ AWS
```

---

# 💻 4. EC2 Page

### File

```text
02-ec2.png
```

### Purpose

The EC2 page provides an interface for viewing and managing Amazon EC2 instances.

The page can display information such as:

* 🆔 Instance ID
* 💻 Instance type
* 🟢 Instance state
* 🌐 IP information
* 📍 Availability Zone
* ☁️ VPC information
* ⚙️ Available instance actions

### Architecture

```text
⚛️ React
   ↓
🐍 Flask
   ↓
🔧 boto3
   ↓
☁️ Amazon EC2
```

---

# 🪣 5. S3 Page

### File

```text
03-s3.png
```

### Purpose

The S3 page provides an interface for managing Amazon S3 buckets and objects.

It supports functionality such as:

* 🪣 Viewing buckets
* 📦 Viewing objects
* ➕ Creating buckets
* ⬆️ Uploading objects
* ⬇️ Downloading objects
* 🗑️ Deleting objects

### Architecture

```text
⚛️ React
   ↓
🐍 Flask
   ↓
🔧 boto3
   ↓
🪣 Amazon S3
```

---

# 📝 6. Activity Page

### File

```text
04-activity.png
```

### Purpose

The Activity page displays operations performed through the application.

Activity information can include:

* 🔢 Activity ID
* ⚙️ Action
* ☁️ Resource type
* 🆔 Resource ID
* 🟢 Status
* 🕒 Timestamp

### Example Flow

```text
👤 User Action
      ↓
⚛️ React
      ↓
🐍 Flask API
      ↓
☁️ AWS Operation
      ↓
📝 Activity Record
```

---

# ☁️ 7. Resources Page

### File

```text
05-resources.png
```

### Purpose

The Resources page provides an overview of AWS resources discovered by the application.

It helps users view AWS infrastructure information from a centralized interface.

The page is designed to provide a simplified resource-management experience instead of requiring users to switch between multiple AWS Console pages.

---

# ⚙️ 8. Settings Page

### File

```text
06-settings.png
```

### Purpose

The Settings page provides the application's configuration interface.

It is intended to provide information and controls related to application configuration and environment settings.

> 🔐 AWS credentials should never be displayed or stored directly in the React frontend.

---

# 📐 9. Screenshot Guidelines

Screenshots should follow these guidelines:

### 🖥️ Resolution

Capture the application at a clear desktop resolution.

Recommended:

```text
1920 × 1080
```

or:

```text
1366 × 768
```

### 🌐 Browser

Use:

**Google Chrome**

### 🎯 Content

Screenshots should:

* Show the complete application page where practical.
* Clearly display the navigation/sidebar.
* Show actual application data where appropriate.
* Avoid unnecessary browser clutter.
* Avoid personal information.
* Avoid credentials or sensitive AWS information.

---

# 🔐 10. Security Guidelines

Before adding screenshots to GitHub, verify that they do **not** contain:

* ❌ AWS Access Keys
* ❌ AWS Secret Keys
* ❌ Passwords
* ❌ Session tokens
* ❌ `.env` values
* ❌ Private credentials
* ❌ Sensitive personal information

AWS resource identifiers may appear when they are necessary to demonstrate the project, but sensitive credentials should never be visible.

---

# 🏷️ 11. Naming Convention

Screenshots use sequential names:

```text
01-dashboard.png
02-ec2.png
03-s3.png
04-activity.png
05-resources.png
06-settings.png
```

This provides:

* 📚 Consistent organization
* 🔎 Easy navigation
* 🧹 Clean repository structure
* 📖 Logical presentation order

---

# 📸 12. Recommended Capture Order

For future screenshots, use this order:

```text
1️⃣ Dashboard
     ↓
2️⃣ EC2
     ↓
3️⃣ S3
     ↓
4️⃣ Activity
     ↓
5️⃣ Resources
     ↓
6️⃣ Settings
```

This follows the application's primary user flow.

---

# 🐙 13. GitHub Presentation

The screenshots can be referenced from the main project README.

Example:

```markdown
## 📸 Application Screenshots

### 📊 Dashboard

![Dashboard](docs/screenshots/01-dashboard.png)

### 💻 EC2 Management

![EC2](docs/screenshots/02-ec2.png)

### 🪣 S3 Management

![S3](docs/screenshots/03-s3.png)

### 📝 Activity

![Activity](docs/screenshots/04-activity.png)

### ☁️ Resources

![Resources](docs/screenshots/05-resources.png)

### ⚙️ Settings

![Settings](docs/screenshots/06-settings.png)
```

---

# 📋 14. Screenshot Checklist

Before publishing the repository:

* [ ] 📊 Dashboard screenshot captured
* [ ] 💻 EC2 screenshot captured
* [ ] 🪣 S3 screenshot captured
* [ ] 📝 Activity screenshot captured
* [ ] ☁️ Resources screenshot captured
* [ ] ⚙️ Settings screenshot captured
* [ ] 🖥️ Screenshots are clear and readable
* [ ] 🔐 No credentials are visible
* [ ] 👤 No sensitive personal information is visible
* [ ] 🏷️ Files follow the naming convention
* [ ] 📁 All screenshots are stored in this directory

---

# 🎯 Purpose of This Directory

The `docs/screenshots/` directory provides a visual representation of the AWS Resource Manager application.

Combined with the architecture and API documentation, these screenshots help demonstrate:

**⚛️ Frontend → 🔗 REST API → 🐍 Backend → 🔧 boto3 → ☁️ AWS**

This makes the GitHub repository easier to understand for developers, reviewers, interviewers, and potential employers.
