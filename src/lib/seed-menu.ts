import { menuSeedData } from '@/data/menu.data';
import { MenuItem } from '@/models/menu.model';

export async function seedMenuIfEmpty() {
	const count = await MenuItem.countDocuments();

	if (count > 0) {
		return {
			seeded: false,
			insertedCount: 0,
		};
	}

	const insertedMenuItems = await MenuItem.insertMany(menuSeedData);

	return {
		seeded: true,
		insertedCount: insertedMenuItems.length,
	};
}
