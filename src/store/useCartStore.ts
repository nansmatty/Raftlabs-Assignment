import { create } from 'zustand';

export interface CartItem {
	_id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	addItem: (item: Omit<CartItem, 'quantity'>) => void;
	removeItem: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
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
			const existing = state.items.find((i) => i._id === item._id);
			if (existing) {
				// Increase quantity, max 20
				return {
					items: state.items.map((i) => (i._id === item._id ? { ...i, quantity: Math.min(i.quantity + 1, 20) } : i)),
				};
			}
			// Add new item with id based on name
			return {
				items: [
					...state.items,
					{
						...item,
						quantity: 1,
					},
				],
			};
		});
	},

	removeItem: (itemId) => {
		set((state) => ({
			items: state.items.filter((i) => i._id !== itemId),
		}));
	},

	updateQuantity: (itemId, quantity) => {
		if (quantity <= 0) {
			get().removeItem(itemId);
			return;
		}
		set((state) => ({
			items: state.items.map((i) => (i._id === itemId ? { ...i, quantity: Math.min(quantity, 20) } : i)),
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
