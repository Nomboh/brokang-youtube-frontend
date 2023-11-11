import React from "react"
import { Link } from "react-router-dom"
import { format } from "timeago.js"

function StoreCard({ product, checkedProducts, setCheckedProducts }) {
	return (
		<div className="card  bg-base-100 shadow-xl">
			<figure className="relative w-full">
				<Link className=" w-full" to={`/${product._id}`}>
					<img
						src={product.images[0]}
						alt="Shoes"
						className={`${
							product.status !== "sale" && "filter brightness-[0.23]"
						} h-56  w-full object-cover`}
					/>
					{product?.status !== "sale" && (
						<p className=" text-xl text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2">
							{product?.status}
						</p>
					)}
				</Link>

				<input
					type="checkbox"
					onChange={() => {
						if (checkedProducts.find((prod) => prod._id === product._id)) {
							setCheckedProducts(
								checkedProducts.filter((prod) => prod._id !== product._id)
							)
						} else {
							setCheckedProducts([...checkedProducts, product])
						}
					}}
					checked={checkedProducts.find((prod) => prod._id === product._id)}
					className="checkbox checkbox-lg checkbox-accent absolute top-3 right-3 z-50"
				/>
			</figure>
			<div className="card-body 800px:p-4">
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

				<p className="text-sm font-light text-gray-400">
					{format(product.createdAt)}
				</p>
			</div>
		</div>
	)
}

export default StoreCard
