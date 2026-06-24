import { auth } from '../config/auth.js'
import * as userModel from '../models/userModel.js'
import * as journalModel from '../models/journalModel.js'
import AppError from '../utils/AppError.js'

export async function deleteAccount(userId, password, headers) {
  try {
    const verification = await auth.api.verifyPassword({
      body: { password },
      headers
    })

    if (!verification || !verification.status) {
      throw new AppError('Invalid password', 401)
    }
  } catch (err) {
    throw new AppError('Invalid password', 401)
  }

  await userModel.removeById(userId)
  await journalModel.removeByUser(userId)

  return { message: 'Account deleted' }
}

export async function updateReminder(userId, reminderTime, timezone) {
  return await userModel.updateReminder(userId, reminderTime, timezone)
}

export async function getMe(userId) {
  const user = await userModel.User.findById(userId)
  if (!user) return null
  return {
    id: user._id.toString(),
    username: user.username || user.name || '',
    email: user.email,
    reminderTime: user.reminderTime,
    timezone: user.timezone
  }
}
