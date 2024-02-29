import { z } from 'zod';

export const availabilitySchema = z.object({
  day: z.enum(
    [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    {
      required_error: '',
    }
  ),
  available: z.boolean({ required_error: '' }).default(false),
  start_hours: z.date({ required_error: '' }),
  end_hours: z.date({ required_error: '' }),
});

export const unavailabilitySchema = z.object({
  start: z.date({ required_error: '' }),
  end: z.date({ required_error: '' }),
});

export const scheduleSchema = z.object({
  address: z.string().regex(RegExp(/^0x[a-fA-F0-9]{40}$/g), 'Invalid address'),
  email: z.string({ required_error: '' }).email({
    message: 'Invalid email address',
  }),
  timeZone: z.string({ required_error: '' }),
  max_duration: z.number({ required_error: '' }),
  availability: z.array(availabilitySchema).refine((data) => {
    const days = data.map((d) => d.day);
    const uniqueDays = [...new Set(days)];
    return uniqueDays.length === 7;
  }, 'All days must be present in the availability array'),
  unavailability: z.array(unavailabilitySchema, {
    required_error: '',
  }),
});

export type Schedule = z.infer<typeof scheduleSchema>;
export type Availability = z.infer<typeof availabilitySchema>;
export type Unavailability = z.infer<typeof unavailabilitySchema>;
