import MenuCard from '@/components/menu/MenuCard';
import { mockMenuItems } from '@/data/mock-menu';

export default function Home() {
	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='bg-linear-to-r from-orange-500 to-orange-600 text-white py-16'>
				<div className='container mx-auto px-4'>
					<div className='max-w-2xl'>
						<h1 className='text-4xl md:text-5xl font-bold mb-4'>Delicious Food, Delivered Fast</h1>
						<p className='text-lg md:text-xl text-orange-100'>
							Order your favorite meals from the best restaurants in town. Fresh, hot, and delivered to your door in minutes.
						</p>
					</div>
				</div>
			</section>

			{/* Menu Section */}
			<section className='container mx-auto px-4 py-12'>
				<h2 className='text-3xl font-bold text-gray-400 mb-8'>Our Menu</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{mockMenuItems.map((item) => (
						<MenuCard key={item.name} item={item} />
					))}
				</div>
			</section>
		</div>
	);
}
