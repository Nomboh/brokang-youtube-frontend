import React, { useContext, useEffect } from "react"
import { BsChatDots } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import { useLogout } from "../app/hooks/logoutUser"
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center"
import { css } from "@emotion/react"
import { useUserConversation } from "../features/chat/chat"
import toast from "react-hot-toast"
import { NotificationContext } from "../app/context/NotificationContext"
import { format } from "timeago.js"
import { useOutletContext } from "react-router-dom"

function Header({ user }) {
	const { logout } = useLogout()
	const [q, setQ] = React.useState("")
	const navigate = useNavigate()

	const { socketId } = useOutletContext()

	const { notifications, removeNotification, addNotification } =
		useContext(NotificationContext)

	const { conversations } = useUserConversation()

	useEffect(() => {
		if (socketId) {
			socketId.on("getNotifications", (data) => {
				if (data) {
					addNotification(data)
				}
			})
		}

		return () => {
			socketId.off("getNotifications")
		}
	}, [socketId])

	const handleLogout = (e) => {
		e.preventDefault()
		logout()
	}

	const navigateToProduct = (message) => {
		window.location.href = `${message.cta.data.url}`
	}

	const handleConversation = () => {
		if (conversations.length > 0) {
			navigate(`/chat?id=${conversations[0]._id}`)
		} else {
			toast.error(
				"You have no conversation yet, start a conversation with a seller"
			)
		}
	}

	const handleChatNotification = (id) => {
		navigate(`/chat?id=${id}`)
		removeNotification(id)
	}

	return (
		<div>
			{/* nav up bar */}
			<div className="navbar bg-base-100">
				{/* logo */}
				<Link to={"/"} className="flex-1">
					<img
						src="https://res.cloudinary.com/queentech/image/upload/v1692021184/profile/brokang1_1_zmaurb.svg"
						alt="logo"
						className="w-20 h-20"
					/>
				</Link>
				<div className="flex-none gap-8">
					{/* notification */}

					<NovuProvider
						subscriberId={user?._id}
						applicationIdentifier={import.meta.env.VITE_NOVUS_KEY}
						styles={{
							notifications: {
								listItem: {
									unread: css({
										"::before": {
											background: `linear-gradient(135deg, #37cdbe 0%, #37cdbe 100%)`,
										},
									}),
								},
							},
							bellButton: {
								root: {
									svg: {
										color: "#2e2e3a",
									},
								},
								dot: {
									rect: {
										fill: "#f97316 ",
									},
								},
							},

							header: {
								title: {
									"+div": {
										background: `linear-gradient(135deg, #37cdbe 0%, #37cdbe 100%)`,
									},
								},
							},

							loader: {
								root: {
									stroke: "#37cdbe",
								},
							},
						}}>
						<PopoverNotificationCenter
							showUserPreferences={false}
							onNotificationClick={navigateToProduct}
							colorScheme="light">
							{({ unseenCount }) => (
								<NotificationBell unseenCount={unseenCount} />
							)}
						</PopoverNotificationCenter>
					</NovuProvider>

					{/* chat */}

					{notifications?.length > 0 ? (
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle">
								<div className="indicator">
									<BsChatDots size={25} />
									<span className="badge badge-primary badge-sm indicator-item">
										{notifications?.length}
									</span>
								</div>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-96">
								{notifications?.map((notification) => (
									<li>
										<p
											onClick={() =>
												handleChatNotification(notification?.conversationId)
											}
											className="flex items-center justify-between">
											<span>{notification.senderName} send you a message</span>
											<span className=" text-gray-400">
												{format(notification?.createdAt)}
											</span>
										</p>
									</li>
								))}
							</ul>
						</div>
					) : (
						<div className="cursor-pointer" onClick={handleConversation}>
							<BsChatDots size={25} />
						</div>
					)}

					{user ? (
						<div className="dropdown dropdown-end">
							<div className="flex items-center gap-1">
								<label
									tabIndex={0}
									className="btn btn-accent btn-circle avatar">
									<div className="w-10 rounded-full">
										<img src={user.photo} />
									</div>
								</label>
								<p className="text-bold">{user.storename}</p>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<Link to={"/profile"} className="justify-between">
										Profile
									</Link>
								</li>
								<li>
									<Link
										to={"/my-store?tab=" + "products"}
										className="justify-between">
										My Store
									</Link>
								</li>
								<li>
									<Link to={"/payment-management"} className="justify-between">
										Payment Management
									</Link>
								</li>
								<li>
									<Link to={"/address"} className="justify-between">
										Address
									</Link>
								</li>

								<li>
									<Link to={"/order"} className="justify-between">
										Orders
									</Link>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li onClick={handleLogout}>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					) : (
						<div>
							<Link to={"/login"} className="btn btn-ghost mr-1">
								Login
							</Link>
							<Link to={"/register"} className="btn btn-ghost">
								Register
							</Link>
						</div>
					)}
				</div>
			</div>

			{/* nab bellow bar */}
			<div className="800px:navbar hidden bg-base-100">
				<div className="navbar-start w-1/3">
					<a className="btn btn-accent normal-case text-xl">All Categories</a>
				</div>
				<div className="navbar-center flex-1 hidden lg:flex">
					<form className="relative w-full">
						<input
							className="input w-full input-bordered rounded-full"
							onChange={(e) => setQ(e.target.value)}
						/>

						<BiSearch
							className="text-gray-400 absolute top-3 right-3"
							size={25}
							onClick={() => {
								navigate(`/search?q=${q}`)
							}}
						/>
					</form>
				</div>
				<Link to={"/sell"} className="navbar-end w-1/3">
					<button className="btn btn-neutral">Sell your Items</button>
				</Link>
			</div>
		</div>
	)
}

export default Header
