import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ProfileSidebar from "./ProfileSidebar"
import ProfileContain from "./ProfileContain"
import { useOutletContext } from "react-router-dom"

function ProfilePage() {
	const { user } = useOutletContext()

	return (
		<div>
			<Header user={user} />
			<div className="section normalFlexResponsive">
				<div className=" w-full 800px:w-3/12 self-start mb-14 800px:mr-12 800px:mb-0">
					<ProfileSidebar user={user && user} />
				</div>
				<div className=" w-full self-start 800px:w-9/12">
					<ProfileContain user={user && user} />
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default ProfilePage
