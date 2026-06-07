# Node.js Backend Todo

Use this file to track progress topic by topic.

## 1. Express Basics

- [x] Understand route params clearly
- [x] Understand query params clearly
- [x] Understand request body clearly
- [x] Practice response status codes
- [x] Understand middleware basics
- [x] Add global error handler
- [x] Add 404 route not found handler

## 2. Route, Controller, Service Architecture

- [x] Understand route, controller, and service
- [x] Move route logic into controller files
- [x] Keep routes focused only on URL mapping
- [x] Keep controllers focused on request/response
- [x] Keep services focused on business logic
- [x] Understand model concept

## 3. Project Structure

- [x] Create `controllers` folder
- [x] Create `middleware` folder
- [x] Create `utils` folder
- [ ] Create `config` folder
- [x] Create `models` folder
- [x] Split `server.js` and `app.js`

## 4. Node.js Module System

- [x] Understand `require(...)`
- [x] Understand `module.exports`
- [x] Understand `./` relative path
- [x] Understand `../` relative path
- [x] Understand `__dirname`
- [x] Understand `path.join(...)`
- [x] Understand CommonJS vs ES Modules basics

## 5. Async/Await

- [ ] Learn callbacks
- [ ] Learn promises
- [x] Learn async/await
- [x] Learn `fs.promises.readFile`
- [x] Learn `fs.promises.writeFile`
- [x] Convert `authService.js` to async/await
- [x] Convert `journalService.js` to async/await
- [x] Update controllers/routes to handle async service functions


## 7. Environment Variables

- [x] Create `.env`
- [x] Use `dotenv`
- [x] Move `PORT` to `.env`
- [ ] Add `JWT_SECRET` later
- [ ] Add database URL later

## 8. MongoDB + Mongoose

- [x] Learn why JSON files are not enough for real apps
- [x] Learn MongoDB basics
- [x] Learn Mongoose basics
- [x] Create `User` model
- [x] Create `Journal` model
- [x] Replace `users.json`
- [x] Replace `data.json`
- [x] Connect database using `.env`

## 9. Database Design Basics

- [x] Understand one-to-many relationships
- [x] Understand User -> Journals relationship
- [x] Understand referencing IDs
- [x] Understand when to embed vs reference

## 10. Authentication

- [x] Learn password hashing
- [x] Install and use `bcrypt`
- [x] Hash password during signup
- [x] Compare hashed password during login
- [x] Learn JWT basics
- [x] Return JWT after login
- [x] Create auth middleware
- [x] Protect journal routes
- [x] Stop trusting `userId` from frontend

## 11. Cookies vs JWT

- [ ] Understand cookie/session auth
- [ ] Understand token-based auth
- [ ] Understand where JWT can be stored
- [ ] Understand basic pros and cons

## 12. Validation

- [ ] Learn schema validation
- [ ] Choose validation library
- [ ] Validate signup input
- [ ] Validate login input
- [ ] Validate journal input
- [ ] Return clean validation errors

## 13. Security Basics

- [ ] Never store plain passwords
- [ ] Validate all input
- [ ] Learn CORS basics
- [ ] Learn rate limiting
- [ ] Learn `helmet`
- [ ] Avoid leaking internal errors

## 14. API Testing

- [ ] Test APIs with Postman or Thunder Client
- [ ] Test signup
- [ ] Test duplicate signup
- [ ] Test login
- [ ] Test wrong login
- [ ] Test create journal
- [ ] Test update journal
- [ ] Test delete journal

## 15. API Documentation

- [ ] Create simple API docs markdown file
- [ ] Document auth endpoints
- [ ] Document journal endpoints
- [ ] Add request body examples
- [ ] Add response examples
- [ ] Add status codes

## 16. Logging Basics

- [ ] Learn `console.log()`
- [ ] Learn `console.error()`
- [ ] Understand what to log during development
- [ ] Understand what not to expose to users
- [ ] Learn Winston or Pino later

## 17. Deployment

- [ ] Learn backend deployment basics
- [ ] Deploy backend
- [ ] Use hosted database
- [ ] Set production environment variables
- [ ] Connect frontend to deployed backend
