import React, { useState } from "react"
import { useLikes } from "../../app/hooks/like"
import Spinner from "../../components/Spinner"
import Card from "../products/Card"
import Pagination from "../../components/Pagination"

const sortOptions = [
	{ name: "Price: low to high", value: "low" },
	{ name: "Price: high to low", value: "high" },
	{ name: "Published date (oldest)", value: "createdAt" },
	{ name: "Published date (newest)", value: "" },
]

function LikeProducts() {
	const { likes } = useLikes()
	const [sort, setSort] = useState("")
	const [category, setCategory] = useState("")
	const [page, setPage] = useState(1)

	if (!likes) return <Spinner />

	const filterLikes = likes?.filter((like) => {
		if (category === "") return like
		return like.product.category === category
	})

	const likeCategories = likes?.reduce((acc, like) => {
		const cat = like.product.category
		if (!acc[cat]) {
			acc[cat] = 1
		} else {
			acc[cat] += 1
		}

		return acc
	}, {})

	const catArray = Object.entries(likeCategories).map(([key, value]) => ({
		_id: key,
		count: value,
	}))

	const sortedLikes = filterLikes?.sort((a, b) => {
		if (sort === "low") return a.product.originalPrice - b.product.originalPrice
		if (sort === "high")
			return b.product.originalPrice - a.product.originalPrice
		if (sort === "createdAt")
			return new Date(a.product.createdAt) - new Date(b.product.createdAt)
		return new Date(b.product.createdAt) - new Date(a.product.createdAt)
	})

	const initFilters = () => {
		setCategory("")
		setSort("")
	}

	return (
		<div>
			<div className=" flex gap-6 items-center flex-wrap">
				{/* category dropdown */}
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-neutral m-1">
						Category
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content z-50 flex-wrap 800px:w-[600px] flex flex-row gap-x-10 gap-y-4 p-4 shadow bg-base-100 rounded-box w-96">
						{catArray.map((item) => (
							<li
								onClick={() => {
									setCategory(item._id)
								}}
								key={item._id}
								className={`${
									category === item._id && "text-primary-focus"
								} text-xl cursor-pointer hover:text-primary-focus`}>
								<a>
									{item._id} <strong>({item.count})</strong>
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* sort dropdown */}
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-neutral m-1">
						Sort by
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content z-50 flex-wrap 800px:w-[600px] flex flex-row gap-x-10 gap-y-4 p-4 shadow bg-base-100 rounded-box w-96">
						{sortOptions.map((item) => (
							<li
								onClick={() => {
									setSort(item.value)
								}}
								key={item.value}
								className={`${
									sort === item.value && "text-primary-focus"
								} text-xl cursor-pointer hover:text-primary-focus`}>
								<a>{item.name}</a>
							</li>
						))}
					</ul>
				</div>

				{/* filter initializer */}
				<button onClick={initFilters} className=" btn btn-neutral">
					{" "}
					initialize filters
				</button>
			</div>

			<div className="grid mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{sortedLikes?.map((like) => (
					<Card key={like._id} product={like?.product} />
				))}
			</div>
		</div>
	)
}

export default LikeProducts
