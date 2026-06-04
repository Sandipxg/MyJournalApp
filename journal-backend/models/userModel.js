const mongoose = require('mongoose')

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
  const user = await User.findOne({ username, password })
  return toClientUser(user)
}

async function create(username, password) {
  const user = await User.create({ username, password })
  return toClientUser(user)
}

async function removeById(userId) {
  await User.findByIdAndDelete(userId)
}

module.exports = { findByUsername, findByCredentials, create, removeById }
