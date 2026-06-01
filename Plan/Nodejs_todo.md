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
- [ ] Understand model concept

## 3. Project Structure

- [x] Create `controllers` folder
- [x] Create `middleware` folder
- [x] Create `utils` folder
- [ ] Create `config` folder
- [ ] Create `models` folder
- [ ] Split `server.js` and `app.js`

## 4. Node.js Module System

- [ ] Understand `require(...)`
- [ ] Understand `module.exports`
- [ ] Understand `./` relative path
- [ ] Understand `../` relative path
- [ ] Understand `__dirname`
- [ ] Understand `path.join(...)`
- [ ] Understand CommonJS vs ES Modules basics

## 5. Async/Await

- [ ] Learn callbacks
- [ ] Learn promises
- [ ] Learn async/await
- [ ] Learn `fs.promises.readFile`
- [ ] Learn `fs.promises.writeFile`
- [ ] Convert `authService.js` to async/await
- [ ] Convert `journalService.js` to async/await
- [ ] Update controllers/routes to handle async service functions

## 6. Event Loop Basics

- [ ] Understand why Node can handle many requests
- [ ] Understand non-blocking code
- [ ] Understand why `readFileSync()` is bad in servers
- [ ] Understand why `await` does not freeze the whole server

## 7. Environment Variables

- [ ] Create `.env`
- [ ] Use `dotenv`
- [ ] Move `PORT` to `.env`
- [ ] Add `JWT_SECRET` later
- [ ] Add database URL later

## 8. MongoDB + Mongoose

- [ ] Learn why JSON files are not enough for real apps
- [ ] Learn MongoDB basics
- [ ] Learn Mongoose basics
- [ ] Create `User` model
- [ ] Create `Journal` model
- [ ] Replace `users.json`
- [ ] Replace `data.json`
- [ ] Connect database using `.env`

## 9. Database Design Basics

- [ ] Understand one-to-many relationships
- [ ] Understand User -> Journals relationship
- [ ] Understand referencing IDs
- [ ] Understand when to embed vs reference

## 10. Authentication

- [ ] Learn password hashing
- [ ] Install and use `bcrypt`
- [ ] Hash password during signup
- [ ] Compare hashed password during login
- [ ] Learn JWT basics
- [ ] Return JWT after login
- [ ] Create auth middleware
- [ ] Protect journal routes
- [ ] Stop trusting `userId` from frontend

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
