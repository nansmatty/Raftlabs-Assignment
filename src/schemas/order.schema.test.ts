import { describe, it, expect } from 'vitest';
import { createOrderSchema } from './order.schema';

const validPayload = {
	customerName: 'John Doe',
	address: '123 Main St, Anytown, USA',
	phoneNumber: '1234567890',
	items: [
		{
			menuItemId: 'pizza-1',
			quantity: 2,
		},
	],
};

describe('createOrderSchema', () => {
	it('should validate correct order data', () => {
		const result = createOrderSchema.safeParse(validPayload);

		expect(result.success).toBe(true);
	});

	it('should fail if customer name is missing', () => {
		const result = createOrderSchema.safeParse({
			...validPayload,
			customerName: '',
		});

		expect(result.success).toBe(false);
	});

	it('should fail when menuItemId is missing', () => {
		const result = createOrderSchema.safeParse({
			...validPayload,
			items: [
				{
					quantity: 2,
				},
			],
		});

		expect(result.success).toBe(false);
	});

	it('should fail when quantity is less than one', () => {
		const result = createOrderSchema.safeParse({
			...validPayload,
			items: [
				{
					menuItemId: 'pizza-1',
					quantity: 0,
				},
			],
		});

		expect(result.success).toBe(false);
	});
});
