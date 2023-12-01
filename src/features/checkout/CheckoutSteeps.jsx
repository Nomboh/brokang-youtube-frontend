import React from "react"

function CheckoutSteeps({ active }) {
	return (
		<ul className="steps steps-vertical 800px:steps-horizontal">
			<li
				className={`step w-32 ${
					active === "checkout" || active === "payment" || active === "success"
						? "step-accent"
						: ""
				} `}>
				Checkout
			</li>
			<li
				className={`step w-32 ${
					(active === "payment") | (active === "success") ? "step-accent" : ""
				} `}>
				Payment
			</li>
			<li className={`step w-32 ${active === "success" ? "step-accent" : ""} `}>
				Success
			</li>
		</ul>
	)
}

export default CheckoutSteeps
