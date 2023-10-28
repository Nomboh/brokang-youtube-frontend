import React, { useEffect, useRef, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { format } from "timeago.js"

function SellerOtherItems({ sellerProducts }) {
	const [showLeftButton, setShowLeftButton] = useState(false)
	const itemRef = useRef(null)

	const scrollLeft = () => {
		itemRef.current.scrollLeft -= 800
	}

	const scrollRight = () => {
		itemRef.current.scrollLeft += 800
	}

	useEffect(() => {
		let scrollItem = itemRef.current
		const handleScroll = () => {
			setShowLeftButton(scrollItem.scrollLeft > 0)
		}

		if (scrollItem) {
			scrollItem.addEventListener("scroll", handleScroll)
		}

		return () => {
			scrollItem?.removeEventListener("scroll", handleScroll)
		}
	}, [])
	return (
		<div className="section">
			<h1 className=" text-left pl-2 font-bold mb-4 text-lg">
				Seller Other items
			</h1>
			<div className="relative w-full bg-base-200 p-2 rounded-lg">
				<div
					ref={itemRef}
					className=" flex gap-2 w-full carousel overflow-x-scroll">
					{sellerProducts &&
						sellerProducts?.map((product) => (
							<div
								key={product?._id}
								className="card w-44 800px:w-52 bg-base-100 shadow-xl">
								<figure className=" w-44 800px:w-52">
									<img
										src={product.images[0]}
										alt="Shoes"
										className="h-36 w-full object-cover"
									/>
								</figure>
								<div className="card-body 800px:p-4 gap-0">
									<div className=" flex gap-5 items-start">
										<h1 className="font-bold text-2xl">
											{product?.discountPrice
												? product?.discountPrice
												: product?.originalPrice}
											$
										</h1>
										{product?.discountPrice && (
											<p className="text-sm  line-through text-red-500">
												{product.originalPrice}
											</p>
										)}
									</div>
									<p>
										{product.title.slice(0, 14)}{" "}
										{product?.title.length > 14 && "..."}
									</p>

									<p className="text-sm font-light text-gray-400">
										{format(product.createdAt)}
									</p>
								</div>
							</div>
						))}
				</div>
				{sellerProducts && sellerProducts?.length > 6 && (
					<div className=" absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<div
							style={{
								visibility: showLeftButton ? "visible" : "hidden",
							}}
							onClick={scrollLeft}
							className={`btn btn-circle `}>
							<BsChevronLeft size={25} />
						</div>
						<div onClick={scrollRight} className="btn btn-circle">
							<BsChevronRight size={25} />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default SellerOtherItems
