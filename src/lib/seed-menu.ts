import { menuSeedData } from '@/data/menu.data';
import { MenuItem } from '@/models/menu.model';

export async function seedMenuIfEmpty() {
	const count = await MenuItem.countDocuments();

	if (count > 0) {
		return;
	}

	await MenuItem.insertMany(menuSeedData);

	console.log(`Seeded ${menuSeedData.length} menu items.`);
}
