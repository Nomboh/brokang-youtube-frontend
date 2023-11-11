import React, { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { useProducts } from "../products/useProducts"
import Spinner from "../../components/Spinner"
import toast from "react-hot-toast"
import { BiChevronRight } from "react-icons/bi"
import StoreCard from "./StoreCard"
import BatchEditing from "./BatchEditing"
import Discount from "./Discount"
import StatusChange from "./StatusChange"
import DeleteMany from "./DeleteMany"
import Pagination from "../../components/Pagination"

function SaleProducts({ user }) {
	const [category, setCategory] = useState("")
	const [status, setStatus] = useState("")
	const [search, setSearch] = useState("")
	const [checkedProducts, setCheckedProducts] = useState([])
	const [batchEditing, setBatchEditing] = useState(false)
	const [index, setIndex] = useState(0)
	const [openStatus, setOpenStatus] = useState(false)
	const [pageNumber, setPageNumber] = useState(1)

	const { products: allProducts, isLoading } = useProducts({
		pageNumber,
		limit: 6,
		user: user?._id,
		category,
		status,
		query: search,
	})

	if (isLoading) return <Spinner />

	const { catArray, statusArray, products, totalPages } = allProducts

	const initializeFilter = () => {
		setCategory("")
		setStatus("")
		setSearch("")
	}

	const onPageChange = (pageNumber) => {
		setPageNumber(pageNumber)
	}

	return (
		<div className=" w-full relative">
			<div className=" w-full flex gap-x-8 items-center flex-wrap">
				{/* category */}
				<div className="dropdown">
					<label tabIndex={0} className="btn m-1 btn-outline hover:btn-neutral">
						Category
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content flex gap-x-10 gap-y-4 flex-wrap w-96 800px:w-[700px] z-[1] p-4 shadow bg-base-100 rounded-box">
						{catArray?.map((cat) => (
							<li
								className={`${
									category === cat._id && "text-primary-focus"
								}  hover:text-primary-focus cursor-pointer `}
								onClick={() => setCategory(cat._id)}
								key={cat._id}>
								<a>
									{cat._id} <strong>({cat.count})</strong>{" "}
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* status */}
				<div className="dropdown">
					<label tabIndex={0} className="btn m-1 btn-outline hover:btn-neutral">
						Status
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content flex gap-x-10 gap-y-4 flex-wrap w-96 800px:w-[500px] z-[1] p-4 shadow bg-base-100 rounded-box">
						{statusArray?.map((status) => (
							<li
								className={`${
									status === status._id && "text-primary-focus"
								}  hover:text-primary-focus cursor-pointer `}
								onClick={() => setStatus(status._id)}
								key={status._id}>
								<a>
									{status._id} <strong>({status.count})</strong>{" "}
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* search inpute */}
				<div className=" relative">
					<input
						className="input input-bordered w-80 "
						type="text"
						placeholder="Search..."
						defaultValue={search}
						onChange={(e) => {
							e.preventDefault()
							setSearch(e.target.value)
						}}
					/>
					<button
						onClick={() => {}}
						className="absolute top-0 right-0 rounded-l-none btn btn-primary">
						<BsSearch size={23} />
					</button>
				</div>

				{/* innitializer */}
				<button onClick={initializeFilter} className="btn btn-neutral">
					initialize
				</button>
			</div>

			{/* products */}
			<div className=" w-full">
				<div className="w-full mt-6 flex items-center justify-between">
					<h2 className="inline-block text-xl">
						all sales {products?.productLength}
					</h2>
					<div
						onClick={() => {
							if (checkedProducts.length === 0) {
								toast.error("Please select atleast one product")
							} else {
								setBatchEditing(!batchEditing)
							}
						}}
						className="flex cursor-pointer gap-x-4 text-xl">
						<h2>batch editing</h2> <BiChevronRight size={23} />
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
					{products &&
						products?.map((item) => (
							<StoreCard
								checkedProducts={checkedProducts}
								setCheckedProducts={setCheckedProducts}
								key={item._id}
								product={item}
							/>
						))}
				</div>
			</div>

			{/* pagination */}
			<Pagination
				currrentPage={pageNumber}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>

			{/* batch editing */}
			{checkedProducts.length > 0 && batchEditing && (
				<BatchEditing
					setIndex={setIndex}
					index={index}
					checkedProducts={checkedProducts}
					setOpenStatus={setOpenStatus}
					openStatus={openStatus}
				/>
			)}

			{/* discount */}
			<Discount checkedProducts={checkedProducts} setIndex={setIndex} />

			{/* change product status */}
			{openStatus && (
				<StatusChange
					setIndex={setIndex}
					setOpenStatus={setOpenStatus}
					checkedProducts={checkedProducts}
				/>
			)}

			{/* delete many */}
			<DeleteMany checkedProducts={checkedProducts} setIndex={setIndex} />
		</div>
	)
}

export default SaleProducts
