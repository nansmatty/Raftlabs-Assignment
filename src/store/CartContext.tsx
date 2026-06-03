'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IMenuItem } from '@/types/menu';

export interface CartItem extends IMenuItem {
	quantity: number;
}

interface CartContextType {
	items: CartItem[];
	addItem: (item: IMenuItem) => void;
	removeItem: (itemName: string) => void;
	updateQuantity: (itemName: string, quantity: number) => void;
	clearCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = (item: IMenuItem) => {
		setItems((prev) => {
			const existing = prev.find((i) => i.name === item.name);
			if (existing) {
				return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
			}
			return [...prev, { ...item, quantity: 1 }];
		});
	};

	const removeItem = (itemName: string) => {
		setItems((prev) => prev.filter((i) => i.name !== itemName));
	};

	const updateQuantity = (itemName: string, quantity: number) => {
		if (quantity <= 0) {
			removeItem(itemName);
			return;
		}
		setItems((prev) => prev.map((i) => (i.name === itemName ? { ...i, quantity } : i)));
	};

	const clearCart = () => {
		setItems([]);
	};

	const getTotalItems = () => {
		return items.reduce((sum, item) => sum + item.quantity, 0);
	};

	const getTotalPrice = () => {
		return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
				getTotalItems,
				getTotalPrice,
			}}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
}
