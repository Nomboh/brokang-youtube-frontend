import agent from "../../app/agent"

export const getAllProducts = async (pageNumber, filterData) => {
	const params = new URLSearchParams()

	params.append("page", pageNumber.toString())
	params.append("limit", "4")
	try {
		return await agent.Product.getAllProducts(params)
	} catch (error) {
		throw error
	}
}
