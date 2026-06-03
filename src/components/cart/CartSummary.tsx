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
		<div className='bg-white rounded-lg shadow-md p-6'>
			<h2 className='text-xl font-bold text-gray-800 mb-4'>Order Summary</h2>

			<div className='space-y-3 mb-4'>
				<div className='flex justify-between text-gray-600'>
					<span>Subtotal ({totalItems} items)</span>
					<span>${totalPrice.toFixed(2)}</span>
				</div>
				<div className='flex justify-between text-gray-600'>
					<span>Delivery Fee</span>
					<span>${deliveryFee.toFixed(2)}</span>
				</div>
				<div className='flex justify-between text-gray-600'>
					<span>Tax (8%)</span>
					<span>${tax.toFixed(2)}</span>
				</div>
				<div className='border-t pt-3'>
					<div className='flex justify-between text-lg font-bold text-gray-800'>
						<span>Total</span>
						<span className='text-orange-500'>${finalTotal.toFixed(2)}</span>
					</div>
				</div>
			</div>

			{showCheckoutButton && (
				<Link
					href='/checkout'
					className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
						totalItems > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
					}`}>
					Proceed to Checkout
				</Link>
			)}
		</div>
	);
}
