import { z } from 'zod';

export const auditFormSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  websiteUrl: z.string().url('Please enter a valid website URL')
    .refine((url) => {
      try {
        const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
        return urlObj.hostname.includes('.');
      } catch {
        return false;
      }
    }, 'Please enter a valid website URL'),
  phone: z.string().optional(),
  goals: z.string().optional(),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;