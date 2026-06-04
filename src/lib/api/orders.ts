type CreateOrderPayload = {
	customerName: string;
	address: string;
	phoneNumber: string;
	items: {
		menuItemId: string;
		quantity: number;
	}[];
};

export async function createOrder(payload: CreateOrderPayload) {
	const response = await fetch('/api/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Failed to create order');
	}

	return response.json();
}

export const getOrderById = async (orderId: string) => {
	const response = await fetch(`/api/orders/${orderId}`);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Failed to fetch order');
	}

	return response.json();
};
