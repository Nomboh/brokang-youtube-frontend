import agent from "../../app/agent"

export const createProduct = async (data) => {
	try {
		const res = await agent.Product.createProduct(data)
		return res.product
	} catch (error) {
		throw error
	}
}

export const editProduct = async (data) => {
	try {
		const res = await agent.Product.editProduct(data)
		return res.product
	} catch (error) {
		throw error
	}
}
