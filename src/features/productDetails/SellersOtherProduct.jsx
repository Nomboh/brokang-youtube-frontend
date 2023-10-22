import { useEffect, useRef, useState } from "react"
import { format } from "timeago.js"

const SellerOtherItems = ({ products }) => {
	const [showLeftButton, setShowLeftButton] = useState(false)
	const itemsRef = useRef(null)
	const scrollLeft = () => {
		itemsRef.current.scrollLeft -= 800
	}

	const scrollRight = () => {
		itemsRef.current.scrollLeft += 800
	}

	const handleScroll = () => {
		const scrollPosition = itemsRef.current.scrollLeft
		setShowLeftButton(scrollPosition > 0)
	}

	useEffect(() => {
		let scrollItem = itemsRef.current
		if (scrollItem) {
			scrollItem.addEventListener("scroll", handleScroll)
		}

		return () => {
			scrollItem?.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return (
		<div className="section">
			<h1 className="text-left pl-2 font-bold mb-4 text-lg">
				Sellers other items
			</h1>
			<div className="relative w-full bg-base-200 p-2 rounded-lg ">
				<div
					ref={itemsRef}
					className=" flex gap-2 w-full carousel overflow-x-scroll ">
					{products &&
						products?.map((item) => (
							<div
								key={item._id}
								className="card w-44 p-2 800px:w-52 cursor-pointer bg-base-100 shadow">
								<figure className=" w-44 800px:w-52">
									<img
										src={item.images[0]}
										className=" w-28 h-28 object-contain 800px:w-36 800px:h-36"
										alt={item.title}
									/>
								</figure>
								<div className="card-body p-0">
									<h2 className="card-title">
										{item?.discountPrice
											? item?.discountPrice
											: item?.originalPrice}{" "}
										$
									</h2>
									<p className="text-left">
										{item.title.slice(0, 12)}
										{item.title.length > 12 && "..."}
									</p>
									<p className=" text-gray-400 font-light text-sm text-left">
										{format(item.createdAt)}
									</p>
								</div>
							</div>
						))}
				</div>
				{products && products.length > 6 && (
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<div
							style={{ visibility: showLeftButton ? "visible" : "hidden" }}
							onClick={scrollLeft}
							className="btn btn-circle">
							❮
						</div>

						<div onClick={scrollRight} className="btn btn-circle">
							❯
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default SellerOtherItems
