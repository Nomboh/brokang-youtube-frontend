import React, { useState } from "react"
import Header from "../../components/Header"
import SearchWrapper from "./SearchWrapper"
import Footer from "../../components/Footer"
import { useUser } from "../../app/hooks/loadUser"
import { useAllProducts } from "../../features/products/useProducts"
import { useSearchParams } from "react-router-dom"

function Search() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [category, setCategory] = useState("")
	const [brand, setBrand] = useState("")
	const [price, setPrice] = useState("")

	const q = searchParams.get("q")
	const tag = searchParams.get("tag")

	console.log(tag)

	const { user } = useUser()
	const { data, isFetchingNextPage, hasNextPage, isLoading, fetchNextPage } =
		useAllProducts({
			limit: "12",
			query: q,
			category,
			brand,
			price,
			tags: tag,
			user: user?._id,
		})

	return (
		<div>
			<Header user={user} />
			{data && (
				<SearchWrapper
					data={data}
					isFetchingNextPage={isFetchingNextPage}
					hasNextPage={hasNextPage}
					isLoading={isLoading}
					fetchNextPage={fetchNextPage}
					setSearchParams={setSearchParams}
					q={q}
					brand={brand}
					category={category}
					setBrand={setBrand}
					setCategory={setCategory}
					price={price}
					setPrice={setPrice}
					tag={tag}
				/>
			)}

			<Footer />
		</div>
	)
}

export default Search
