'use client';

import { IMenuItem } from '@/types/menu';
import { useCart } from '@/store/CartContext';
import { useState } from 'react';

interface MenuCardProps {
	item: IMenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
	const { addItem } = useCart();
	const [isAdded, setIsAdded] = useState(false);

	const handleAddToCart = () => {
		addItem(item);
		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 1000);
	};

	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'>
			<div className='relative h-48 overflow-hidden'>
				<img src={item.imageUrl} alt={item.name} className='w-full h-full object-cover' />
			</div>
			<div className='p-4'>
				<h3 className='text-lg font-semibold text-gray-800 mb-2'>{item.name}</h3>
				<p className='text-gray-600 text-sm mb-4 line-clamp-2'>{item.description}</p>
				<div className='flex items-center justify-between'>
					<span className='text-xl font-bold text-orange-500'>${item.price.toFixed(2)}</span>
					<button
						onClick={handleAddToCart}
						className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
							isAdded ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
						}`}>
						{isAdded ? (
							<span className='flex items-center space-x-1'>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									/>
								</svg>
								<span>Added</span>
							</span>
						) : (
							'Add to Cart'
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
