import React, { useEffect, useState } from "react"
import { productCategories } from "../../utils/productCategories"
import { MdOutlineClose } from "react-icons/md"
import { FaChevronRight } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SellImages from "./SellImages"
import { useForm } from "react-hook-form"
import { useCreateProduct, useEditProduct } from "./createProduct"

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

function SellWrapper({ product }) {
	const [tag, setTag] = useState()
	const navigate = useNavigate()

	const {
		register,
		reset,
		watch,
		setValue,
		handleSubmit,
		formState: { errors, isValid, isDirty, isSubmitSuccessful },
	} = useForm({
		mode: "onTouched",
		defaultValues: product
			? {
					images: product.images,
					title: product.title,
					category: product.category,
					originalPrice: product.originalPrice,
					brand: product.brand,
					condition: product.condition,
					tags: product.tags,
					size: product.size,
					description: product.description,
					shippingFee: product.shippingFee,
			  }
			: {
					images: [],
					title: "",
					category: "",
					originalPrice: 0,
					brand: "no brand",
					condition: "",
					tags: [],
					size: "",
					description: "",
					shippingFee: 0,
			  },
	})

	const handleTagDelete = (e, tag) => {
		e.preventDefault()

		const filteredTags = watchTags.filter((tg) => tg !== tag)
		setValue("tags", filteredTags)
	}

	const handleAddTag = () => {
		setValue("tags", [...watchTags, tag])

		setTag("")
	}

	const category = watch("category")
	const watchedImages = watch("images")
	const watchTags = watch("tags")
	const condition = watch("condition")

	const { isCreating, createAProduct } = useCreateProduct()
	const { editAProduct, isEditing } = useEditProduct()

	const onSubmit = (data) => {
		if (product) {
			editAProduct({
				...data,
				productId: product._id,
			})

			navigate(`/${product?._id}`)
		} else {
			createAProduct(data)
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset()
		}
	}, [isSubmitSuccessful])

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
							<span className="text-accent ml-4">{watchedImages.length}</span> /
							12
						</p>
					</div>
					<div className=" flex-1 w-full 800px:w-5/6">
						<SellImages
							watchedImages={watchedImages}
							register={register}
							setValue={setValue}
						/>
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
								required: "title is required",
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
					<div>
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
					</div>
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
										setValue("condition", sd.value)
									}}
									className={`${
										condition === sd.value ? " text-white bg-black/50 " : ""
									} py-3 px-4 border-2 rounded-md border-base-200 cursor-pointer`}>
									{sd.name}
									<input
										type="radio"
										id={sd.value}
										value={condition}
										{...register("condition", {
											required: "condition is required",
										})}
										hidden
										checked={condition === sd.value}
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
								required: "Price is required",
								valueAsNumber: true,
								min: {
									value: 1,
									message: "Price can not be less than 1",
								},
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

						{watchTags && (
							<div className="mb-4 gap-4 flex items-center">
								{watchTags.map((tag, i) => (
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
											checked={true}
											value={tag}
											hidden
											{...register("tags")}
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
								required: "shippingFee is required",
								max: {
									value: 100,
									message: "shipping fee can not be more than 100$",
								},
								valueAsNumber: true,
								validate: {
									shippingValidation: (value) => {
										return value >= 5 || value === 0
											? true
											: "Shipping fee most be greater than 5$"
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
							{product ? (
								<input
									disabled={isEditing}
									type="submit"
									value={"Complete Editing"}
									className={`btn btn-active btn-accent`}
								/>
							) : (
								<input
									disabled={!isDirty || !isValid || isCreating}
									type="submit"
									value={"Registration Complete"}
									className={`btn btn-active btn-accent`}
								/>
							)}

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
