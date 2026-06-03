import { create } from 'zustand';

export interface CartItem {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
	removeItem: (itemName: string) => void;
	updateQuantity: (itemName: string, quantity: number) => void;
	clearCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
	getDeliveryFee: () => number;
	getTax: () => number;
	getFinalTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],

	addItem: (item) => {
		set((state) => {
			const existing = state.items.find((i) => i.name === item.name);
			if (existing) {
				// Increase quantity, max 20
				return {
					items: state.items.map((i) => (i.name === item.name ? { ...i, quantity: Math.min(i.quantity + 1, 20) } : i)),
				};
			}
			// Add new item with id based on name
			return {
				items: [
					...state.items,
					{
						...item,
						id: item.name.toLowerCase().replace(/\s+/g, '-'),
						quantity: 1,
					},
				],
			};
		});
	},

	removeItem: (itemName) => {
		set((state) => ({
			items: state.items.filter((i) => i.name !== itemName),
		}));
	},

	updateQuantity: (itemName, quantity) => {
		if (quantity <= 0) {
			get().removeItem(itemName);
			return;
		}
		set((state) => ({
			items: state.items.map((i) => (i.name === itemName ? { ...i, quantity: Math.min(quantity, 20) } : i)),
		}));
	},

	clearCart: () => {
		set({ items: [] });
	},

	getTotalItems: () => {
		return get().items.reduce((sum, item) => sum + item.quantity, 0);
	},

	getTotalPrice: () => {
		return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	},

	getDeliveryFee: () => {
		const totalPrice = get().getTotalPrice();
		return totalPrice > 0 ? 3.99 : 0;
	},

	getTax: () => {
		const totalPrice = get().getTotalPrice();
		return totalPrice * 0.08; // 8% tax
	},

	getFinalTotal: () => {
		const totalPrice = get().getTotalPrice();
		const deliveryFee = get().getDeliveryFee();
		const tax = get().getTax();
		return totalPrice + deliveryFee + tax;
	},
}));
