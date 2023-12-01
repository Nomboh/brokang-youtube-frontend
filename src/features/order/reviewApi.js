import agent from "../../app/agent"

export const createReview = async (data) => {
	try {
		const res = await agent.Review.createReview(data)
		return res.review
	} catch (error) {
		throw error
	}
}

export const getSellerReviews = async (sellerId) => {
	try {
		const res = await agent.Review.getSellersReviews(sellerId)
		return res.reviews
	} catch (error) {
		throw error
	}
}
