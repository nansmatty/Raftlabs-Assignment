'use client';

import Link from 'next/link';
import { use } from 'react';
import { CircleCheck } from 'lucide-react';

export default function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
	const { orderId } = use(params);

	// Mock total amount - in real app, this would come from order data
	const totalAmount = 45.97;

	return (
		<div className='container mx-auto px-4 py-16'>
			<div className='max-w-2xl mx-auto'>
				<div className='bg-white rounded-lg shadow-md p-8 text-center'>
					{/* Success Icon */}
					<div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
						<CircleCheck className='h-12 w-12 text-green-500' />
					</div>

					{/* Success Message */}
					<h1 className='text-3xl font-bold text-gray-800 mb-2'>Order Placed Successfully!</h1>
					<p className='text-gray-600 mb-8'>Thank you for your order. We'll start preparing your delicious food right away.</p>

					{/* Order Details */}
					<div className='bg-gray-50 rounded-lg p-6 mb-8'>
						<div className='space-y-3 text-left'>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Order ID:</span>
								<span className='font-semibold text-gray-800'>{orderId}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Total Amount:</span>
								<span className='font-semibold text-gray-800'>${totalAmount.toFixed(2)}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Estimated Delivery:</span>
								<span className='font-semibold text-gray-800'>30-45 minutes</span>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							href={`/order/${orderId}/track`}
							className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors'>
							Track Your Order
						</Link>
						<Link href='/' className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors'>
							Back to Menu
						</Link>
					</div>
				</div>

				{/* Additional Info */}
				<div className='mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4'>
					<p className='text-sm text-blue-800 text-center'>📧 A confirmation email has been sent to your email address with order details.</p>
				</div>
			</div>
		</div>
	);
}
