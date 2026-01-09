import { z } from 'zod';

// Order validation schema with proper constraints
export const orderValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z
    .string()
    .trim()
    .min(8, 'Phone number must be at least 8 characters')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number'),
  address: z
    .string()
    .trim()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  country: z
    .string()
    .trim()
    .min(2, 'Please select a country')
    .max(3, 'Invalid country code'),
  notes: z
    .string()
    .trim()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
});

export type OrderFormData = z.infer<typeof orderValidationSchema>;
