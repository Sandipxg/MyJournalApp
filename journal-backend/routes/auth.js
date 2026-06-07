const express = require('express')
const authController = require('../controllers/authController')

const validate = require('../middleware/validate')
const { signupSchema, loginSchema } = require('../validators/authValidator')

const router = express.Router()

router.post('/signup', validate(signupSchema), authController.signup)
router.post('/login', validate(loginSchema), authController.login)
router.post('/logout', authController.logout)
router.delete('/deleteaccount', validate(loginSchema), authController.deleteAccount)

module.exports = router

/* [ LOGOUT ROUTE ]
A backend /logout route is only needed when the backend has something to invalidate, 
for example:

--> server-side sessions/cookies
--> refresh tokens
--> JWT blocklist/revocation
--> database session records

In your app’s current setup,
 logout means: delete the saved user from the frontend and redirect to login.
 No backend route required.
*/
