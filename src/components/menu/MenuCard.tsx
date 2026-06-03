'use client';

import { IMenuItem } from '@/types/menu';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import { CircleCheck } from 'lucide-react';

interface MenuCardProps {
	item: IMenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
	const addItem = useCartStore((state) => state.addItem);
	const [isAdded, setIsAdded] = useState(false);

	const handleAddToCart = () => {
		addItem(item);
		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 1000);
	};

	return (
		<div className='bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:border-orange-200'>
			<div className='relative h-56 overflow-hidden bg-gray-100'>
				<img src={item.imageUrl} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
				<div className='absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full'>
					<span className='text-sm font-bold text-gray-900'>${item.price.toFixed(2)}</span>
				</div>
			</div>
			<div className='p-5'>
				<h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors'>{item.name}</h3>
				<p className='text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed'>{item.description}</p>
				<button
					onClick={handleAddToCart}
					className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
						isAdded
							? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
							: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40'
					}`}>
					{isAdded ? (
						<>
							<CircleCheck className='h-5 w-5' />
							<span>Added to Cart</span>
						</>
					) : (
						<span>Add to Cart</span>
					)}
				</button>
			</div>
		</div>
	);
}
