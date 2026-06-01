# Node.js Backend Learning Plan

This plan is based on the current `journal-backend` project and your goal:

- Understand backend code
- Build React + Node projects
- Modify AI-generated backend code confidently
- Add backend features yourself

Your backend already uses:

- Node.js with CommonJS: `require`, `module.exports`
- Express server setup in `server.js`
- Middleware: `cors`, `express.json()`
- Routes: `routes/auth.js`, `routes/journals.js`
- Controllers: `controllers/authController.js`, `controllers/journalController.js`
- Service layer: `services/authService.js`, `services/journalService.js`
- REST APIs: `GET`, `POST`, `PUT`, `DELETE`
- JSON files as a simple database: `db/users.json`, `db/data.json`
- Global error handling with `AppError` and `errorHandler`

## 1. Express Basics

Learn:

- Route params: `/journals/:id`
- Query params: `/journals?userId=123`
- Request body: `req.body`
- Response status codes
- Middleware basics
- Central error handling middleware

Practice:

- Move route logic into controller files
- Add a global error handler
- Add a `404 route not found` handler

## 2. Route, Controller, Service Architecture

Learn:

- Route = maps URL to function
- Controller = handles request and response
- Service = contains actual app logic
- Model = represents database data later

Current flow:

```txt
server.js
  -> routes
  -> controllers
  -> services
  -> JSON files
```

## 3. Project Structure

Target structure:

```txt
journal-backend/
  server.js
  app.js
  routes/
  controllers/
  services/
  models/
  middleware/
  config/
  utils/
```

Learn:

- What each folder is responsible for
- How to keep route files clean
- How to keep request/response logic inside controllers
- How to keep business logic inside services
- How to avoid repeating code

Practice:

- Create `config` folder
- Create `models` folder later when database starts
- Split `server.js` and `app.js`

## 4. Node.js Module System

Your project currently uses CommonJS.

Learn:

- `require(...)`
- `module.exports`
- Relative paths: `./` and `../`
- `__dirname`
- `path.join(...)`
- How Node resolves files
- CommonJS vs ES Modules basics

You do not need deep theory here. The goal is to read and organize files comfortably.

## 5. Async/Await

Right now the backend uses synchronous file methods:

- `fs.readFileSync`
- `fs.writeFileSync`

Learn:

- Callback vs Promise vs `async/await`
- `fs.promises.readFile`
- `fs.promises.writeFile`
- `try/catch` with async functions

Practice:

- Convert `authService.js` to async/await
- Convert `journalService.js` to async/await
- Update controllers/routes to handle async service functions

## 6. Event Loop Basics

Learn only the basics:

- Why Node can handle many requests
- What non-blocking means
- Why `readFileSync()` is bad in servers
- Why `await` does not freeze the whole server

This topic only needs a short study session for now.

## 7. Environment Variables

The backend has `dotenv` installed, but `PORT` is currently hardcoded.

Learn:

- `.env`
- `process.env.PORT`
- `process.env.JWT_SECRET`
- `process.env.DB_URL`

Practice:

```js
require('dotenv').config()

const PORT = process.env.PORT || 3000
```

## 8. MongoDB + Mongoose

JSON files are good for basics. The next major backend step is a real database.

Learn:

- MongoDB basics
- Collections
- Documents
- Mongoose schemas
- Mongoose models
- CRUD operations
- Database connection using `.env`

Practice:

- Replace `users.json` with a `User` model
- Replace `data.json` with a `Journal` model
- Store journals by user id

## 9. Database Design Basics

Learn:

- One-to-many relationships
- User -> Journals
- Referencing IDs
- When to embed vs reference

For this app:

```txt
One user has many journals.
One journal belongs to one user.
```

## 10. Authentication

Current project stores plain passwords in `users.json`. This is okay for learning, but not safe for real apps.

Learn:

- Password hashing using `bcrypt`
- JWT tokens
- Login token flow
- Protected routes
- Auth middleware
- Difference between authentication and authorization

Practice:

- Hash password during signup
- Compare hashed password during login
- Return JWT after login
- Protect journal APIs
- Make sure users can access only their own journals

## 11. Cookies vs JWT

Learn the basic difference:

```txt
Cookies/session auth = server keeps session state
JWT auth = browser sends token with requests
```

For React apps, JWT is common, but cookies are also important to understand.

## 12. Validation

Current validation is manual:

```js
if (!username || !password)
```

Learn:

- Schema validation
- `zod`, `joi`, or `express-validator`
- Required fields
- Minimum password length
- Clean error messages

Practice:

- Username required
- Password minimum 6 or 8 characters
- Journal title required
- Journal body optional

## 13. Security Basics

Learn:

- Never store plain passwords
- Validate all input
- Do not trust `userId` sent from frontend
- CORS basics
- Rate limiting
- `helmet`
- Avoid leaking internal error details

Important improvement:

After JWT auth, the frontend should not manually send `userId`.
The backend should get the user id from the token.

## 14. API Testing

Before connecting frontend, test backend APIs separately.

Learn:

- Postman or Thunder Client
- REST API testing
- Basic automated tests with Jest and Supertest

Practice testing:

- Signup works
- Duplicate signup fails
- Login works
- Wrong login fails
- Create journal works
- Update journal works
- Delete journal works

## 15. API Documentation

Learn:

- How to document endpoints
- Request body examples
- Response examples
- Status codes

Start with a simple markdown file.

Example:

```txt
POST /api/auth/login
Body: { username, password }
Success: 200
Error: 401
```

Later, you can learn Swagger UI.

## 16. Logging Basics

Learn:

- `console.log()`
- `console.error()`
- What to log during development
- What not to expose to users

Later, you can learn:

- Winston
- Pino

## 17. Deployment

After using a real database, learn deployment.

Learn:

- Deploy backend to Render, Railway, or Fly.io
- Use MongoDB Atlas or hosted PostgreSQL
- Set environment variables on server
- Understand frontend URL vs backend URL in production

## Optional Topics For Later

Do not learn these yet:

- WebSockets
- Redis
- Message queues
- Microservices
- GraphQL
- Docker
- Kubernetes
- System design
- Caching strategies
- CI/CD pipelines

These make more sense after building 3 to 5 full-stack projects.

## Recommended Order

Follow this order:

1. Express basics
2. Route, controller, service architecture
3. Project structure
4. Node.js module system
5. Async/Await
6. Event loop basics
7. Environment variables
8. MongoDB + Mongoose
9. Database design basics
10. Authentication
11. Cookies vs JWT
12. Validation
13. Security basics
14. API testing
15. API documentation
16. Logging basics
17. Deployment

## Next Practical Goal

Clean up the current backend structure first:

- Split `server.js` and `app.js`
- Learn the module system used by this project
- Add environment variables
- Convert file reading/writing to async

After that, move from JSON files to MongoDB. Then authentication will become much cleaner.
