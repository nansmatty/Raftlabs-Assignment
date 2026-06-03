'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CartSummary from '@/components/cart/CartSummary';

export default function CheckoutPage() {
	const router = useRouter();
	const items = useCartStore((state) => state.items);

	useEffect(() => {
		// Redirect to cart if empty
		if (items.length === 0) {
			router.push('/cart');
		}
	}, [items, router]);

	if (items.length === 0) {
		return null;
	}

	return (
		<div className='container mx-auto px-4 py-12'>
			<h1 className='text-3xl font-bold text-gray-800 mb-8'>Checkout</h1>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Checkout Form */}
				<div className='lg:col-span-2'>
					<div className='bg-white rounded-lg shadow-md p-6'>
						<CheckoutForm />
					</div>
				</div>

				{/* Order Summary */}
				<div className='lg:col-span-1'>
					<div className='sticky top-24'>
						<CartSummary showCheckoutButton={false} />

						{/* Order Items Preview */}
						<div className='bg-white rounded-lg shadow-md p-6 mt-6'>
							<h3 className='font-semibold text-gray-800 mb-4'>Order Items</h3>
							<div className='space-y-3'>
								{items.map((item) => (
									<div key={item.name} className='flex justify-between text-sm'>
										<span className='text-gray-600'>
											{item.name} × {item.quantity}
										</span>
										<span className='font-medium text-gray-800'>${(item.price * item.quantity).toFixed(2)}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
