import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'FoodieExpress - Order Your Favorite Food',
	description: 'Fast and delicious food delivery at your doorstep',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col bg-gray-50'>
				<ReactQueryProvider>
					<Header />
					<main className='flex-1'>{children}</main>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
