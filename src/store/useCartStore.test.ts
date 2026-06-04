import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './useCartStore';

const mockItem = {
	_id: 'pizza-1',
	name: 'Margherita',
	description: 'Classic pizza with tomato sauce and mozzarella cheese',
	price: 100,
	imageUrl: 'https://example.com/pizza.jpg',
};

beforeEach(() => {
	useCartStore.getState().clearCart();
});

describe('useCartStore', () => {
	it('should add an item to the cart', () => {
		useCartStore.getState().addItem(mockItem);

		const items = useCartStore.getState().items;

		expect(items).toHaveLength(1);
		expect(items[0].name).toBe('Margherita');
		expect(items[0].quantity).toBe(1);
	});

	it('should increase quantity when adding the same item', () => {
		useCartStore.getState().addItem(mockItem);

		useCartStore.getState().updateQuantity(mockItem._id, 5);

		const items = useCartStore.getState().items;
		expect(items).toHaveLength(1);
		expect(items[0].quantity).toBe(5);
	});

	it('should remove an item from the cart', () => {
		useCartStore.getState().addItem(mockItem);
		useCartStore.getState().removeItem(mockItem._id);
		const items = useCartStore.getState().items;
		expect(items).toHaveLength(0);
	});

	it('should calculate total price correctly', () => {
		useCartStore.getState().addItem(mockItem);
		useCartStore.getState().updateQuantity(mockItem._id, 3);

		const totalPrice = useCartStore.getState().getTotalPrice();

		expect(totalPrice).toBe(300);
	});
});
