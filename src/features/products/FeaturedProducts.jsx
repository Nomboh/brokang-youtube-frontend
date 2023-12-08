import React, { useCallback, useRef } from "react"
import Card from "./Card.jsx"
import Spinner from "../../components/Spinner.jsx"
import LoadingSkelton from "../../components/LoadingSkelton.jsx"

function FeaturedProducts({
	products,
	isLoading,
	fetchNextPage,
	isFetchingNextPage,
	hasNextPage,
}) {
	const scrollRef = useRef(null)

	const lastElementRef = useCallback((node) => {
		if (isLoading) return
		if (isFetchingNextPage) return
		if (!hasNextPage) return

		if (scrollRef.current) scrollRef.current.disconnect()

		scrollRef.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				fetchNextPage()
			}
		})

		if (node) scrollRef.current.observe(node)
	})

	if (isLoading) return <Spinner />

	return (
		<section className="section px-2 800px:px-0">
			<h1 className="font-bold text-2xl my-6 ">Featured Products</h1>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{products &&
					products.map((item, index) =>
						index + 1 === products.length ? (
							<Card
								lastElementRef={lastElementRef}
								key={item._id}
								product={item}
							/>
						) : (
							<Card key={item._id} product={item} />
						)
					)}

				{/* loading skelton */}
				{isFetchingNextPage &&
					Array.from({ length: 12 }).map((_, index) => (
						<LoadingSkelton key={index} />
					))}
			</div>
		</section>
	)
}

export default FeaturedProducts
