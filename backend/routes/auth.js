import express from 'express'
import * as authController from '../controllers/authController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.delete('/deleteaccount', auth, authController.deleteAccount)
router.put('/reminder', auth, authController.updateReminder)
router.get('/me', auth, authController.getMe)

export default router
