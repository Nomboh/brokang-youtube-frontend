import agent from "../../app/agent"

export const forgotPassword = async (data) => {
	try {
		const response = await agent.Account.forgotPassword(data)
		return response
	} catch (error) {
		console.log(error)
		throw error
	}
}
