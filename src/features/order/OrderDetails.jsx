import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import {
	Link,
	useNavigate,
	useOutletContext,
	useParams,
} from "react-router-dom"
import { useGetOrder } from "../payment/order"
import Spinner from "../../components/Spinner"
import { IoMdCloseCircle } from "react-icons/io"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { useCreateReview, useGetReviews } from "./review"

function OrderDetails() {
	const params = useParams()
	const { user } = useOutletContext()

	const [rating, setRating] = React.useState(1)
	const [review, setReview] = React.useState("")

	const { order, isLoading } = useGetOrder(params?.id)

	const { sellerReviews } = useGetReviews(order?.seller)
	const { createAReview, isCreatingReview } = useCreateReview()

	const refReview = React.useRef(null)

	const isReviewed = sellerReviews?.some(
		(review) =>
			review?.user._id === order?.user &&
			review?.product._id === order?.product._id
	)

	const handleReview = (e) => {
		e.preventDefault()

		createAReview(
			{
				productId: order?.product?._id,
				rating,
				review,
				seller: order?.seller,
			},
			{
				onSuccess: () => {
					refReview.current?.close()
				},
			}
		)
	}
	const navigate = useNavigate()

	if (isLoading) return <Spinner />

	return (
		<div>
			<Header user={user} />
			<div className="section">
				<h1 className=" text-2xl font-bold mb-5">Order Details</h1>
				<div className=" text-gray-500 flex w-full items-center justify-between">
					<p>Order ID: #{order?._id.slice(0, 12)}</p>
					<p>Placed On: {order?.paidAt.slice(0, 12)}</p>
				</div>
				<br />
				<div className=" flex items-center justify-between">
					<Link
						to={`/seller/${order?.seller}?tab=products`}
						className="flex gap-2 flex-col">
						<img
							className=" rounded-sm h-48 w-48 object-cover"
							src={order?.product?.images[0]}
							alt={order?.product.title}
						/>
						<p className="text-xl">{order?.product.title}</p>
						<p className=" text-2xl font-bold">US ${order?.totalPrice}</p>
					</Link>
					{(order?.status === "Delivered" ||
						order.product.status === "sold out") &&
						!isReviewed && (
							<button
								onClick={() => refReview.current.showModal()}
								className=" btn btn-neutral">
								Write a review
							</button>
						)}
				</div>
				<div className=" divider"></div>
				<br />
				<div className=" flex items-center justify-between">
					<div className="">
						<h1 className="text-xl font-bold mb-1">Shipping Address:</h1>
						<p className="text-gray-500">{order?.shippingAddress}</p>
					</div>
					<div className="">
						<p className="text-xl mb-2">
							Status: <strong>{order?.status}</strong>
						</p>

						<button
							onClick={() => navigate("/order")}
							className="btn btn-primary">
							Order list
						</button>
					</div>
				</div>

				{/* Open the modal using document.getElementById('ID').showModal() method */}

				<dialog ref={refReview} id="modal_review" className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-center text-xl">Give a Review</h3>

						<div className=" absolute top-3 right-3">
							<IoMdCloseCircle
								onClick={() => refReview.current?.close()}
								size={30}
							/>
						</div>

						<br />

						<div className=" flex gap-4">
							<img
								className=" h-28 w-28 rounded-sm"
								src={order?.product.images[0]}
								alt=""
							/>
							<div className="">
								<p className=" text-xl font-bold">{order?.product.title}</p>
								<p className=" text-2xl font-bold">US ${order?.totalPrice}</p>
							</div>
						</div>

						<div className="">
							<div className=" my-5 ">
								<p>
									Give a Rating <strong className=" text-red-500">*</strong>
								</p>
								<div className=" flex w-full ml-2 pt-1">
									{[1, 2, 3, 4, 5].map((item) =>
										rating >= item ? (
											<AiFillStar
												size={25}
												onClick={() => setRating(item)}
												className=" mr-1 cursor-pointer text-primary"
												key={item}
											/>
										) : (
											<AiOutlineStar
												size={25}
												onClick={() => setRating(item)}
												className=" mr-1 cursor-pointer text-primary"
												key={item}
											/>
										)
									)}
								</div>
							</div>

							<form onSubmit={handleReview} method="dialog">
								<div className="flex flex-col gap-1">
									<label htmlFor="review">Review</label>
									<textarea
										name="review"
										id="review"
										cols={20}
										rows={5}
										value={review}
										onChange={(e) => setReview(e.target.value)}
										placeholder="write your review about this product"
										className="mt-2 w-full textarea textarea-bordered"></textarea>
								</div>
								<input
									disabled={isCreatingReview}
									type="submit"
									value={"Review"}
									className="btn mt-6 btn-neutral"
								/>
							</form>
						</div>
					</div>
				</dialog>
			</div>
			<Footer />
		</div>
	)
}

export default OrderDetails
