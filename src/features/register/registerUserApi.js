import agent from "../../app/agent"

export const registerUser = async (data) => {
	try {
		return await agent.Account.registerUser(data)
	} catch (err) {
		throw err
	}
}
