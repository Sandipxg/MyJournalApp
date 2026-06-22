const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { bcryptSaltRounds } = require('../config')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    reminderTime: {
      type: String, // Format: "HH:MM", or null if notifications are disabled
      default: null,
    },
    timezone: {
      type: String, // Local timezone of the device, e.g. "Asia/Kolkata"
      default: 'UTC',
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

function toClientUser(user) {
  if (!user) return null
  return {
    id: user._id.toString(),
    username: user.username,
    reminderTime: user.reminderTime,
    timezone: user.timezone,
  }
}

async function findByUsername(username) {
  const user = await User.findOne({ username })
  return toClientUser(user)
}

async function findByCredentials(username, password) {
  const user = await User.findOne({ username })
  if (!user || !user.password) return null
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return null
  return toClientUser(user)
}

async function create(username, password) {
  const hashed = await bcrypt.hash(password, bcryptSaltRounds)
  const user = await User.create({ username, password: hashed })
  return toClientUser(user)
}

async function findOrCreateGoogleUser(googleId, username) {
  let user = await User.findOne({ googleId })
  if (user) {
    return toClientUser(user)
  }

  // Check if a user with that email/username already exists
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    existingUser.googleId = googleId
    await existingUser.save()
    return toClientUser(existingUser)
  }

  user = await User.create({ username, googleId })
  return toClientUser(user)
}

async function removeById(userId) {
  await User.findByIdAndDelete(userId)
}

async function updateReminder(userId, reminderTime, timezone) {
  const user = await User.findByIdAndUpdate(
    userId,
    { reminderTime, timezone },
    { new: true }
  )
  return toClientUser(user)
}

module.exports = {
  findByUsername,
  findByCredentials,
  create,
  findOrCreateGoogleUser,
  removeById,
  updateReminder,
  User,
}
