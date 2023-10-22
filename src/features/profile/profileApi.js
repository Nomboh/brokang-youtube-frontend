import agent from "../../app/agent"

export const profileUpdate = async (data) => {
	try {
		const res = await agent.Account.updateMe(data)
		return res
	} catch (error) {
		throw error
	}
}
export const profileUpdatePass = async (data) => {
	try {
		const res = await agent.Account.updatePassword(data)
		return res
	} catch (error) {
		throw error
	}
}
