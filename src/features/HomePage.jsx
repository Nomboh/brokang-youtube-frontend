import React from "react"
import Header from "../components/Header"
import Carousel from "../components/Carousel"
import Categories from "../components/Categories"
import FeaturedProducts from "./products/FeaturedProducts"
import Footer from "../components/Footer"
import { useUser } from "../app/hooks/loadUser"
import { useAllProducts } from "./products/useProducts"

function HomePage() {
	const { user } = useUser()
	const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage } =
		useAllProducts()

	const products = data?.pages.flatMap((item) => item.products)

	const handleNextPage = () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	}

	console.log(data)
	return (
		<div>
			<Header user={user} />
			<Carousel />
			<Categories />
			<FeaturedProducts products={products} isLoading={isLoading} />

			<button
				disabled={!hasNextPage}
				onClick={handleNextPage}
				className="btn btn-neutral mt-6">
				{isFetchingNextPage ? (
					<span className="loading loading-spinner "></span>
				) : (
					<span>Next Page</span>
				)}
			</button>
			<Footer />
		</div>
	)
}

export default HomePage
