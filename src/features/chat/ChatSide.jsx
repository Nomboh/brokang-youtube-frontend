import React from "react"
import Spinner from "../../components/Spinner"
import { otherUser } from "./chatUtils"

function ChatSide({
	user,
	loadingConversation,
	conversations,
	conversationId,
	handleConversationClick,
}) {
	if (loadingConversation) return <Spinner />

	return (
		<div
			className={`800px:w-2/6 bg-white overflow-y-scroll border-2 h-[600px] text-left`}>
			{conversations?.map((conversation) => {
				return (
					<div
						onClick={() => handleConversationClick(conversation._id)}
						key={conversation._id}
						className={` ${
							conversation?._id === conversationId ? "bg-slate-100" : ""
						} border-b hover:bg-slate-100 h-28 w-full p-4 flex gap-4 items-center cursor-pointer`}>
						<div className={`avatar offline`}>
							<div className="h-14 w-14 rounded-full">
								<img
									src={otherUser(conversation, user)?.photo}
									className="  object-cover"
									alt={"name"}
								/>
							</div>
						</div>

						<div className=" flex flex-col flex-1 gap-2">
							<div className="text-xl font-bold">
								{otherUser(conversation, user).storename}
							</div>
							<div className="text-sm flex gap-2 text-gray-400">
								<p className=" font-bold text-gray-950">
									{conversation?.lastMessageId === user?._id
										? "You: "
										: otherUser(conversation, user).storename}
								</p>
								<p>{conversation?.lastMessage}</p>
							</div>
						</div>

						<div className="text-sm h-6 w-6 rounded-full bg-accent flex items-center justify-center text-primary-content">
							<span>2</span>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default ChatSide
