import React from "react"
import Card from "../products/Card"

function RecommendedProducts({ recommenedProducts }) {
	return (
		<section className="section p-2">
			<h1 className=" text-2xl font-bold mb-6 ">Recommended Products</h1>

			<div className=" gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{recommenedProducts &&
					recommenedProducts?.map((product) => (
						<Card key={product?._id} product={product} />
					))}
			</div>
		</section>
	)
}

export default RecommendedProducts
