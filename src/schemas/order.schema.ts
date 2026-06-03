import { z } from 'zod';

export const createOrderSchema = z.object({
	customerName: z.string().min(1, 'Customer name is required'),
	address: z.string().min(1, 'Address is required'),
	phoneNumber: z
		.string()
		.min(10, 'Phone number is required')
		.regex(/^\d{10}$/, 'Phone number must be 10 digits'),
	items: z
		.array(
			z.object({
				menuItemId: z.string().min(1, 'Menu item ID is required'),
				quantity: z.number().int().positive('Quantity must be a positive integer'),
			}),
		)
		.min(1, 'At least one item is required'),
});
