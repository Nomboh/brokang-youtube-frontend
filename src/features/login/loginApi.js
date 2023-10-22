import agent from "../../app/agent"

export const loginApi = async (data) => {
	try {
		const response = await agent.Account.login(data)
		return response
	} catch (error) {
		console.log(error)
		throw error
	}
}
