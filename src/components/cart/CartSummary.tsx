'use client';

import { useCart } from '@/store/CartContext';
import Link from 'next/link';

interface CartSummaryProps {
	showCheckoutButton?: boolean;
}

export default function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
	const { getTotalPrice, getTotalItems } = useCart();
	const totalPrice = getTotalPrice();
	const totalItems = getTotalItems();
	const deliveryFee = totalPrice > 0 ? 3.99 : 0;
	const tax = totalPrice * 0.08; // 8% tax
	const finalTotal = totalPrice + deliveryFee + tax;

	return (
		<div className='bg-white rounded-2xl shadow-xl p-6 border border-gray-100'>
			<h2 className='text-2xl font-bold text-gray-900 mb-6'>Your Order</h2>

			<div className='space-y-4 mb-6'>
				<div className='flex justify-between text-gray-700'>
					<span className='font-medium'>Subtotal ({totalItems} items)</span>
					<span className='font-semibold'>${totalPrice.toFixed(2)}</span>
				</div>
				<div className='flex justify-between text-gray-700'>
					<span className='font-medium'>Delivery Fee</span>
					<span className='font-semibold'>${deliveryFee.toFixed(2)}</span>
				</div>
				<div className='flex justify-between text-gray-700'>
					<span className='font-medium'>Tax (8%)</span>
					<span className='font-semibold'>${tax.toFixed(2)}</span>
				</div>
				<div className='border-t-2 border-gray-200 pt-4'>
					<div className='flex justify-between text-xl font-bold'>
						<span className='text-gray-900'>Total</span>
						<span className='text-orange-600'>${finalTotal.toFixed(2)}</span>
					</div>
				</div>
			</div>

			{showCheckoutButton && (
				<Link
					href='/checkout'
					className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
						totalItems > 0
							? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-[1.02]'
							: 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
					}`}>
					Proceed to Checkout
				</Link>
			)}
		</div>
	);
}
