import agent from "../../app/agent"

export const activateUser = async (data) => {
	try {
		return await agent.Account.activateUser(data)
	} catch (err) {
		throw err
	}
}
