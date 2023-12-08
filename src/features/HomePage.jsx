import React from "react"
import Header from "../components/Header"
import Carousel from "../components/Carousel"
import Categories from "../components/Categories"
import FeaturedProducts from "./products/FeaturedProducts"
import Footer from "../components/Footer"
import { useUser } from "../app/hooks/loadUser"
import { useAllProducts } from "./products/useProducts"
import { FaArrowUp } from "react-icons/fa"

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

			<button
				onClick={() => {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					})
				}}
				className=" fixed top-[90%] z-50 left-1/2 -translate-x-1/2 btn btn-neutral rounded-full">
				<FaArrowUp size={25} />
				<span>To top</span>
			</button>

			<Footer />
		</div>
	)
}

export default HomePage
