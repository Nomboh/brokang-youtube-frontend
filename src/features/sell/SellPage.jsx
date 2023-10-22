import React from "react"
import Header from "../../components/Header"
import SellWrapper from "./SellWrapper.jsx"
import Footer from "../../components/Footer"
import { useOutletContext } from "react-router-dom"

function SellPage() {
	const { user } = useOutletContext()
	return (
		<div>
			<Header user={user} />
			<SellWrapper />
			<Footer />
		</div>
	)
}

export default SellPage
