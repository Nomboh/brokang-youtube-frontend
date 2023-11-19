import agent from "../../app/agent"

export async function AddAddress(data) {
	const response = await agent.Account.addUserAddress(data).catch((err) => {
		console.log(err)
		throw err
	})
	return response
}

export async function RemoveAddress(addressId) {
	const response = await agent.Account.removeUserAddress(addressId).catch(
		(err) => {
			console.log(err)
			throw err
		}
	)
	return response
}
