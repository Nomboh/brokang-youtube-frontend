import agent from "../../app/agent"

export async function createConversationApi(data) {
	const res = await agent.Chat.createConversation(data).catch((error) => {
		console.log(error)
		throw error
	})

	return res?.conversation
}

export async function getUserConversationsApi() {
	const res = await agent.Chat.getUsersConversation().catch((error) => {
		console.log(error)
		throw error
	})

	return res?.conversations
}

export async function getSingleConversationApi(id) {
	const res = await agent.Chat.getSingleConversation(id).catch((error) => {
		console.log(error)
		throw error
	})

	return res?.conversation
}

export async function createMessageApi(data) {
	const res = await agent.Chat.createMessage(data).catch((error) => {
		console.log(error)
		throw error
	})

	return res?.message
}

export async function getUserMessagesApi(conversationId) {
	const res = await agent.Chat.getUsersMessage(conversationId).catch(
		(error) => {
			console.log(error)
			throw error
		}
	)

	return res?.messages
}
