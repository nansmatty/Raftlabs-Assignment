'use client';

import { use, useState } from 'react';
import { ORDER_STATUS } from '@/types/order';
import OrderStatusTimeline from '@/components/order/OrderStatusTimeline';
import Link from 'next/link';

export default function OrderTrackingPage({ params }: { params: Promise<{ orderId: string }> }) {
	const { orderId } = use(params);

	// Mock current status - in real app, this would come from API
	// For demo purposes, you can change this to see different states
	const [currentStatus] = useState(ORDER_STATUS.PREPARING);

	// Mock order details
	const orderDetails = {
		orderId: orderId,
		orderDate: new Date().toLocaleDateString(),
		estimatedDelivery: '30-45 minutes',
		customerName: 'John Doe',
		deliveryAddress: '123 Main Street, New York, NY 10001',
		totalAmount: 45.97,
	};

	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='max-w-4xl mx-auto'>
				<div className='mb-6'>
					<Link href='/' className='text-orange-500 hover:text-orange-600 font-medium flex items-center space-x-2'>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
								clipRule='evenodd'
							/>
						</svg>
						<span>Back to Menu</span>
					</Link>
				</div>

				<h1 className='text-3xl font-bold text-gray-800 mb-8'>Track Your Order</h1>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Order Status Timeline */}
					<div className='lg:col-span-2'>
						<OrderStatusTimeline currentStatus={currentStatus} />
					</div>

					{/* Order Details */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-lg shadow-md p-6 sticky top-24'>
							<h2 className='text-xl font-bold text-gray-800 mb-4'>Order Details</h2>

							<div className='space-y-3 text-sm'>
								<div>
									<p className='text-gray-600'>Order ID</p>
									<p className='font-semibold text-gray-800 break-all'>{orderDetails.orderId}</p>
								</div>

								<div>
									<p className='text-gray-600'>Order Date</p>
									<p className='font-semibold text-gray-800'>{orderDetails.orderDate}</p>
								</div>

								<div>
									<p className='text-gray-600'>Estimated Delivery</p>
									<p className='font-semibold text-gray-800'>{orderDetails.estimatedDelivery}</p>
								</div>

								<div className='border-t pt-3'>
									<p className='text-gray-600'>Customer Name</p>
									<p className='font-semibold text-gray-800'>{orderDetails.customerName}</p>
								</div>

								<div>
									<p className='text-gray-600'>Delivery Address</p>
									<p className='font-semibold text-gray-800'>{orderDetails.deliveryAddress}</p>
								</div>

								<div className='border-t pt-3'>
									<p className='text-gray-600'>Total Amount</p>
									<p className='text-xl font-bold text-orange-500'>${orderDetails.totalAmount.toFixed(2)}</p>
								</div>
							</div>

							<div className='mt-6 pt-6 border-t'>
								<Link
									href='/'
									className='block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors'>
									Order Again
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Help Section */}
				<div className='mt-8 bg-gray-50 rounded-lg p-6'>
					<h3 className='font-semibold text-gray-800 mb-2'>Need Help?</h3>
					<p className='text-gray-600 text-sm mb-4'>If you have any questions about your order, please contact our support team.</p>
					<div className='flex flex-col sm:flex-row gap-4'>
						<a href='tel:+15551234567' className='flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium'>
							<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
								<path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
							</svg>
							<span>+1 (555) 123-4567</span>
						</a>
						<a href='mailto:support@foodieexpress.com' className='flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium'>
							<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
								<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
								<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
							</svg>
							<span>support@foodieexpress.com</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
