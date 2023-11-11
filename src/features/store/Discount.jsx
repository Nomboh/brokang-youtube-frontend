import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useUpdateManyProducts } from "./updateManyProducts"
import toast from "react-hot-toast"

const discounts = [10, 15, 20, 30, 50]

function Discount({ checkedProducts, setIndex }) {
	const modalDiscountRef = useRef(null)
	const [highDiscount, setHighDiscount] = useState(false)
	const {
		formState: { errors, isDirty, isValid },
		handleSubmit,
		setValue,
		register,
		watch,
	} = useForm({
		defaultValues: {
			discountRate: 0,
			discountPrice: 0,
		},
		mode: "onChange",
	})

	const clonedProducts = [...checkedProducts]

	const discountRate = watch("discountRate")
	const discountPrice = watch("discountPrice")

	const { mutate, isLoading } = useUpdateManyProducts()

	const onSubmit = (data) => {
		clonedProducts.forEach((product) => {
			if (data.discountRate) {
				product.discountPrice =
					product.originalPrice -
					(product.originalPrice * data.discountRate) / 100
			} else {
				if (data.discountPrice >= product.originalPrice) {
					delete product.discountPrice
					setHighDiscount(true)
				} else {
					product.discountPrice = product.originalPrice - data.discountPrice
				}
			}
		})

		mutate(
			{ updatedItems: clonedProducts },
			{
				onSuccess: () => {
					if (highDiscount) {
						toast.error(
							"Some products couldn't be updated because discount price is higher than original price"
						)
					}

					setHighDiscount(false)

					modalDiscountRef.current.close()
					setIndex(0)
				},
			}
		)
	}

	return (
		<dialog ref={modalDiscountRef} id="modal_discount" className="modal">
			<div className="modal-box w-[300px] 800px:w-[400px] max-w-[500px]">
				<h2 className="font-bold text-lg text-center w-full">Discount</h2>

				<button
					onClick={() => modalDiscountRef.current.close()}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
					✕
				</button>

				<div className="modal-action justify-center items-center w-full">
					<form method="dialog" onSubmit={handleSubmit(onSubmit)}>
						<h3 className=" mb-3">Discount with discount rate</h3>
						<div className=" form-control flex-row flex-wrap items-center gap-4">
							{discounts.map((discount) => (
								<label
									onClick={() => {
										setValue("discountRate", discount, {
											shouldValidate: true,
											shouldDirty: true,
										})
									}}
									key={discount}
									className={`label badge p-4 rounded-md hover:border-neutral ${
										discountRate === discount ? " bg-neutral text-white" : ""
									}`}>
									<span>{discount} %</span>{" "}
								</label>
							))}

							<div className="">
								<input
									type="number"
									placeholder="Discount rate"
									className="input input-bordered w-[150px] "
									{...register("discountRate", {
										max: {
											value: 90,
											message: "Maximum value is 90",
										},
										valueAsNumber: true,
										validate: {
											divisible: (value) => {
												return (
													value % 5 === 0 || "rate must be a divisible by 5"
												)
											},

											zero: (value) => {
												return (
													(discountPrice === 0 && value !== 0) ||
													(discountPrice !== 0 && value === 0) ||
													"You can't use both discount rate and discount price"
												)
											},
										},
									})}
								/>
								{errors.discountRate && (
									<p className="text-sm text-error">
										{errors.discountRate.message}
									</p>
								)}
							</div>
						</div>

						<h3 className=" mt-6 mb-3">Discount with discount price</h3>
						<div className="">
							<input
								type="number"
								placeholder="Discount price"
								className="input input-bordered"
								{...register("discountPrice", {
									valueAsNumber: true,
									validate: (value) => {
										return (
											(discountRate === 0 && value !== 0) ||
											(discountRate !== 0 && value === 0) ||
											"You can't use both discount rate and discount price"
										)
									},
								})}
							/>

							{errors.discountPrice && (
								<p className="text-sm text-error">
									{errors.discountPrice.message}
								</p>
							)}
						</div>

						<input
							type="submit"
							disabled={!isDirty || !isValid || isLoading}
							className="btn btn-neutral mt-8 w-full"
						/>
					</form>
				</div>
			</div>
		</dialog>
	)
}

export default Discount
