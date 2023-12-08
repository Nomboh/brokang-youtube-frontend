import agent from "../../app/agent"

export const getAllProducts = async (pageNumber, filterData) => {
	const params = new URLSearchParams()

	params.append("page", pageNumber.toString())
	params.append("limit", filterData.limit)
	if (filterData?.query) params.append("title", filterData.query)
	if (filterData?.category) params.append("category", filterData.category)
	if (filterData?.brand) params.append("brand", filterData.brand)
	if (filterData?.price) {
		const { originalPrice, operator } = filterData.price

		switch (operator) {
			case "lt":
				params.append("originalPrice[lt]", originalPrice)
				break

			case "gt":
				params.append("originalPrice[gt]", originalPrice)
				break

			default:
				params.append("originalPrice", originalPrice)
				break
		}
	}

	if (filterData?.tags) {
		params.append("tags[in]", filterData.tags)
	}
	if (filterData?.user) params.append("user[ne]", filterData.user)
	try {
		return await agent.Product.getAllProducts(params)
	} catch (error) {
		throw error
	}
}

export const getProducts = async (filterData) => {
	const params = new URLSearchParams()

	params.append("page", filterData.pageNumber)
	params.append("limit", filterData.limit)
	if (filterData?.query) params.append("title", filterData.query)
	if (filterData?.category) params.append("category", filterData.category)
	if (filterData?.status) params.append("status", filterData.status)
	if (filterData?.user) params.append("user[eq]", filterData.user)

	try {
		return await agent.Product.getAllProducts(params)
	} catch (error) {
		throw error
	}
}
