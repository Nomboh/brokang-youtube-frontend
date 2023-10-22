import React, { useEffect, useState } from "react"
import { productCategories } from "../../utils/productCategories"
import { MdOutlineClose } from "react-icons/md"
import { FaChevronRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import SellImages from "./SellImages"
import { useForm } from "react-hook-form"
import { useCreateProduct } from "./createProduct"

const statusData = [
	{
		name: "New",
		value: "new",
	},

	{
		name: "Used ",
		value: "used",
	},

	{
		name: "Almost new",
		value: "semiused",
	},
]

function SellWrapper() {
	const [tag, setTag] = useState()
	const [tags, setTags] = useState([])
	const [conditionState, setConditionState] = useState()

	const {
		register,
		reset,
		watch,
		setValue,
		handleSubmit,
		formState: { errors, isValid, isDirty, isSubmitSuccessful },
	} = useForm({
		mode: "onTouched",
		defaultValues: {
			images: [],
			title: "",
			category: "",
			originalPrice: 0,
			brand: "no brand",
			condition: "",
			description: "",
			tags: [],
			size: "",
			shippingFee: 0,
		},
	})

	const handleTagDelete = (e, tag) => {
		e.preventDefault()

		const filteredTags = tags.filter((tg) => tg !== tag)
		setValue("tags", filteredTags)
		setTags(filteredTags)
	}

	const handleAddTag = () => {
		if (tags.length < 5) {
			setTags((prev) => [...prev, tag])
			setTag("")
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset()
		}
	}, [isSubmitSuccessful])

	const { createProduct, isCreating } = useCreateProduct()

	const onSubmit = (data) => {
		createProduct(data)
	}

	const category = watch("category")
	const images = watch("images")
	return (
		<div className="section w-full px-2">
			<div className="flex text-left items-center justify-between ">
				<h1 className=" font-bold text-xl">Product Registration</h1>
				<p>
					<span className=" text-red-500">*</span> Please fill out the required
					fields
				</p>
			</div>
			<div className="divider  before:bg-black  after:bg-black my-0"></div>
			<br />
			<form key={"general"} onSubmit={handleSubmit(onSubmit)}>
				{/* images */}
				<div className="flex flex-col gap-2 800px:flex-row">
					<div className="w-full flex 800px:block 800px:w-1/6 text-left">
						<span className="text-red-400">*</span> Product Images
						<p>
							{" "}
							<span className="text-accent ml-4">{images?.length}</span> / 12
						</p>
					</div>
					<div className=" flex-1 w-full 800px:w-5/6">
						<SellImages register={register} setValue={setValue} />
						<p className={`text-red-500 text-left `}>
							{errors.images?.message}
						</p>
					</div>
				</div>
				<div className="divider my-8"></div>

				{/* Product title */}
				<div className="flex flex-col gap-2 800px:flex-row">
					<div className="800px:w-1/6 w-full text-left">
						<span className="text-red-400">*</span> Product Title
					</div>

					<div className=" w-full 800px:w-5/6">
						<input
							type="text"
							placeholder="Your product title"
							className="input input-bordered w-full "
							{...register("title", {
								required: "Title is required",
							})}
						/>
						<p className="text-red-500 text-left">{errors.title?.message}</p>
					</div>
				</div>
				<div className="divider my-8"></div>

				{/* Product brand */}
				<div className="flex flex-col gap-2 800px:flex-row">
					<div className="800px:w-1/6 w-full text-left">
						<span>Product Brand</span>
					</div>

					<div className=" w-full 800px:w-5/6">
						<input
							type="text"
							placeholder="Your product brand"
							className="input input-bordered w-full "
							{...register("brand")}
						/>
					</div>
				</div>
				<div className="divider my-8"></div>

				{/* Product Category */}
				<div className="flex flex-col gap-2 800px:flex-row">
					<div className="text-left 800px:w-1/6 w-full">
						<span className="text-red-400">*</span> Product Category
					</div>

					<div className=" w-full 800px:w-5/6">
						<select
							{...register("category", {
								required: "category is required",
							})}
							className="select select-bordered w-full">
							<option value={""} disabled>
								Choose your category
							</option>
							{productCategories &&
								productCategories.map((category) => (
									<option key={category.id}>{category.title}</option>
								))}
						</select>

						<p className="text-red-500 text-left">{errors.category?.message}</p>
					</div>
				</div>
				<div className="divider my-8"></div>

				{/* Product Size */}
				{(category === "shoes" || category === "clothes") && (
					<>
						<div className="flex items-start flex-col gap-2 800px:flex-row ">
							<div className="800px:w-1/6 w-full text-left">Product Size</div>

							<div className=" self-start w-full 800px:w-5/6">
								<input
									type="string"
									placeholder="Enter the size of shoes or clothings"
									className="input flex input-bordered w-full max-w-sm "
									{...register("size")}
								/>
							</div>
						</div>
						<div className="divider my-8"></div>
					</>
				)}

				{/* Product Condition */}
				<div className="flex flex-col gap-2 800px:flex-row">
					<div className="800px:w-1/6 w-full text-left">
						<span className="text-red-400">*</span> Product Condition
					</div>

					<div className=" w-full 800px:w-5/6">
						<h1 className="text-left font-semibold text-lg mb-4">
							Please select the condition of the product to be sold
						</h1>
						<div className=" flex gap-4 items-center">
							{statusData.map((sd) => (
								<label
									htmlFor={sd.value}
									key={sd.value}
									onClick={(e) => {
										e.preventDefault()
										setConditionState(sd.value)
										setValue("condition", sd.value)
									}}
									className={`py-3 px-4 border-2 rounded-md border-base-200 cursor-pointer ${
										conditionState === sd.value ? " bg-black/50 text-white" : ""
									}`}>
									{sd.name}
									<input
										type="radio"
										id={sd.value}
										value={sd.value}
										{...register("condition", {
											required: "condition is required",
										})}
										checked={conditionState === sd.value}
										hidden
									/>
								</label>
							))}
							<p className="text-red-500 text-left">
								{errors.condition?.message}
							</p>
						</div>
					</div>
				</div>
				<div className="divider my-8"></div>

				{/* Product Price */}
				<div className="flex items-start flex-col gap-2 800px:flex-row ">
					<div className="800px:w-1/6 w-full text-left">
						<span className="text-red-400">*</span> Product Price
					</div>

					<div className=" self-start w-full 800px:w-5/6">
						<input
							type="number"
							placeholder="Enter the price of the product"
							className="input flex input-bordered w-full max-w-sm "
							{...register("originalPrice", {
								required: "price is required",
								min: {
									value: 1,
									message: "price can not be less than 1",
								},
								valueAsNumber: true,
							})}
						/>
						<p className="text-red-500 text-left">
							{errors.originalPrice?.message}
						</p>
					</div>
				</div>
				<div className="divider my-8"></div>

				{/* Product Tag */}
				<div className="flex items-start flex-col gap-2 800px:flex-row">
					<div className="800px:w-1/6 w-full  text-left">
						Product Tag (optional)
					</div>

					<div className=" w-5/6">
						<div className=" mb-4 flex gap-4 items-center">
							<input
								type="text"
								placeholder="Enter tags (up to 4)"
								value={tag}
								maxLength={10}
								onChange={(e) => {
									setTag(e.target.value)
								}}
								className="input flex input-bordered flex-1 "
							/>
							<div
								onClick={handleAddTag}
								className="border-2 font-semibold text-lg rounded-md h-12 flex items-center justify-center w-52 border-neutral cursor-pointer">
								add tag
							</div>
						</div>

						{tags && (
							<div className="mb-4 gap-4 flex items-center">
								{tags.map((tag, i) => (
									<label
										htmlFor={`tag-${i}`}
										key={i}
										className="badge h-10 px-4 py-2 border-gray-300 rounded-lg flex gap-4 items-center badge-outline badge-lg">
										{tag}

										<MdOutlineClose
											size={18}
											className=" text-gray-300 cursor-pointer"
											onClick={(e) => handleTagDelete(e, tag)}
										/>

										<input
											type="checkbox"
											id={`tag-${i}`}
											value={tag}
											checked={true}
											{...register("tags")}
											hidden
										/>
									</label>
								))}
							</div>
						)}

						<ul className=" bg-slate-100 marker:text-gray-400 list-inside list-disc text-left w-full mt-4 p-4 rounded-lg border border-base-300">
							<li className=" text-gray-400">
								One tag can contain up to 10 characters
							</li>
							<li className=" text-gray-400">
								Used for search and search advertising, etc
							</li>
							<li className=" text-gray-400">
								if you enter a tag is not related to the product. you would be
								sactioned.
							</li>
						</ul>
					</div>
				</div>
				<div className="divider my-8"></div>

				{/* Product Description */}
				<div className="flex items-start flex-col gap-2 800px:flex-row ">
					<div className="800px:w-1/6 text-left w-full">
						<span className="text-red-400">*</span> Product Description
					</div>

					<div className=" self-start w-full 800px:w-5/6">
						<textarea
							{...register("description", {
								required: "description is required",
							})}
							rows={8}
							className="textarea text-2xl textarea-bordered w-full"
							placeholder="Please provide all neccessary information for the buyer to know the state of your product. For example the brand, feeling of use, year of purchase, defects etc..."></textarea>
						<p className="text-red-500 text-left">
							{errors.description?.message}
						</p>
					</div>
				</div>
				<div className="divider my-8"></div>

				{/* Shipping Fee */}
				<div className="flex items-start flex-col gap-2 800px:flex-row ">
					<div className="800px:w-1/6 w-full text-left">
						<span className="text-red-400">*</span> Shipping Fee
					</div>

					<div className=" self-start w-full 800px:w-5/6">
						<input
							type="number"
							placeholder="Enter the shipping Fee of the product"
							className="input flex input-bordered w-full max-w-sm "
							{...register("shippingFee", {
								required: "shipping fee is required",
								max: {
									value: 100,
									message: "Shipping fee can not be more than 100$",
								},
								valueAsNumber: true,
								validate: {
									shippingValidate: (value) => {
										return value >= 5 || value === 0
											? true
											: "shipping fee most be greater than 5$"
									},
								},
							})}
						/>
						<p className="text-red-500 text-left">
							{errors.shippingFee?.message}
						</p>

						<ul className=" bg-slate-100 marker:text-gray-400 list-inside list-disc text-left w-full mt-4 p-4 rounded-lg border border-base-300">
							<li className=" text-gray-400">
								if shipping fee is 0 the seller bears the burden
							</li>
							<li className=" text-gray-400">
								The Max shipping fee is 100$ if shipping fee is greater than 0,
								buyers take care of the shipping fee
							</li>
						</ul>
					</div>
				</div>

				<div className="divider before:bg-black  after:bg-black my-8"></div>

				{/* buttons */}
				<div className="flex flex-col 800px:flex-row items-start">
					<div className="800px:w-1/6 w-full  text-left"></div>

					<div className=" w-full 800px:w-5/6">
						<div className=" mb-4 flex gap-4 items-center justify-center">
							<input
								disabled={!isDirty || !isValid || isCreating}
								type="submit"
								value={"Registration Complete"}
								className={`btn btn-active btn-accent`}
							/>

							<Link to={"/"}>
								<button className="btn btn-active btn-neutral ">
									Cancel Request
								</button>
							</Link>
						</div>
					</div>
				</div>
				<br />
			</form>
		</div>
	)
}

export default SellWrapper
