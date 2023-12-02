import agent from "../../app/agent"

export const createWithrawalRequestApi = async (data) => {
	try {
		const res = await agent.Withdrawals.createWithdrawalRequest(data)
		return res.withdrawal
	} catch (error) {
		throw error
	}
}

export const addAccountApi = async (data) => {
	try {
		return await agent.Account.addAccount(data)
	} catch (error) {
		throw error
	}
}

export const removeAccountApi = async (id) => {
	try {
		return await agent.Account.removeAccount(id)
	} catch (error) {
		throw error
	}
}

export const updateWithdrawalApi = async (data, id) => {
	try {
		const res = await agent.Withdrawals.updateWithdrawalRequests(data, id)
		return res.withdrawal
	} catch (error) {
		throw error
	}
}

export const getWithdrawalRequestsApi = async () => {
	try {
		const res = await agent.Withdrawals.getWithdrawalRequests()
		return res.withdrawals
	} catch (error) {
		throw error
	}
}

export const getUserWithdrawalRequestsApi = async () => {
	try {
		const res = await agent.Withdrawals.getUserWithdrawalRequests()
		return res.withdrawals
	} catch (error) {
		throw error
	}
}
