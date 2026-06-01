function notFound(req, res, next) {
  res.status(404).json({ error: 'Route not found' })
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong'

  res.status(statusCode).json({ error: message })
}

module.exports = { notFound, errorHandler }
