import { Schema, model, models } from 'mongoose';

const menuItemSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		description: {
			type: String,
			required: true,
			trim: true,
		},

		imageUrl: {
			type: String,
			required: true,
		},

		price: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{
		timestamps: true,
	},
);

export const MenuItem = models.MenuItem || model('MenuItem', menuItemSchema);
