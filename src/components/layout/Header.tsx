'use client';

import Link from 'next/link';
import { useCart } from '@/store/CartContext';

export default function Header() {
	const { getTotalItems } = useCart();
	const totalItems = getTotalItems();

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
						<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
							/>
						</svg>
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
