import agent from "../agent"

export const logoutUser = async () => {
	try {
		return await agent.Account.logoutUser()
	} catch (error) {
		throw error
	}
}
