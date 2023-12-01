import agent from "../../app/agent"

export const createOrder = async (data) => {
	try {
		const res = await agent.Order.createOrder(data)
		return res.order
	} catch (error) {
		throw error
	}
}

export const getUserOrders = async () => {
	try {
		const res = await agent.Order.getUserOrder()
		return res.orders
	} catch (error) {
		throw error
	}
}

export const getUserOrder = async (id) => {
	try {
		const res = await agent.Order.getOrder(id)
		return res.order
	} catch (error) {
		throw error
	}
}

export const getSellerOrder = async () => {
	try {
		const res = await agent.Order.getSellerOrders()
		return res.orders
	} catch (error) {
		throw error
	}
}

export const updateOrder = async (data, id) => {
	try {
		const res = agent.Order.updateOrderStatus(data, id)
		return res.order
	} catch (error) {
		throw error
	}
}
