import agent from "../../app/agent"

export const getseller = async (sellerId) => {
	try {
		return agent.Account.getSeller(sellerId)
	} catch (error) {
		throw error
	}
}

export const createSubscription = async (sellerId) => {
	try {
		return agent.Subscription.subscribe(sellerId)
	} catch (error) {
		throw error
	}
}

export const unsubscribe = async (sellerId) => {
	try {
		return agent.Subscription.unsubscribe(sellerId)
	} catch (error) {
		throw error
	}
}

export const getAllSubscriptions = async (sellerId) => {
	try {
		return agent.Subscription.getUserSubscriptions(sellerId)
	} catch (error) {
		throw error
	}
}

export const checkSubscription = async (sellerId) => {
	try {
		return agent.Subscription.checkSubscription(sellerId)
	} catch (error) {
		throw error
	}
}
