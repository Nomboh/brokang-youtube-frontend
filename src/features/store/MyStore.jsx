import React from "react"
import Header from "../../components/Header"
import { useOutletContext } from "react-router-dom"
import StoreWrapper from "./StoreWrapper"
import Footer from "../../components/Footer"

function MyStore() {
	const { user } = useOutletContext()
	return (
		<div>
			<Header user={user} />
			<StoreWrapper user={user} />
			<Footer />
		</div>
	)
}

export default MyStore
