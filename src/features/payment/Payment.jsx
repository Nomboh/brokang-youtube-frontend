import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useNavigate, useOutletContext } from "react-router-dom"
import CheckoutSteeps from "../checkout/CheckoutSteeps"
import CheckoutSummary from "../checkout/CheckoutSummary"
import { usePaymentIntent } from "./payment"
import {
	useStripe,
	useElements,
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
} from "@stripe/react-stripe-js"
import toast from "react-hot-toast"
import { useCreateOrder } from "./order"

function Payment() {
	const { user } = useOutletContext()
	const orderItems = JSON.parse(localStorage.getItem("orderItems"))

	const {
		address,
		name,
		totalPrice,
		discount,
		shippingFee,
		originalPrice,
		productId,
	} = orderItems

	const stripe = useStripe()
	const elements = useElements()

	const [userName, setUserName] = useState(name)

	const navigate = useNavigate()

	const { mutate, clientSecret } = usePaymentIntent()
	const { isOrdering, order } = useCreateOrder()

	useEffect(() => {
		if (totalPrice) {
			mutate({ amount: totalPrice * 100 })
		}
	}, [totalPrice])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!stripe || !elements) return

		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardNumberElement),
				billing_details: {
					name: userName,
				},
			},
		})

		if (result.error) {
			toast.error(result.error.status)
		} else {
			let paymentInfo = {}
			if (result.paymentIntent.status === "succeeded") {
				paymentInfo = {
					id: result.paymentIntent.id,
					status: result.paymentIntent.status,
					type: "Credit Card",
				}

				order(
					{
						paymentInfo,
						shippingAddress: address,
						product: productId,
						user: user?._id,
						totalPrice,
					},
					{
						onSuccess: () => {
							navigate("/success")
							localStorage.setItem("orderItems", "")
						},
					}
				)
			}
		}
	}

	return (
		<div>
			<Header user={user} />
			<div className=" mt-6 w-full flex item-center justify-center">
				<CheckoutSteeps active="payment" />
			</div>

			<div className=" mt-6 w-full flex gap-10">
				<div className=" w-9/12 shadow-lg rounded-lg p-4">
					<h1 className=" mb-4 text-xl font-bold">
						Pay with debit or credit cards
					</h1>

					<div className="">
						<form onSubmit={handleSubmit}>
							<div className=" flex gap-6 w-full flex-wrap ">
								<div className=" flex-col w-full max-w-sm flex gap-1">
									<label htmlFor="cardName">Card Name</label>
									<input
										type="text"
										name="cardNumber"
										id="cardNumber"
										onChange={(e) => setUserName(e.target.value)}
										defaultValue={user?.name}
										className=" input input-bordered w-full"
									/>
								</div>
								<div className=" flex-col w-full max-w-sm flex gap-1">
									<label htmlFor="cardName">Card Number</label>
									<CardNumberElement
										options={{
											classes: {
												focus: "elfocus",
											},
										}}
										className=" py-4 input input-bordered w-full"
									/>
								</div>
								<div className=" flex-col w-full max-w-sm flex gap-1">
									<label htmlFor="cardName">Expire Date</label>
									<CardExpiryElement
										options={{
											classes: {
												focus: "elfocus",
											},
										}}
										className=" py-4 input input-bordered w-full"
									/>
								</div>
								<div className=" flex-col w-full max-w-sm flex gap-1">
									<label htmlFor="cardName">Card CVC</label>
									<CardCvcElement
										options={{
											classes: {
												focus: "elfocus",
											},
										}}
										className=" py-4 input input-bordered w-full"
									/>
								</div>
							</div>

							<br />

							<input
								disabled={isOrdering}
								type="submit"
								value={"Submit Payment"}
								className=" btn btn-accent "
							/>
						</form>
					</div>
				</div>

				<div className=" w-3/12 shadow-lg rounded-lg p-2">
					<CheckoutSummary
						discount={discount}
						originalPrice={originalPrice}
						shippingFee={shippingFee}
						totalPrice={totalPrice}
					/>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default Payment
