import Card from "../products/Card"
import React from "react"
import { BsSearch } from "react-icons/bs"

function SellerProducts({ products, isLoading }) {
	if (isLoading) return <Spinner />
	console.log(products)
	return (
		<div className=" w-full p-2 800px:p-0">
			<div className=" mt-3 relative max-w-xs">
				<input
					type="text"
					placeholder="Search"
					className=" input input-bordered w-full"
				/>
				<BsSearch className=" absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-500" />
			</div>
			<h1 className=" text-2xl font-bold mt-4">
				All Products {products.productCount}
			</h1>
			<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
				{products &&
					products.products.map((product) => (
						<Card key={product._id} product={product} />
					))}
			</div>
		</div>
	)
}

export default SellerProducts
