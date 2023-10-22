import { Outlet } from "react-router-dom"
import "./App.css"

function App() {
	return (
		<div className="containerCustom">
			<Outlet />
		</div>
	)
}

export default App
