import agent from "../../app/agent"

export const productDetails = async (id) => {
	try {
		const res = await agent.Product.detailProducts(id)
		return res.product
	} catch (error) {
		throw error
	}
}

export const getOtherSellerPdt = async (id) => {
	try {
		const res = await agent.Product.getSellerOtherPdt(id)
		return res.products
	} catch (error) {
		throw error
	}
}

export const getRecommendedPdt = async (category) => {
	try {
		const res = await agent.Product.getRecommendedPdt(category)
		return res.products
	} catch (error) {
		throw error
	}
}
