import agent from "../agent"

export const loadUser = async () => {
	try {
		const response = await agent.Account.loadUser()
		return response.user
	} catch (error) {
		throw error
	}
}
