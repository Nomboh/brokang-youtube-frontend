import React, { useState } from "react"
import Header from "../../components/Header"
import CheckoutSteeps from "./CheckoutSteeps"
import Footer from "../../components/Footer"
import {
	Link,
	useNavigate,
	useOutletContext,
	useSearchParams,
} from "react-router-dom"
import { useProduct } from "../productDetails/productDetail"
import CheckoutSummary from "./CheckoutSummary"

function Checkout() {
	const { user } = useOutletContext()

	const navigate = useNavigate()

	const [name, setName] = useState(user?.name)
	const [email, setEmail] = useState(user?.email)
	const [address, setAddress] = useState("")

	const [searchParams] = useSearchParams()
	const id = searchParams.get("id")

	const { product } = useProduct(id)
	console.log(product)

	const originalPrice = product?.originalPrice
	const discountPrice = product?.discountPrice
	const discount = discountPrice && originalPrice - discountPrice
	const shippingFee = product?.shippingFee

	let totalPrice

	if (discountPrice) {
		totalPrice = discountPrice + shippingFee
	} else {
		totalPrice = originalPrice + shippingFee
	}

	const submitCheckout = () => {
		localStorage.setItem(
			"orderItems",
			JSON.stringify({
				address,
				email,
				name,
				totalPrice,
				discount,
				shippingFee,
				originalPrice,
				productId: product?._id,
			})
		)

		navigate("/payment")
	}

	return (
		<div>
			<Header user={user} />
			<div className=" mt-6 flex items-center justify-center">
				<CheckoutSteeps active="checkout" />
			</div>
			<div className="flex w-full gap-12 mt-6">
				<div className="p-8 w-9/12 rounded shadow-lg">
					<h1>Shipping Address</h1>

					<div className="flex mt-3  flex-col gap-4">
						<div className="flex flex-col gap-1">
							<label htmlFor="name">Name</label>
							<input
								className=" input input-bordered"
								type="text"
								name="name"
								id="name"
								defaultValue={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="email">Email</label>
							<input
								className=" input input-bordered"
								type="email"
								name="email"
								id="email"
								defaultValue={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="address">Address</label>
							<input
								className=" input input-bordered"
								type="text"
								name="address"
								id="address"
								value={address}
								defaultValue={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-1">
							<label className="text-xl cursor-pointer">
								{" "}
								Choose from save addresses
							</label>

							<div className=" flex flex-col gap-4">
								{user?.address.length > 0 ? (
									user?.address?.map((address) => (
										<div key={address._id} className="flex items-center gap-6">
											<input
												className=" radio radio-accent"
												type="radio"
												name={"address"}
												id={address.addressType}
												onChange={() => setAddress(address.address)}
											/>

											<label htmlFor={address.addressType}>
												{address.addressType}
											</label>
										</div>
									))
								) : (
									<p className="text-xl">
										No saved addresses.{" "}
										<Link className=" underline cursor-pointer" to={"/address"}>
											{" "}
											Click on this link to add and address
										</Link>
									</p>
								)}
							</div>

							<button
								onClick={submitCheckout}
								disabled={!email || !name || !address}
								className=" mt-6 btn btn-primary max-w-[150px]">
								continue
							</button>
						</div>
					</div>
				</div>
				<div className=" self-start w-3/12  rounded shadow-lg">
					<CheckoutSummary
						totalPrice={totalPrice}
						shippingFee={shippingFee}
						discount={discount}
						originalPrice={originalPrice}
					/>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Checkout
