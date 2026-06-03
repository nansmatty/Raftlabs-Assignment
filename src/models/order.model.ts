import { Schema, model, models } from 'mongoose';

const orderSchema = new Schema(
	{
		customerName: String,
		address: String,
		phoneNumber: String,

		items: [
			{
				menuItemId: {
					type: Schema.Types.ObjectId,
					ref: 'MenuItem',
				},

				name: {
					type: String,
					required: true,
				},

				quantity: {
					type: Number,
					required: true,
					min: 1,
				},

				// Store the price at the time of purchase to handle price changes in the future
				priceAtPurchase: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],

		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},

		status: {
			type: String,
			enum: ['ORDER_RECEIVED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'],
			default: 'ORDER_RECEIVED',
		},
	},
	{
		timestamps: true,
	},
);

export const Order = models.Order || model('Order', orderSchema);
