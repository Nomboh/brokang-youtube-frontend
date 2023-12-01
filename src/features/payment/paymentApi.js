import agent from "../../app/agent"

export const getPaymentIntent = async (data) => {
	try {
		const res = await agent.Payment.getPaymentIntent(data)
		return res.client_secret
	} catch (error) {
		throw error
	}
}
