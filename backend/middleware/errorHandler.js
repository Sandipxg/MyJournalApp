function notFound(req, res, next) {
  res.status(404).json({ error: 'Route not found' })
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong'

  const response = { error: message }
  if (err.details) {
    response.details = err.details
  }

  res.status(statusCode).json(response)
}

module.exports = { notFound, errorHandler }
