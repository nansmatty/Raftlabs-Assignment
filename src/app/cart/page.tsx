'use client';

import { useCartStore } from '@/store/useCartStore';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
	const items = useCartStore((state) => state.items);

	if (items.length === 0) {
		return (
			<div className='container mx-auto px-4 py-16'>
				<div className='max-w-2xl mx-auto text-center'>
					<div className='bg-white rounded-lg shadow-md p-12'>
						<ShoppingCart className='h-24 w-24 mx-auto text-gray-300 mb-4' />
						<h2 className='text-2xl font-bold text-gray-400 mb-2'>Your cart is empty</h2>
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
			<h1 className='text-3xl font-bold text-gray-400 mb-8'>Your Cart</h1>

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
