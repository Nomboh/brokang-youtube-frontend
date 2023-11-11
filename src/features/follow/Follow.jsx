import React from "react"
import Header from "../../components/Header"
import { Outlet, useOutletContext } from "react-router-dom"
import Footer from "../../components/Footer"
import ProfileSidebar from "../profile/ProfileSidebar"

function Follow() {
	const { user } = useOutletContext()
	return (
		<div>
			<Header user={user} />
			<div className=" normalFlexResponsive section">
				<ProfileSidebar user={user} />
				<div className=" w-full self-start 800px:w-9/12">
					<Outlet context={{}} />
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Follow
