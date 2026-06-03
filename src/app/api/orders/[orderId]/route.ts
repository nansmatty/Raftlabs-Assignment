import { apiHandler } from '@/lib/api-handler';
import { ApiError } from '@/lib/ApiError';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/order.model';
import mongoose from 'mongoose';

type RouteParams = {
	params: Promise<{ orderId: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
	return apiHandler(async () => {
		await connectDB();

		const { orderId } = await params;

		if (!mongoose.Types.ObjectId.isValid(orderId)) {
			throw new ApiError(400, 'Invalid order ID');
		}

		const order = await Order.findById(orderId).lean();

		if (!order) {
			throw new ApiError(404, 'Order not found');
		}

		return order;
	});
}
