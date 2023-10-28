import { Outlet } from "react-router-dom"
import "./App.css"
import { useLikes } from "./app/hooks/like"

function App() {
	const { likes } = useLikes()

	if (likes) {
		localStorage.setItem("likes", JSON.stringify(likes))
	}
	return (
		<div className="containerCustom">
			<Outlet />
		</div>
	)
}

export default App
