import React from "react"

function CheckoutSummary({ originalPrice, shippingFee, discount, totalPrice }) {
	return (
		<div className=" p-3">
			<h1 className=" mt-6 text-2xl  font-bold">Checkout Summary</h1>
			<div className="mt-4">
				<div className=" flex items-center justify-between">
					<p>Subtotal:</p>
					<p className=" text-xl font-semibold">{originalPrice}</p>
				</div>
				<br />
				<div className=" flex items-center justify-between">
					<p>Shipping:</p>
					<p className=" text-xl font-semibold">{shippingFee}</p>
				</div>
				<br />
				<div className=" flex items-center justify-between">
					<p>discount:</p>
					<p className=" text-xl font-semibold">{discount ? discount : "-"}</p>
				</div>
				<div className=" divider"></div>
				<div className=" flex items-center justify-between">
					<p className=" font-semibold text-xl">total:</p>
					<p className=" text-right text-xl font-semibold">{totalPrice}</p>
				</div>
			</div>
		</div>
	)
}

export default CheckoutSummary
