'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/lib/api/orders';

type CheckoutFormValues = {
	customerName: string;
	address: string;
	phoneNumber: string;
};

export default function CheckoutForm() {
	const router = useRouter();
	const clearCart = useCartStore((state) => state.clearCart);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutFormValues>();

	const createOrderMutation = useMutation({
		mutationFn: createOrder,
		onSuccess: (data) => {
			clearCart();
			router.push(`/order/${data.orderId}`);
		},
	});

	const onSubmit = (data: CheckoutFormValues) => {
		createOrderMutation.mutate({
			customerName: data.customerName,
			address: data.address,
			phoneNumber: data.phoneNumber,
			items: useCartStore.getState().items.map((item) => ({
				menuItemId: item._id,
				quantity: item.quantity,
			})),
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div>
				<h2 className='text-xl font-bold text-gray-400 mb-4'>Delivery Information</h2>
				<div className='space-y-4'>
					<div>
						<label htmlFor='customerName' className='block text-sm font-medium text-gray-700 mb-1'>
							Full Name *
						</label>
						<input
							type='text'
							id='customerName'
							{...register('customerName', { required: 'Full name is required' })}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							placeholder='John Doe'
						/>
						{errors.customerName && <p className='mt-1 text-sm text-red-600'>{errors.customerName.message}</p>}
					</div>

					<div>
						<label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-1'>
							Street Address *
						</label>
						<input
							type='text'
							id='address'
							{...register('address', { required: 'Address is required' })}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							placeholder='123 Main Street'
						/>
						{errors.address && <p className='mt-1 text-sm text-red-600'>{errors.address.message}</p>}
					</div>

					<div>
						<label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700 mb-1'>
							Phone Number *
						</label>
						<input
							type='tel'
							id='phoneNumber'
							{...register('phoneNumber', {
								required: 'Phone number is required',
								minLength: {
									value: 10,
									message: 'Phone number must be at least 10 digits',
								},
							})}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							placeholder='+1 (555) 123-4567'
						/>
						{errors.phoneNumber && <p className='mt-1 text-sm text-red-600'>{errors.phoneNumber.message}</p>}
					</div>
				</div>
			</div>

			{createOrderMutation.error && <p className='mt-1 text-sm text-red-600'>{createOrderMutation.error.message}</p>}

			<button
				type='submit'
				disabled={createOrderMutation.isPending}
				className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors'>
				Place Order
			</button>
		</form>
	);
}
