const { z } = require('zod')

const createJournalSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title cannot exceed 100 characters')
    .trim()
})

const updateJournalSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title cannot exceed 100 characters')
    .trim()
    .optional()
})

module.exports = {
  createJournalSchema,
  updateJournalSchema
}
