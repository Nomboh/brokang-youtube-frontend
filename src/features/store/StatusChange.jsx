import React from "react"
import { useUpdateManyProducts } from "./updateManyProducts"

const stateArray = ["sale", "under reservation", "sold out", "hide"]

function StatusChange({ checkedProducts, setIndex, setOpenStatus }) {
	const clonedProducts = [...checkedProducts]

	const { mutate } = useUpdateManyProducts()
	const handleChangeStatus = (status) => {
		clonedProducts.forEach((product) => {
			product.status = status
		})
		mutate(
			{ updatedItems: clonedProducts },
			{
				onSuccess: () => {
					setIndex(0)
					setOpenStatus(false)
				},
			}
		)
	}
	return (
		<div className=" fixed bottom-24 rounded-md  right-[120px] border-2 border-accent bg-white">
			<ul className="menu p-4 w-48 min-h-full text-accent-content">
				{stateArray.map((stutus) => (
					<li onClick={() => handleChangeStatus(stutus)} key={stutus}>
						<a>{stutus}</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default StatusChange
