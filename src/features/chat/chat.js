import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createConversationApi,
	createMessageApi,
	getSingleConversationApi,
	getUserConversationsApi,
	getUserMessagesApi,
} from "./chatApi"

export function useCreateConversation() {
	const {
		mutate: conversation,
		data: conversationData,
		isLoading: isCreating,
	} = useMutation({
		mutationFn: (data) => createConversationApi(data),
		mutationKey: ["create_conversation"],
	})

	return { conversation, conversationData, isCreating }
}

export function useUserConversation() {
	const { data: conversations, isLoading: loadingConversation } = useQuery({
		queryFn: getUserConversationsApi,
		queryKey: ["conversations"],
	})

	return { conversations, loadingConversation }
}

export function useCurrentChat(id) {
	const { data: conversation, isLoading: loadingChat } = useQuery({
		queryFn: () => getSingleConversationApi(id),
		queryKey: ["conversation", id],
		enabled: !!id,
	})

	return { conversation, loadingChat }
}

export function useCreateMessage() {
	const queryClient = useQueryClient()
	const {
		mutate: message,
		data: messageData,
		isLoading: isCreating,
	} = useMutation({
		mutationFn: (data) => createMessageApi(data),
		mutationKey: ["create_message"],
		onSuccess: (data) => {
			queryClient.invalidateQueries(["messages", data.conversationId])
			queryClient.invalidateQueries(["conversations"])
		},
	})

	return { message, messageData, isCreating }
}

export function useUserMessage(conversationId) {
	const { data: messages, isLoading: loadingMessage } = useQuery({
		queryFn: () => getUserMessagesApi(conversationId),
		queryKey: ["messages", conversationId],
		enabled: !!conversationId,
	})

	return { messages, loadingMessage }
}
