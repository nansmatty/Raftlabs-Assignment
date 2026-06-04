'use client';

import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { CircleCheck, ArrowLeft, Truck, Package, ChefHat, Bike, CheckCircle2 } from 'lucide-react';

// Placeholder data for design purposes
const placeholderOrder = {
	status: 'PREPARING',
	customerName: 'John Doe',
	address: '123 Main Street, Apt 4B, New York, NY 10001',
	phoneNumber: '+1 (555) 123-4567',
	items: [
		{
			id: '1',
			name: 'Margherita Pizza',
			description: 'Classic tomato sauce and mozzarella',
			quantity: 2,
			price: 14.99,
			imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
		},
		{
			id: '2',
			name: 'Caesar Salad',
			description: 'Fresh romaine with parmesan',
			quantity: 1,
			price: 9.99,
			imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
		},
		{
			id: '3',
			name: 'Chicken Wings',
			description: 'Spicy buffalo wings',
			quantity: 1,
			price: 12.99,
			imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400',
		},
	],
	subtotal: 52.96,
	deliveryFee: 3.99,
	tax: 4.24,
	total: 61.19,
};

const orderStatuses = [
	{ key: 'ORDER_RECEIVED', label: 'Order Received', icon: Package },
	{ key: 'PREPARING', label: 'Preparing', icon: ChefHat },
	{ key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Bike },
	{ key: 'DELIVERED', label: 'Delivered', icon: CheckCircle2 },
];

export default function OrderDetailsPage({ params }: { params: Promise<{ orderId: string }> }) {
	const { orderId } = use(params);
	const currentStatusIndex = orderStatuses.findIndex((s) => s.key === placeholderOrder.status);

	return (
		<div className='min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50'>
			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				{/* Success Header */}
				<div className='text-center mb-8'>
					<div className='inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce'>
						<CircleCheck className='w-12 h-12 text-green-600' />
					</div>
					<h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>Order Confirmed!</h1>
					<p className='text-gray-600 text-lg'>Thank you for your order. We&apos;ll have it ready soon.</p>
				</div>

				{/* Order ID Card */}
				<div className='bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-orange-200'>
					<div className='flex items-center justify-between flex-wrap gap-4'>
						<div>
							<p className='text-sm text-gray-500 mb-1'>Order ID</p>
							<p className='text-xl font-bold text-gray-800 font-mono'>{orderId}</p>
						</div>
						<div className='flex gap-3'>
							<Link
								href='/'
								className='inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium'>
								<ArrowLeft className='w-4 h-4' />
								Back to Menu
							</Link>
							<button className='inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium'>
								<Truck className='w-4 h-4' />
								Track Order
							</button>
						</div>
					</div>
				</div>

				{/* Order Status Timeline */}
				<div className='bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6'>
					<h2 className='text-xl font-bold text-gray-800 mb-6'>Order Status</h2>
					<div className='relative'>
						{/* Progress Line */}
						<div className='absolute top-6 left-0 right-0 h-1 bg-gray-200 hidden md:block' style={{ left: '2rem', right: '2rem' }} />
						<div
							className='absolute top-6 left-0 h-1 bg-orange-500 hidden md:block transition-all duration-500'
							style={{
								left: '2rem',
								width: `calc(${(currentStatusIndex / (orderStatuses.length - 1)) * 100}% - 4rem)`,
							}}
						/>

						{/* Status Steps */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0'>
							{orderStatuses.map((status, index) => {
								const Icon = status.icon;
								const isActive = index <= currentStatusIndex;
								const isCurrent = index === currentStatusIndex;

								return (
									<div key={status.key} className='flex flex-col items-center text-center relative'>
										<div
											className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 z-10 ${
												isActive
													? isCurrent
														? 'bg-orange-500 text-white shadow-lg scale-110'
														: 'bg-green-500 text-white'
													: 'bg-gray-200 text-gray-400'
											}`}>
											<Icon className='w-6 h-6' />
										</div>
										<p className={`text-xs md:text-sm font-medium px-2 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{status.label}</p>
										{isCurrent && <div className='mt-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full'>In Progress</div>}
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className='grid md:grid-cols-3 gap-6'>
					{/* Left Column: Customer Info & Items */}
					<div className='md:col-span-2 space-y-6'>
						{/* Customer Information */}
						<div className='bg-white rounded-2xl shadow-lg p-6'>
							<h2 className='text-xl font-bold text-gray-800 mb-4'>Delivery Information</h2>
							<div className='space-y-4'>
								<div>
									<p className='text-sm text-gray-500 mb-1'>Customer Name</p>
									<p className='text-gray-800 font-medium'>{placeholderOrder.customerName}</p>
								</div>
								<div>
									<p className='text-sm text-gray-500 mb-1'>Delivery Address</p>
									<p className='text-gray-800 font-medium'>{placeholderOrder.address}</p>
								</div>
								<div>
									<p className='text-sm text-gray-500 mb-1'>Phone Number</p>
									<p className='text-gray-800 font-medium'>{placeholderOrder.phoneNumber}</p>
								</div>
							</div>
						</div>

						{/* Order Items */}
						<div className='bg-white rounded-2xl shadow-lg p-6'>
							<h2 className='text-xl font-bold text-gray-800 mb-4'>Order Items</h2>
							<div className='space-y-4'>
								{placeholderOrder.items.map((item) => (
									<div key={item.id} className='flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0'>
										<div className='relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100'>
											<Image src={item.imageUrl} alt={item.name} fill className='object-cover' />
										</div>
										<div className='flex-1 min-w-0'>
											<h3 className='font-semibold text-gray-800 mb-1'>{item.name}</h3>
											<p className='text-sm text-gray-500 mb-2 truncate'>{item.description}</p>
											<div className='flex items-center justify-between'>
												<span className='text-sm text-gray-600'>Qty: {item.quantity}</span>
												<span className='text-sm text-gray-500'>${item.price.toFixed(2)} each</span>
											</div>
										</div>
										<div className='flex items-center'>
											<p className='font-bold text-gray-800'>${(item.price * item.quantity).toFixed(2)}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column: Order Summary */}
					<div className='md:col-span-1'>
						<div className='bg-white rounded-2xl shadow-lg p-6 sticky top-24'>
							<h2 className='text-xl font-bold text-gray-800 mb-4'>Order Summary</h2>
							<div className='space-y-3 mb-4'>
								<div className='flex justify-between text-gray-600'>
									<span>Subtotal</span>
									<span>${placeholderOrder.subtotal.toFixed(2)}</span>
								</div>
								<div className='flex justify-between text-gray-600'>
									<span>Delivery Fee</span>
									<span>${placeholderOrder.deliveryFee.toFixed(2)}</span>
								</div>
								<div className='flex justify-between text-gray-600'>
									<span>Tax (8%)</span>
									<span>${placeholderOrder.tax.toFixed(2)}</span>
								</div>
								<div className='border-t border-gray-200 pt-3'>
									<div className='flex justify-between text-lg font-bold text-gray-800'>
										<span>Total</span>
										<span className='text-orange-600'>${placeholderOrder.total.toFixed(2)}</span>
									</div>
								</div>
							</div>

							{/* Estimated Delivery Time */}
							<div className='mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200'>
								<p className='text-sm font-semibold text-orange-800 mb-1'>Estimated Delivery</p>
								<p className='text-2xl font-bold text-orange-600'>25-35 min</p>
							</div>

							{/* Support Info */}
							<div className='mt-6 p-4 bg-gray-50 rounded-lg'>
								<p className='text-xs text-gray-600 text-center'>
									Need help? Contact support at{' '}
									<a href='tel:+15551234567' className='text-orange-600 font-medium hover:underline'>
										+1 (555) 123-4567
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
