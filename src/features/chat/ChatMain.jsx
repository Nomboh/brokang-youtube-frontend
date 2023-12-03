import React from "react"
import { BiSolidChevronRight } from "react-icons/bi"
import { MdOutlineAttachFile } from "react-icons/md"
import { format } from "timeago.js"
import Spinner from "../../components/Spinner"

function ChatMain(props) {
	const {
		user,
		chatPartner,
		scrollRef,
		handleUploadImage,
		handleSubmitMsg,
		text,
		setText,
		isCreating,
		messages,
		loadingMessage,
	} = props

	if (loadingMessage) return <Spinner />
	console.log(messages)
	return (
		<div className=" 800px:w-4/6 w-full h-[600px] border-2 text-left">
			{/* Chat header */}
			<div className="w-full px-5 h-28 flex gap-4 items-center  border-b">
				<img
					src={chatPartner?.photo}
					className=" cursor-pointer rounded-full object-cover h-16 w-16"
					alt={chatPartner?.name}
				/>

				<div className="text-left cursor-pointer">
					<p className=" font-bold text-xl">{chatPartner?.storename}</p>
					<p className=" mt-2">{chatPartner?.numProducts} items for sale</p>
				</div>
			</div>

			{/* Chat body */}
			<div className=" h-[389px] overflow-y-scroll p-5">
				{messages?.map((message) => {
					return message?.senderId !== user?._id ? (
						<div ref={scrollRef} key={message._id} className="chat chat-start">
							<div className="chat-image avatar">
								<div className="w-10 rounded-full">
									<img src={chatPartner?.photo} />
								</div>
							</div>
							<div className="chat-header">
								{chatPartner?.name.split(" ")[0]}{" "}
								<p className="text-gray-400">{format(message.createdAt)}</p>
							</div>
							{message?.text ? (
								<div className="chat-bubble chat-bubble-accent">
									{message.text}
								</div>
							) : (
								<div className="chat-bubble px-2 pb-1 pt-2 chat-bubble-accent">
									<div className="avatar">
										<div className="w-44 rounded">
											<img src={message?.image} />
										</div>
									</div>
								</div>
							)}
						</div>
					) : (
						<div ref={scrollRef} key={message._id} className="chat chat-end">
							<div className="chat-header">
								<p className="text-gray-400">{format(message.createdAt)}</p>
							</div>
							{message?.text ? (
								<div className="chat-bubble">{message.text}</div>
							) : (
								<div className="chat-bubble px-2 py-1 ">
									<div className="avatar">
										<div className="w-44 rounded">
											<img src={message?.image} />
										</div>
									</div>
								</div>
							)}
						</div>
					)
				})}
			</div>

			{/* Chat Footer */}
			<div className="w-full h-24 border-t">
				<div className="p-5 flex  items-center gap-4 w-full">
					<input
						type="text"
						placeholder="Please write a message here"
						className="input w-3/5 800px:w-3/4"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<div className=" justify-end gap-2 flex items-center  w-2/5 800px:w-1/4">
						<input
							onChange={handleUploadImage}
							hidden
							type="file"
							name="image"
							id="image"
						/>
						<label htmlFor="image" className="btn btn-square btn-outline">
							<MdOutlineAttachFile className="w-6 h-6" />
						</label>
						<button
							disabled={isCreating}
							onClick={handleSubmitMsg}
							className="btn float-right btn-primary">
							send
							<BiSolidChevronRight className="w-6 h-6 hidden 800px:block" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatMain
