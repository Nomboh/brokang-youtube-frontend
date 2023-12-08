import React from "react"
import { Link } from "react-router-dom"

function NotFound() {
	return (
		<div className=" section">
			<h1 className=" mt-10 text-2xl font-semibold">
				Opps - we could find what you are looking for
			</h1>

			<h1 className=" text-5xl font-semibold my-10">Sorry 😭😭😭😭</h1>
			<div className="divider"></div>

			<Link to={"/"} replace className="btn btn-neutral">
				Go back to shop
			</Link>
		</div>
	)
}

export default NotFound
