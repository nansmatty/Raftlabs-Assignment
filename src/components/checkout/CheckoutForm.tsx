'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/CartContext';

export default function CheckoutForm() {
	const router = useRouter();
	const { clearCart } = useCart();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		zipCode: '',
		notes: '',
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		// Generate a fake order ID
		const orderId = `ORD-${Date.now()}`;

		// Clear cart and redirect to success page
		clearCart();
		router.push(`/order/${orderId}`);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div>
				<h2 className='text-xl font-bold text-gray-800 mb-4'>Delivery Information</h2>
				<div className='space-y-4'>
					<div>
						<label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
							Full Name *
						</label>
						<input
							type='text'
							id='name'
							name='name'
							required
							value={formData.name}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							placeholder='John Doe'
						/>
					</div>

					<div>
						<label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
							Email Address *
						</label>
						<input
							type='email'
							id='email'
							name='email'
							required
							value={formData.email}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							placeholder='john@example.com'
						/>
					</div>

					<div>
						<label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
							Phone Number *
						</label>
						<input
							type='tel'
							id='phone'
							name='phone'
							required
							value={formData.phone}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							placeholder='+1 (555) 123-4567'
						/>
					</div>

					<div>
						<label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-1'>
							Street Address *
						</label>
						<input
							type='text'
							id='address'
							name='address'
							required
							value={formData.address}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							placeholder='123 Main Street'
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label htmlFor='city' className='block text-sm font-medium text-gray-700 mb-1'>
								City *
							</label>
							<input
								type='text'
								id='city'
								name='city'
								required
								value={formData.city}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
								placeholder='New York'
							/>
						</div>
						<div>
							<label htmlFor='zipCode' className='block text-sm font-medium text-gray-700 mb-1'>
								ZIP Code *
							</label>
							<input
								type='text'
								id='zipCode'
								name='zipCode'
								required
								value={formData.zipCode}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
								placeholder='10001'
							/>
						</div>
					</div>

					<div>
						<label htmlFor='notes' className='block text-sm font-medium text-gray-700 mb-1'>
							Delivery Notes (Optional)
						</label>
						<textarea
							id='notes'
							name='notes'
							rows={3}
							value={formData.notes}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none'
							placeholder='Ring the doorbell, leave at door, etc.'
						/>
					</div>
				</div>
			</div>

			<button type='submit' className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors'>
				Place Order
			</button>
		</form>
	);
}
