import agent from "../../app/agent"

export const resetPassword = async (data) => {
	try {
		const response = await agent.Account.resetPassword(data)
		return response
	} catch (error) {
		console.log(error)
		throw error
	}
}
