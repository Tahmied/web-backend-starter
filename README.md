# Node.js Modular Express Backend (Auth Starter)

A production-ready Node.js + Express backend starter with a clean, modular architecture focused on authentication. This project is designed to be used as a base template for building scalable APIs and backend services.

## 🚀 Features

- **Modular, feature-based structure** - Organized by features for easy scaling
- **Authentication module** - JWT-based authentication out of the box
- **MongoDB with Mongoose** - Robust database integration
- **Centralized error handling** - Consistent error responses across the API
- **Request validation** - Built-in validation middleware
- **File upload support** - Multer integration for handling file uploads
- **Email sending support** - Nodemailer integration for transactional emails
- **ESLint + Prettier** - Code quality and formatting configured
- **ES Modules** - Modern `import/export` syntax
- **Clean separation of concerns** - Controller → Service → Model architecture

## 📁 Project Structure
```
src/
├── middlewares/
│   ├── admin.middleware.js          # Admin authorization
│   ├── auth.middleware.js           # JWT authentication
│   ├── errorHandle.middleware.js    # Global error handler
│   ├── multer.middleware.js         # File upload configuration
│   └── validate.middleware.js       # Request validation
│
├── modules/
│   └── authentication/
│       ├── auth.controller.js       # HTTP request handlers
│       ├── auth.routes.js           # API route definitions
│       ├── auth.service.js          # Business logic
│       ├── auth.validator.js        # Validation schemas
│       └── user.model.js            # User database schema
│
├── utils/
│   ├── ApiError.js                  # Custom error class
│   ├── ApiResponse.js               # Standardized API responses
│   ├── AsyncHandler.js              # Async error wrapper
│   ├── ConnectDb.js                 # Database connection
│   ├── constants.js                 # App constants
│   └── Email.js                     # Email utility
│
├── app.js                           # Express app configuration
└── server.js                        # Server entry point
```

**Root files:**
```
.env                    # Environment variables
.eslintignore          # ESLint ignore patterns
.eslintrc.cjs          # ESLint configuration
.gitignore             # Git ignore patterns
.prettierignore        # Prettier ignore patterns
.prettierrc            # Prettier configuration
package.json           # Project dependencies
package-lock.json      # Locked dependency versions
README.md              # This file
```

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **File Upload:** multer
- **Email:** nodemailer
- **HTTP Logging:** morgan
- **Cookie Parsing:** cookie-parser

## 📦 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies

**Production dependencies:**
```bash
npm i express cors mongoose jsonwebtoken bcryptjs dotenv multer nodemailer cookie-parser express-validator morgan
```

**Development dependencies:**
```bash
npm i -D nodemon eslint prettier
```

**Or install all at once:**
```bash
npm install
```

## ⚙️ Environment Setup

Create a `.env` file in the root directory:
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/app_db

ACCESS_TOKEN_KEY=long_random_secret
ACCESS_TOKEN_EXPIRY=7d

REFRESH_TOKEN_KEY=another_long_secret
REFRESH_TOKEN_EXPIRY=30d

```

**Configuration details:**
- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing (use a strong, random string)
- `NODE_ENV` - Environment mode (development/production)

## ▶️ Running the Project

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## 🧩 Authentication Module Overview

The authentication module follows a clean separation of concerns:
```
modules/authentication/
├── auth.controller.js    # Handles HTTP requests/responses
├── auth.service.js       # Contains business logic
├── auth.routes.js        # Defines API endpoints
├── auth.validator.js     # Request validation rules
└── user.model.js         # User schema (Mongoose)
```

**Architecture flow:**
```
Request → Routes → Validator → Controller → Service → Model → Database
```

### Key responsibilities:

- **Controller** - Processes HTTP requests and sends responses
- **Service** - Implements business logic and data manipulation
- **Routes** - Maps URLs to controller methods
- **Validator** - Validates and sanitizes incoming data
- **Model** - Defines data structure and database interactions

## 🧱 Error Handling

Centralized error handling using custom utilities:

- **`ApiError`** - Custom error class with status codes
- **`ApiResponse`** - Standardized success response format
- **`AsyncHandler`** - Wrapper for async route handlers

**Benefits:**
- Consistent API responses across all endpoints
- Clean controller code without try-catch blocks
- No unhandled promise rejections
- Better debugging with structured errors

**Example usage:**
```javascript
import { AsyncHandler } from '../../utils/AsyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  
  res.json(new ApiResponse(200, user, 'User retrieved successfully'));
});
```

## ✉️ Email Support

Email functionality is abstracted in `utils/Email.js`, allowing easy integration with SMTP providers.

**Use cases:**
- User verification emails
- Password reset emails
- Notifications and alerts
- Welcome emails

**Configuration:**
Add email credentials to your `.env` file:
```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_password
```

## 🧹 Code Quality & Formatting

- **ESLint** - Identifies and fixes code quality issues
- **Prettier** - Ensures consistent code formatting
- **Pre-configured rules** - Ready for team collaboration

**Run linting:**
```bash
npm run lint
```

**Format code:**
```bash
npm run format
```

## 📌 Intended Usage

This backend starter is ideal for:

- 🔐 **Authentication services** - User login, registration, and JWT management
- 👨‍💼 **Admin panels** - Backend for admin dashboards
- 💼 **SaaS backends** - Multi-tenant SaaS applications
- 🔌 **API-first applications** - RESTful API services
- 🛠️ **Internal tools** - Automation systems and data migration tools
- 📱 **Mobile app backends** - API server for mobile applications

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Best Practices

This starter follows Node.js and Express best practices:

- ✅ Modular architecture for scalability
- ✅ Environment-based configuration
- ✅ Secure authentication with JWT
- ✅ Input validation and sanitization
- ✅ Centralized error handling
- ✅ Logging for debugging and monitoring
- ✅ Clean code with ESLint and Prettier

## 📄 License

MIT License - free to use and modify for personal and commercial projects.

---

**Made with ❤️ for the Node.js community**

For questions or issues, please open an issue on the repository.