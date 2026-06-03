'use client';

import { ORDER_STATUS } from '@/types/order';
import { CircleCheck, ChefHat, Bike, PackageCheck } from 'lucide-react';

type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

interface OrderStatusTimelineProps {
	currentStatus: OrderStatus;
}

const statusSteps = [
	{
		key: ORDER_STATUS.ORDER_RECEIVED,
		label: 'Order Received',
		icon: CircleCheck,
		description: 'We have received your order',
	},
	{
		key: ORDER_STATUS.PREPARING,
		label: 'Preparing',
		icon: ChefHat,
		description: 'Your food is being prepared',
	},
	{
		key: ORDER_STATUS.OUT_FOR_DELIVERY,
		label: 'Out for Delivery',
		icon: Bike,
		description: 'Your order is on the way',
	},
	{
		key: ORDER_STATUS.DELIVERED,
		label: 'Delivered',
		icon: PackageCheck,
		description: 'Order delivered successfully',
	},
];

export default function OrderStatusTimeline({ currentStatus }: OrderStatusTimelineProps) {
	const currentStepIndex = statusSteps.findIndex((step) => step.key === currentStatus);

	return (
		<div className='bg-white rounded-lg shadow-md p-6'>
			<h2 className='text-xl font-bold text-gray-800 mb-6'>Order Status</h2>

			<div className='relative'>
				{/* Timeline line */}
				<div className='absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200' />

				<div className='space-y-8'>
					{statusSteps.map((step, index) => {
						const isCompleted = index <= currentStepIndex;
						const isCurrent = index === currentStepIndex;

						const IconComponent = step.icon;
						return (
							<div key={step.key} className='relative flex items-start space-x-4'>
								{/* Icon circle */}
								<div
									className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
										isCompleted ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
									}`}>
									<IconComponent className='h-6 w-6' />
								</div>

								{/* Content */}
								<div className='flex-1 pt-1'>
									<h3 className={`font-semibold text-lg ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</h3>
									<p className={`text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>{step.description}</p>
									{isCurrent && (
										<div className='mt-2 inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full'>Current Status</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
