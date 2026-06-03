import { z } from 'zod';

export const createOrderSchema = z.object({
	customerName: z.string().min(2, 'Customer name is required'),
	address: z.string().min(5, 'Address is required'),
	phoneNumber: z
		.string()
		.min(10, 'Phone number is required')
		.regex(/^\d{10}$/, 'Phone number must be 10 digits'),
	items: z
		.array(
			z.object({
				menuItemId: z.string().min(1, 'Menu item ID is required'),
				quantity: z.number().int().positive('Quantity must be a positive integer').max(20, 'Maximum quantity per item is 20'),
			}),
		)
		.min(1, 'At least one item is required'),
});

export const updateOrderStatusSchema = z.object({
	status: z.enum(['ORDER_RECEIVED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED']),
});
