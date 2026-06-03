import { IMenuItem } from '@/types/menu';

export async function fetchMenuItems(): Promise<IMenuItem[]> {
	const response = await fetch('/api/menu');

	if (!response.ok) {
		throw new Error('Failed to fetch menu items');
	}

	const { data } = await response.json();

	return data;
}
