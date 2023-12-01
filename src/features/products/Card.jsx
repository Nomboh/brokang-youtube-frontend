import React, { useState } from "react"
import { BsFillHeartFill, BsHeart } from "react-icons/bs"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { useLike, useUnlike } from "../../app/hooks/like"

function Card({ product, lastElementRef }) {
	const { likeAProduct } = useLike(product?._id)
	const { unlikeAProduct } = useUnlike(product?._id)

	const likes = JSON.parse(localStorage.getItem("likes"))
	const isProductLiked = likes?.some((lk) => lk.product._id === product?._id)

	const [isLike, setIslike] = useState(isProductLiked)
	return (
		<Link ref={lastElementRef} to={`/${product._id}`}>
			<div className="card  bg-base-100 shadow-xl">
				<figure className="relative">
					<img
						src={product.images[0]}
						alt="Shoes"
						className={`h-56 w-full object-cover ${
							product?.status !== "sale" && "filter brightness-[0.23]"
						}`}
					/>

					{product?.status !== "sale" && (
						<p className=" absolute text-red-500 text-xl text-center">
							{product?.status}
						</p>
					)}
					{isLike ? (
						<BsFillHeartFill
							onClick={(e) => {
								e.preventDefault()
								setIslike(!isLike)
								unlikeAProduct(product?._id)
							}}
							size={25}
							className="absolute top-3 right-3 cursor-pointer text-red-500 z-30"
						/>
					) : (
						<BsHeart
							onClick={(e) => {
								e.preventDefault()
								setIslike(!isLike)
								likeAProduct(product?._id)
							}}
							size={25}
							className="absolute top-3 right-3 cursor-pointer text-gray-500 z-30"
						/>
					)}
				</figure>
				<div className="card-body 800px:p-4">
					<h2 className="card-title">
						<div className="badge badge-neutral p-4 rounded-lg uppercase">
							{product.brand}
						</div>
						<div className="badge badge-primary">{product.condition}</div>
					</h2>

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
						{product.title.slice(0, 24)} {product?.title.length > 28 && "..."}
					</p>
					<div className="card-actions justify-start">
						{product.shippingFee === 0 && (
							<div className="badge badge-outline">Free Shipping</div>
						)}
						{product?.size && (
							<div className="badge badge-outline">{product?.size}</div>
						)}
					</div>

					<p className="text-sm font-light text-gray-400">
						{format(product.createdAt)}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default Card
