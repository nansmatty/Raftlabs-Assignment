import { apiHandler } from '@/lib/api-handler';
import { ApiError } from '@/lib/ApiError';
import { connectDB } from '@/lib/db';
import { MenuItem } from '@/models/menu.model';
import { Order } from '@/models/order.model';
import { createOrderSchema } from '@/schemas/order.schema';

export async function GET() {
	return apiHandler(async () => {
		await connectDB();

		const orders = await Order.find().sort({ createdAt: -1 }).lean();

		return orders;
	});
}

export async function POST(request: Request) {
	return apiHandler(async () => {
		await connectDB();

		const body = await request.json();
		const validatedData = createOrderSchema.parse(body);

		const menuItemIds = validatedData.items.map((item) => item.menuItemId);

		const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } }).lean();

		if (menuItems.length !== menuItemIds.length) {
			throw new ApiError(400, 'One or more menu items not found');
		}

		const orderItems = validatedData.items.map((orderItem) => {
			const menuItem = menuItems.find((mi) => mi._id.toString() === orderItem.menuItemId);

			if (!menuItem) {
				throw new ApiError(400, `Menu item with ID ${orderItem.menuItemId} not found`);
			}

			return {
				menuItemId: orderItem.menuItemId,
				name: menuItem!.name,
				quantity: orderItem.quantity,
				priceAtPurchase: menuItem!.price,
			};
		});

		const totalAmount = orderItems.reduce((total, item) => total + item.quantity * item.priceAtPurchase, 0);

		const order = await Order.create({
			customerName: validatedData.customerName,
			address: validatedData.address,
			phoneNumber: validatedData.phoneNumber,
			items: orderItems,
			totalAmount,
			status: 'ORDER_RECEIVED',
		});

		return order;
	});
}
