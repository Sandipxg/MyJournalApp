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
      required: true,
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
  }
}

async function findByUsername(username) {
  const user = await User.findOne({ username })
  return toClientUser(user)
}

async function findByCredentials(username, password) {
  const user = await User.findOne({ username })
  if (!user) return null
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return null
  return toClientUser(user)
}

async function create(username, password) {
  const hashed = await bcrypt.hash(password, bcryptSaltRounds)
  const user = await User.create({ username, password: hashed })
  return toClientUser(user)
}

async function removeById(userId) {
  await User.findByIdAndDelete(userId)
}

module.exports = { findByUsername, findByCredentials, create, removeById }
