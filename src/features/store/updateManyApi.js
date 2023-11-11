import agent from "../../app/agent"

export const updateMany = async (data) => {
	try {
		return await agent.Product.editManyProducts(data)
	} catch (error) {
		throw error
	}
}
