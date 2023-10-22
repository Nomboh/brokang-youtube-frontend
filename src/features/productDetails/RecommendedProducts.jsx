import React from "react"
import Card from "../products/Card"

function RecommendedProducts({ products }) {
	return (
		<section className="section p-2">
			<h1 className="text-2xl pl-2 font-bold mb-6">Recommended Products</h1>
			<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4">
				{products &&
					products.map((product) => (
						<Card key={product._id} product={product} />
					))}
			</div>
		</section>
	)
}

export default RecommendedProducts
