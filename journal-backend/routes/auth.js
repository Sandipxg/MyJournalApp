const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.delete('/deleteaccount', authController.deleteAccount)

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
