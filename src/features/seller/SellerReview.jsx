import React from "react"
import Spinner from "../../components/Spinner"
import Rating from "../../components/Rating"

function SellerReview({ sellerReviews, isLoadingReviews }) {
	if (isLoadingReviews) return <Spinner />
	return (
		<div className=" w-full">
			<h1 className=" mt-4 text-2xl font-bold">
				All Reviews ({sellerReviews?.length})
			</h1>
			<br />
			<div className=" flex flex-col gap-5">
				{sellerReviews?.length > 0 ? (
					sellerReviews?.map((review) => (
						<div className=" flex gap-2">
							<img
								className=" h-14 w-14 rounded-full object-fill"
								src={review?.user?.photo}
							/>

							<div className=" flex flex-col gap-1">
								<div className=" flex gap-2">
									<h1 className=" font-bold">{review?.user.name}</h1>
									<Rating rating={review?.rating} />
								</div>
								<span className=" text-sm text-gray-500">
									{review?.product.title}
								</span>

								<p>{review.review}</p>
							</div>
						</div>
					))
				) : (
					<p className=" font-bold text-4xl text-left w-full my-24 text-gray-400">
						You have no reviews yet
					</p>
				)}
			</div>
		</div>
	)
}

export default SellerReview
