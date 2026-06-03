'use client';

import { CartItem as CartItemType } from '@/store/CartContext';
import { useCart } from '@/store/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
	item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
	const { updateQuantity, removeItem } = useCart();

	const handleQuantityChange = (newQuantity: number) => {
		updateQuantity(item.name, newQuantity);
	};

	const subtotal = item.price * item.quantity;

	return (
		<div className='bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4'>
			<div className='w-20 h-20 shrink-0 rounded-lg overflow-hidden'>
				<img src={item.imageUrl} alt={item.name} className='w-full h-full object-cover' />
			</div>

			<div className='flex-1'>
				<h3 className='font-semibold text-gray-800'>{item.name}</h3>
				<p className='text-sm text-gray-600'>${item.price.toFixed(2)} each</p>
			</div>

			<div className='flex items-center space-x-3'>
				<button
					onClick={() => handleQuantityChange(item.quantity - 1)}
					className='w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors'
					aria-label='Decrease quantity'>
					<Minus className='h-4 w-4 text-gray-700' />
				</button>
				<span className='w-8 text-center font-semibold text-gray-800'>{item.quantity}</span>
				<button
					onClick={() => handleQuantityChange(item.quantity + 1)}
					className='w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors'
					aria-label='Increase quantity'>
					<Plus className='h-4 w-4 text-white' />
				</button>
			</div>

			<div className='w-20 text-right'>
				<p className='font-bold text-gray-800'>${subtotal.toFixed(2)}</p>
			</div>

			<button onClick={() => removeItem(item.name)} className='text-red-500 hover:text-red-700 transition-colors' aria-label='Remove item'>
				<Trash2 className='h-5 w-5' />
			</button>
		</div>
	);
}
