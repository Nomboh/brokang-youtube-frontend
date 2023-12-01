import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useOutletContext } from "react-router-dom"
import CheckoutSteeps from "../checkout/CheckoutSteeps"

function Success() {
	const { user } = useOutletContext()
	return (
		<div>
			<Header user={user} />
			<div className=" w-full flex items-center justify-center">
				<CheckoutSteeps active={"success"} />
			</div>

			<div className=" text-center text-2xl w-full items-center justify-center mt-20 mb-10">
				Your order is successfull 🤩🤩🤩
			</div>
			<Footer />
		</div>
	)
}

export default Success
