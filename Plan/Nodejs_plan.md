# Node.js Backend Learning Plan

This plan is based on the current `journal-backend` project.

Your backend already uses:

- Node.js with CommonJS: `require`, `module.exports`
- Express server setup in `server.js`
- Middleware: `cors`, `express.json()`
- Routes: `routes/auth.js`, `routes/journals.js`
- Service layer: `services/authService.js`, `services/journalService.js`
- REST APIs: `GET`, `POST`, `PUT`, `DELETE`
- JSON files as a simple database: `db/users.json`, `db/data.json`
- Basic validation and status codes: `400`, `401`, `404`, `409`, `201`
- Simple auth logic: signup, login, delete account

## 1. Strengthen Express Basics

Learn:

- Difference between route, controller, service, and model
- Route params: `/journals/:id`
- Query params: `/journals?userId=123`
- Request body: `req.body`
- Response status codes
- Custom middleware
- Central error handling middleware

Practice in this project:

- Move route logic into controller files
- Add a global error handler
- Add a `404 route not found` handler

## 2. Learn Async Node.js Properly

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
- Update routes to handle async service functions

## 3. Learn Real Authentication

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

## 4. Learn Database Basics

JSON files are good for basics. The next major backend step is a real database.

Start with one:

- MongoDB with Mongoose
- PostgreSQL/MySQL with Prisma

For this project, MongoDB with Mongoose is probably easier to start.

Learn:

- Collections/tables
- Schemas/models
- CRUD operations
- Relationships: one user has many journals
- Database connection using `.env`

Practice:

- Replace `users.json` with a `User` model
- Replace `data.json` with a `Journal` model
- Store journals by user id

## 5. Learn Validation

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

## 6. Learn Better Project Structure

Current structure is already a good beginner start.

Next structure:

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
- How to avoid repeating file/database logic

Practice:

- Create `controllers/authController.js`
- Create `controllers/journalController.js`
- Keep business logic inside services
- Keep request/response logic inside controllers

## 7. Learn Environment Variables

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

## 8. Learn API Testing

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

## 9. Learn Security Basics

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

## 10. Learn Deployment

After using a real database, learn deployment.

Learn:

- Deploy backend to Render, Railway, or Fly.io
- Use MongoDB Atlas or hosted PostgreSQL
- Set environment variables on server
- Understand frontend URL vs backend URL in production

## Recommended Order

Follow this order:

1. `async/await` and async file system
2. Express middleware and error handling
3. Password hashing with `bcrypt`
4. JWT login and protected routes
5. MongoDB and Mongoose
6. Validation with Zod or express-validator
7. API testing with Postman or Thunder Client
8. Deployment basics

## Next Practical Goal

Build version 2 of this backend:

- Login returns a JWT
- Passwords are hashed
- Journal routes are protected
- A user can only read, update, and delete their own journals

This upgrade will teach many real-world Node.js backend concepts while still building on your current project.
