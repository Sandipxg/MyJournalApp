const express = require('express')
const authService = require('../services/authService')

const router = express.Router()

router.post('/signup', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })

  try {
    const user = authService.signup(username, password)
    res.status(201).json(user)
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })

  try {
    const user = authService.login(username, password)
    res.json(user)
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
})

router.delete('/deleteaccount', (req, res) => {
  const { username , password } = req.body
    if (!username || !password) return res.status(400).json({ error: 'username and password required' })

    try{
      const user = authService.deleteAccount(username, password)
      res.json(user)
    }
    catch (err) { res.status(401).json({ error: err.message })
    }

})

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
