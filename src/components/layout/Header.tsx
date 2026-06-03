'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
	const totalItems = useCartStore((state) => state.getTotalItems());

	return (
		<header className='bg-white shadow-md sticky top-0 z-50'>
			<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
				<Link href='/' className='flex items-center space-x-2'>
					<div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center'>
						<span className='text-white font-bold text-xl'>🍔</span>
					</div>
					<h1 className='text-2xl font-bold text-gray-800'>FoodieExpress</h1>
				</Link>

				<nav className='flex items-center space-x-6'>
					<Link href='/' className='text-gray-600 hover:text-orange-500 transition-colors font-medium'>
						Menu
					</Link>
					<Link href='/cart' className='relative flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors font-medium'>
						<ShoppingCart className='h-6 w-6' />
						<span>Cart</span>
						{totalItems > 0 && (
							<span className='absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
								{totalItems}
							</span>
						)}
					</Link>
				</nav>
			</div>
		</header>
	);
}
