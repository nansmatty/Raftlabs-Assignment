'use client';

import { CartItem as CartItemType } from '@/store/CartContext';
import { useCart } from '@/store/CartContext';

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
					<span className='text-gray-700 font-bold'>−</span>
				</button>
				<span className='w-8 text-center font-semibold text-gray-800'>{item.quantity}</span>
				<button
					onClick={() => handleQuantityChange(item.quantity + 1)}
					className='w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors'
					aria-label='Increase quantity'>
					<span className='text-white font-bold'>+</span>
				</button>
			</div>

			<div className='w-20 text-right'>
				<p className='font-bold text-gray-800'>${subtotal.toFixed(2)}</p>
			</div>

			<button onClick={() => removeItem(item.name)} className='text-red-500 hover:text-red-700 transition-colors' aria-label='Remove item'>
				<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
		</div>
	);
}
