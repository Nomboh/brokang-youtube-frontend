import agent from "../../app/agent"

export const createProductApi = async (data) => {
	try {
		return await agent.Product.createProduct(data)
	} catch (error) {
		throw error
	}
}
