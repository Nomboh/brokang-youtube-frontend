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
		useAllProducts({ limit: "8", user: user?._id })

	const products = data?.pages.flatMap((item) => item.products)

	return (
		<div>
			<Header user={user} />
			<Carousel />
			<Categories />
			<FeaturedProducts
				products={products}
				isLoading={isLoading}
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>

			<Footer />
		</div>
	)
}

export default HomePage
