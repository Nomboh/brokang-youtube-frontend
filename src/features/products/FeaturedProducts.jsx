import React from "react"
import Card from "./Card.jsx"
import Spinner from "../../components/Spinner.jsx"

function FeaturedProducts({ products, isLoading }) {
	if (isLoading) return <Spinner />

	return (
		<section className="section">
			<h1 className="font-bold text-2xl my-6 ">Featured Products</h1>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{products &&
					products.map((item) => <Card key={item._id} product={item} />)}
			</div>
		</section>
	)
}

export default FeaturedProducts
