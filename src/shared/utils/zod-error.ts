import { ZodError } from 'zod';
import { toast } from 'sonner';

export function showZodErrorsAsToasts(error: unknown) {
  if (error instanceof ZodError) {
    error.errors.forEach((err) => {
      toast.error(err.message);
    });
  }
}
