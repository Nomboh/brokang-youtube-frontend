import React, { useEffect, useRef, useContext } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import {
	useNavigate,
	useOutletContext,
	useSearchParams,
} from "react-router-dom"
import ChatMain from "./ChatMain"
import ChatSide from "./ChatSide"
import {
	useCreateMessage,
	useCurrentChat,
	useUserConversation,
	useUserMessage,
} from "./chat"
import { otherUser } from "./chatUtils"
import { cloudinaryUpload } from "../../utils/cloudinaryUpload"
import { useQueryClient } from "@tanstack/react-query"
import { NotificationContext } from "../../app/context/NotificationContext"

function Chat() {
	const scrollRef = useRef(null)
	const { user, socketId, onlineUsers } = useOutletContext()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const [text, setText] = React.useState("")

	const { addNotification, notifications, removeNotification } =
		useContext(NotificationContext)

	const conversationId = searchParams.get("id")

	const queryClient = useQueryClient()

	console.log(notifications)

	const { conversations, loadingConversation } = useUserConversation()
	const { conversation } = useCurrentChat(conversationId)
	const { isCreating, message } = useCreateMessage()
	const { loadingMessage, messages } = useUserMessage(conversationId)

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	useEffect(() => {
		if (socketId) {
			socketId.on("getMessage", (data) => {
				const newMessage = {
					_id: data?.id,
					text: data?.text,
					image: data?.image,
					senderId: data?.senderId,
					conversationId: data?.conversationId,
					createdAt: Date.now(),
				}

				if (newMessage && conversationId === data?.conversationId) {
					queryClient.setQueryData(["messages", conversationId], (oldData) => {
						return [...oldData, newMessage]
					})
				}

				queryClient.refetchQueries(["conversations"])
			})
		}

		return () => {
			socketId.off("getMessage")
		}
	}, [socketId, queryClient, conversationId])

	useEffect(() => {
		if (socketId) {
			socketId.on("getNotifications", (data) => {
				const sender = conversation?.members.find(
					(m) => m._id === data?.senderId
				)

				if (!sender && data) {
					addNotification(data)
				}
			})
		}

		return () => {
			socketId.off("getNotifications")
		}
	}, [socketId, conversation])

	const messagesFactory = (image) => {
		const msg = { senderId: user?._id, conversationId }
		if (image) {
			msg.image = image
		}
		if (text) {
			msg.text = text
		}

		if (msg?.text || msg?.image) {
			message(msg, {
				onSuccess: (data) => {
					// senderId, receiverId, text, image, id, conversationId, senderName
					socketId.emit("sendMessage", {
						senderId: user?._id,
						receiverId: otherUser(conversation, user)?._id,
						text: data?.text,
						image: data?.image,
						id: data?._id,
						conversationId: data?.conversationId,
						senderName: user?.storename,
					})
					setText("")
				},
			})
		}
	}

	const handleUploadImage = async (e) => {
		const files = e.target.files
		const uploadImages = await cloudinaryUpload({
			files: [files[0]],
			uploadPreset: "profile",
			width: 300,
			height: 300,
		})

		const image = uploadImages[0]

		if (image) {
			messagesFactory(image)
		}
	}

	const handleSubmitMsg = (e) => {
		e.preventDefault()
		messagesFactory()
	}

	const handleConversationClick = (id) => {
		setSearchParams(`id=${id}`)
		navigate(`/chat?id=${id}`)
		removeNotification(id)
	}

	const chatPartner = otherUser(conversation, user)

	const checkOnlineUsers = (chat) => {
		return onlineUsers?.find((ou) => ou.userId === otherUser(chat, user)?._id)
	}

	return (
		<div>
			<Header user={user} />
			<div className=" flex section w-full flex-col 800px:flex-row relative items-start gap-4">
				<ChatSide
					conversationId={conversationId}
					loadingConversation={loadingConversation}
					conversations={conversations}
					handleConversationClick={handleConversationClick}
					user={user}
					checkOnlineUsers={checkOnlineUsers}
					notifications={notifications}
				/>
				<ChatMain
					handleSubmitMsg={handleSubmitMsg}
					handleUploadImage={handleUploadImage}
					chatPartner={chatPartner}
					user={user}
					scrollRef={scrollRef}
					text={text}
					setText={setText}
					messages={messages}
					loadingMessage={loadingMessage}
					isCreating={isCreating}
				/>
			</div>
			<Footer />
		</div>
	)
}

export default Chat
