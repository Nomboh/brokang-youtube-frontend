import { Outlet } from "react-router-dom"
import "./App.css"
import { useLikes } from "./app/hooks/like"
import socketIo from "socket.io-client"
import { useUser } from "./app/hooks/loadUser"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

const ENDPOINT = "https://yt-socket-brokang.onrender.com/"
const socketId = socketIo(ENDPOINT, { transports: ["websocket", "polling"] })

function App() {
	const { likes } = useLikes()
	const { user } = useUser()
	const [onlineUsers, setOnlineUsers] = useState([])

	useEffect(() => {
		if (user) {
			socketId.emit("addUser", user._id)

			socketId.on("getUsers", (users) => {
				setOnlineUsers(users)
			})
		}
	}, [user])

	if (likes) {
		localStorage.setItem("likes", JSON.stringify(likes))
	}
	return (
		<div className="containerCustom">
			<Link
				to={`/sell`}
				className=" 800px:hidden fixed top-1/2 z-50 right-4 btn btn-neutral rounded-full">
				<FaPlus size={25} />
				<span>Add</span>
			</Link>
			<Outlet context={{ onlineUsers, socketId }} />
		</div>
	)
}

export default App
