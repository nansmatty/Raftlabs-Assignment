'use client';

import { useCart } from '@/store/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';

export default function CartPage() {
	const { items } = useCart();

	if (items.length === 0) {
		return (
			<div className='container mx-auto px-4 py-16'>
				<div className='max-w-2xl mx-auto text-center'>
					<div className='bg-white rounded-lg shadow-md p-12'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-24 w-24 mx-auto text-gray-300 mb-4'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
							/>
						</svg>
						<h2 className='text-2xl font-bold text-gray-800 mb-2'>Your cart is empty</h2>
						<p className='text-gray-600 mb-6'>Add some delicious items to get started!</p>
						<Link href='/' className='inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors'>
							Browse Menu
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto px-4 py-12'>
			<h1 className='text-3xl font-bold text-gray-800 mb-8'>Your Cart</h1>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Cart Items */}
				<div className='lg:col-span-2 space-y-4'>
					{items.map((item) => (
						<CartItem key={item.name} item={item} />
					))}
				</div>

				{/* Cart Summary */}
				<div className='lg:col-span-1'>
					<div className='sticky top-24'>
						<CartSummary />
					</div>
				</div>
			</div>
		</div>
	);
}
