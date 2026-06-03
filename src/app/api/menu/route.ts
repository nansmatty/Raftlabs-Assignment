import { apiHandler } from '@/lib/api-handler';
import { connectDB } from '@/lib/db';
import { seedMenuIfEmpty } from '@/lib/seed-menu';
import { MenuItem } from '@/models/menu.model';

export async function GET() {
	return apiHandler(async () => {
		await connectDB();

		await seedMenuIfEmpty();

		const menuItems = await MenuItem.find().sort({ createdAt: 1 }).lean();

		return menuItems;
	});
}
