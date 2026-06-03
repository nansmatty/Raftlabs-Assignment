'use client';

import MenuCard from '@/components/menu/MenuCard';
import { mockMenuItems } from '@/data/mock-menu';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/store/CartContext';
import { useState } from 'react';
import { Search, Clock, Star, TrendingUp } from 'lucide-react';

const categories = ['All', 'Pizza', 'Burgers', 'Salads', 'Asian', 'Desserts', 'Seafood'];

export default function Home() {
	const { getTotalItems } = useCart();
	const [selectedCategory, setSelectedCategory] = useState('All');
	const totalItems = getTotalItems();

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white relative overflow-hidden'>
				<div className='absolute inset-0 bg-black/10'></div>
				<div className='container mx-auto px-4 py-12 md:py-20 relative z-10'>
					<div className='max-w-3xl'>
						<div className='inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6'>
							<Clock className='h-4 w-4' />
							<span className='text-sm font-medium'>Delivery in 30 minutes</span>
						</div>
						<h1 className='text-5xl md:text-6xl font-extrabold mb-4 leading-tight'>
							Your favorite food,
							<br />
							delivered fast
						</h1>
						<p className='text-xl text-orange-50 mb-8 max-w-2xl'>
							Discover the best meals from top-rated restaurants. Fresh ingredients, quick delivery, unforgettable taste.
						</p>

						{/* Search Bar */}
						<div className='bg-white rounded-2xl shadow-2xl p-2 max-w-2xl'>
							<div className='flex items-center'>
								<Search className='h-5 w-5 text-gray-400 ml-4' />
								<input
									type='text'
									placeholder='Search for dishes, cuisines, or restaurants...'
									className='flex-1 px-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent'
								/>
								<button className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors'>Search</button>
							</div>
						</div>

						{/* Stats */}
						<div className='grid grid-cols-3 gap-6 mt-10 max-w-xl'>
							<div>
								<div className='flex items-center space-x-2 mb-1'>
									<Star className='h-5 w-5 fill-yellow-300 text-yellow-300' />
									<span className='text-2xl font-bold'>4.8</span>
								</div>
								<p className='text-sm text-orange-100'>Average Rating</p>
							</div>
							<div>
								<div className='flex items-center space-x-2 mb-1'>
									<TrendingUp className='h-5 w-5' />
									<span className='text-2xl font-bold'>1000+</span>
								</div>
								<p className='text-sm text-orange-100'>Orders Today</p>
							</div>
							<div>
								<div className='mb-1'>
									<span className='text-2xl font-bold'>30min</span>
								</div>
								<p className='text-sm text-orange-100'>Avg Delivery</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className='bg-white border-b sticky top-16 z-40 shadow-sm'>
				<div className='container mx-auto px-4 py-5'>
					<div className='flex items-center space-x-3 overflow-x-auto scrollbar-hide'>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${
									selectedCategory === category ? 'bg-orange-500 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}>
								{category}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Menu Section with Floating Cart */}
			<section className='container mx-auto px-4 py-10'>
				<div className='flex items-center justify-between mb-8'>
					<div>
						<h2 className='text-3xl font-bold text-gray-900 mb-2'>Popular Dishes</h2>
						<p className='text-gray-600'>Handpicked favorites loved by our customers</p>
					</div>
				</div>

				<div className='flex gap-8'>
					{/* Menu Grid */}
					<div className='flex-1'>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
							{mockMenuItems.map((item) => (
								<MenuCard key={item.name} item={item} />
							))}
						</div>
					</div>

					{/* Floating Cart Summary - Desktop Only */}
					{totalItems > 0 && (
						<div className='hidden lg:block w-80 shrink-0'>
							<div className='sticky top-32'>
								<CartSummary />
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
