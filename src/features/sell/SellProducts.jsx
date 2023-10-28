import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useOutletContext } from "react-router-dom"
import SellWrapper from "./SellWrapper"

function SellProducts() {
	const { user } = useOutletContext()
	return (
		<div>
			<Header user={user} />
			<SellWrapper />
			<Footer />
		</div>
	)
}

export default SellProducts
