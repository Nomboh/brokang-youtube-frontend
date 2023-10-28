import agent from "../agent"

export const likeProduct = async (productId) => {
	try {
		return await agent.Like.likeProducts(productId)
	} catch (error) {
		throw error
	}
}

export const unlikeProduct = async (productId) => {
	try {
		return await agent.Like.unlikeProducts(productId)
	} catch (error) {
		throw error
	}
}

export const getUserLikes = async () => {
	try {
		const res = await agent.Like.getUserLikes()
		return res.likes
	} catch (error) {
		throw error
	}
}
