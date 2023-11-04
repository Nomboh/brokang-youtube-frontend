import React, { useCallback, useRef, useState } from "react"
import Card from "../products/Card"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { HiOutlineRefresh } from "react-icons/hi"
import LoadingSkelton from "../../components/LoadingSkelton"

function SearchWrapper(props) {
	const {
		data,
		isFetchingNextPage,
		hasNextPage,
		isLoading,
		fetchNextPage,
		q,
		setSearchParams,
		brand,
		category,
		setBrand,
		setCategory,
		setPrice,
		price,
		tag,
	} = props

	const { brandArray, catArray } = data?.pages[0]

	const products = data?.pages.map((page) => page.products).flat()
	const [filterIndex, setfilterIndex] = useState(0)
	const [originalPrice, setOriginalPrice] = useState(0)

	const removeQuery = () => {
		setSearchParams({ q: "" })
	}

	const removeTags = () => {
		setSearchParams({ tag: "" })
	}

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

	return (
		<section className="section p-2">
			<h1 className="text-3xl font-bold text-center">
				{q ? q : tag ? tag : ""}
			</h1>

			{/* setFilterButtons */}
			<div className="mt-8 flex gap-4  mb-2 w-full">
				<div
					onClick={() => setfilterIndex(0)}
					className={`w-48 h-12 cursor-pointer px-6 rounded-full ${
						filterIndex === 0 ? "bg-success text-white" : "ring-1 text-neutral"
					} flex  items-center justify-between`}>
					<p className="">category</p>
					{filterIndex === 0 ? <BsChevronDown /> : <BsChevronUp />}
				</div>

				<div
					onClick={() => setfilterIndex(1)}
					className={`w-48 cursor-pointer h-12 px-6 rounded-full ${
						filterIndex === 1 ? "bg-success text-white" : "ring-1 text-neutral"
					} flex  items-center justify-between`}>
					<p className="">brand</p>
					{filterIndex === 1 ? <BsChevronDown /> : <BsChevronUp />}
				</div>

				<div
					onClick={() => setfilterIndex(2)}
					className={`w-48 cursor-pointer h-12 px-6 rounded-full ${
						filterIndex === 2 ? "bg-success text-white" : "ring-1 text-neutral"
					} flex  items-center justify-between`}>
					<p className="">price</p>
					{filterIndex === 2 ? <BsChevronDown /> : <BsChevronUp />}
				</div>
			</div>

			{/* categories */}
			{filterIndex === 0 ? (
				<div className="w-full ring-1 rounded-md bg-slate-100 ring-slate-400 p-6">
					<h2 className="font-bold text-left">all categories({20})</h2>
					<div className="divider my-1 border-slate-400"></div>
					<div className="flex gap-2 flex-wrap">
						{catArray?.map((cat) => (
							<p
								onClick={() => setCategory(cat?._id)}
								key={cat._id}
								className="max-w-xs cursor-pointer text-left p-2">
								{cat?._id} <strong>({cat?.count})</strong>
							</p>
						))}
					</div>
				</div>
			) : null}

			{/* brands */}
			{filterIndex === 1 ? (
				<div className="w-full ring-1 rounded-md bg-slate-100 ring-slate-400 p-6">
					<h2 className="font-bold text-left">all brands({20})</h2>
					<div className="divider my-1 border-slate-400"></div>
					<div className="flex gap-4 flex-wrap items-center">
						{brandArray &&
							brandArray?.map((brand) => (
								<p
									onClick={() => setBrand(brand?._id)}
									key={brand?._id}
									className="max-w-[90px] 800px:max-w-xs w-36 cursor-pointer text-left p-2">
									{brand?._id}
									<strong>({brand?.count})</strong>
								</p>
							))}
					</div>
				</div>
			) : null}

			{/* price */}
			{filterIndex === 2 ? (
				<div className="w-full ring-1 rounded-md bg-slate-100 ring-slate-400 p-6">
					<h2 className="font-bold text-left">filter by price</h2>
					<div className="divider my-1 border-slate-400"></div>
					<div className="flex gap-8 items-center flex-wrap justify-between py-2">
						<div className="flex gap-4 items-center">
							<input
								type="number"
								placeholder="input price to filter"
								defaultValue={originalPrice}
								onChange={(e) => setOriginalPrice(e.target.value)}
								className="input input-bordered w-full max-w-xs"
							/>
							<label htmlFor="price">price</label>
						</div>

						<div className=" flex-1 flex gap-6">
							<label
								onClick={() => setPrice({ originalPrice, operator: "lt" })}
								className=" cursor-pointer hover:text-secondary">
								less than {"(<)"}
							</label>

							<label
								onClick={() => setPrice({ originalPrice, operator: "gt" })}
								className=" cursor-pointer hover:text-secondary">
								greater than {"(>)"}
							</label>

							<label
								onClick={() => setPrice({ originalPrice, operator: "eq" })}
								className=" cursor-pointer hover:text-secondary">
								equals to {"(=)"}
							</label>
						</div>
					</div>
				</div>
			) : null}

			{/* filters initializers */}
			<div className="flex w-full mt-6 gap-5 flex-wrap items-center">
				<div className="text-gray-500 flex items-center cursor-pointer">
					<p className=" mr-4">Filter initialization</p> <HiOutlineRefresh />
				</div>
				<button
					disabled={!category}
					onClick={() => setCategory("")}
					className={`btn btn-sm lowercase btn-success font-semibold rounded-full`}>
					Catagory
				</button>

				<button
					disabled={!brand}
					onClick={() => setBrand("")}
					className={`btn btn-sm lowercase btn-success font-semibold rounded-full`}>
					Brand
				</button>

				<button
					disabled={!price}
					onClick={() => setPrice("")}
					className={`btn btn-sm lowercase btn-success font-semibold rounded-full`}>
					Price
				</button>

				<button
					disabled={!q}
					onClick={removeQuery}
					className={`btn lowercase btn-sm btn-success font-semibold rounded-full`}>
					Search
				</button>

				<button
					disabled={!tag}
					onClick={removeTags}
					className={`btn lowercase btn-sm btn-success font-semibold rounded-full`}>
					tags
				</button>
			</div>

			{/* filtered Products */}
			<h1 className="font-bold text-2xl my-6 ">Filter your Products</h1>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{products ? (
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
					)
				) : (
					<h1 className="text-4xl font-black py-24 text-gray-300">
						NO Product match your filter
					</h1>
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

export default SearchWrapper
