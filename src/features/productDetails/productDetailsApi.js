import agent from "../../app/agent"

export const productDetail = async (id) => {
	try {
		const res = await agent.Product.getProductsDetails(id)
		return res.product
	} catch (err) {
		throw err
	}
}

export const sellerOtherItems = async (userId) => {
	try {
		const res = await agent.Product.getOtherSellerItems(userId)
		return res.products
	} catch (err) {
		throw err
	}
}

export const getRecommendedProducts = async (category, userId) => {
	try {
		const params = new URLSearchParams()
		params.append("user[ne]", userId)
		const res = await agent.Product.getRecommendedProducts(category, params)
		return res.products
	} catch (err) {
		throw err
	}
}
