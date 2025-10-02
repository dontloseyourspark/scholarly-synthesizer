import { z } from 'zod';

// Insight validation schema
export const insightSchema = z.object({
  content: z.string()
    .trim()
    .min(10, 'Insight must be at least 10 characters')
    .max(5000, 'Insight must not exceed 5000 characters'),
  position: z.enum(['support', 'neutral', 'against']),
  confidence: z.number()
    .min(0, 'Confidence must be at least 0')
    .max(100, 'Confidence must not exceed 100'),
});

// Discussion/Comment validation schema
export const discussionSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Comment cannot be empty')
    .max(2000, 'Comment must not exceed 2000 characters'),
});

// Profile validation schema
export const profileSchema = z.object({
  username: z.string()
    .trim()
    .min(2, 'Username must be at least 2 characters')
    .max(100, 'Username must not exceed 100 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  bio: z.string()
    .trim()
    .max(1000, 'Bio must not exceed 1000 characters')
    .optional()
    .nullable(),
  academic_title: z.string()
    .trim()
    .max(255, 'Academic title must not exceed 255 characters')
    .optional()
    .nullable(),
  institution: z.string()
    .trim()
    .max(255, 'Institution must not exceed 255 characters')
    .optional()
    .nullable(),
  field_of_study: z.string()
    .trim()
    .max(255, 'Field of study must not exceed 255 characters')
    .optional()
    .nullable(),
});

// Source validation schema
export const sourceSchema = z.object({
  title: z.string()
    .trim()
    .max(500, 'Title must not exceed 500 characters')
    .optional()
    .nullable(),
  authors: z.string()
    .trim()
    .max(500, 'Authors must not exceed 500 characters')
    .optional()
    .nullable(),
  publication: z.string()
    .trim()
    .max(500, 'Publication must not exceed 500 characters')
    .optional()
    .nullable(),
  year: z.number()
    .int()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future')
    .optional()
    .nullable(),
  url: z.string()
    .url('Must be a valid URL')
    .max(1000, 'URL must not exceed 1000 characters')
    .optional()
    .nullable()
    .or(z.literal('')),
  doi: z.string()
    .trim()
    .max(255, 'DOI must not exceed 255 characters')
    .optional()
    .nullable(),
});

// Sanitize HTML to prevent XSS attacks
export const sanitizeHtml = (text: string): string => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
