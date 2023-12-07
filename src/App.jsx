import { Outlet } from "react-router-dom"
import "./App.css"
import { useLikes } from "./app/hooks/like"
import socketIo from "socket.io-client"
import { useUser } from "./app/hooks/loadUser"
import { useEffect, useState } from "react"

const ENDPOINT = "http://localhost:5000"
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
			<Outlet context={{ onlineUsers, socketId }} />
		</div>
	)
}

export default App
