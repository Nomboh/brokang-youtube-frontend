import React, { useEffect, useRef } from "react"
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

function Chat() {
	const scrollRef = useRef(null)
	const { user } = useOutletContext()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const [text, setText] = React.useState("")

	const conversationId = searchParams.get("id")

	const { conversations, loadingConversation } = useUserConversation()
	const { conversation } = useCurrentChat(conversationId)
	const { isCreating, message } = useCreateMessage()
	const { loadingMessage, messages } = useUserMessage(conversationId)

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

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
				onSuccess: () => {
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
	}

	const chatPartner = otherUser(conversation, user)

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
