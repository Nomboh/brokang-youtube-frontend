import React from "react"
import { TbDiscount } from "react-icons/tb"
import { LiaExchangeAltSolid } from "react-icons/lia"
import { RiDeleteBinLine } from "react-icons/ri"

function BatchEditing({
	openStatus,
	checkedProducts,
	setIndex,
	index,
	setOpenStatus,
}) {
	return (
		<div
			className={`fixed p-1 items-center right-2 bottom-0 h-[500px] bg-white w-[100px] rounded-t-full border-2`}>
			<div className=" mt-2 w-full flex flex-col items-center">
				<div className=" w-[80px] cursor-pointer text-center">
					<p>product selection</p>
					<p className="text-accent">
						{checkedProducts?.length}/{50}
					</p>

					<div className="divider my-5 "></div>
				</div>

				<div
					onClick={() => {
						document.getElementById("modal_discount").showModal()
						setIndex(1)
					}}
					className={`w-[80px] flex flex-col items-center text-gray-400 cursor-pointer text-center ${
						index === 1 && "text-accent-focus"
					}`}>
					<TbDiscount className="text-4xl items-center" />
					<p>discount</p>

					<div className="divider my-5 "></div>
				</div>

				<div
					onClick={() => {
						setOpenStatus(!openStatus)
						setIndex(2)
					}}
					className={`${
						index === 2 && "text-accent-focus"
					}  text-gray-400 w-[80px] flex flex-col items-center cursor-pointer text-center`}>
					<LiaExchangeAltSolid className="text-4xl" />
					<p>change state</p>

					<div className="divider my-5 "></div>
				</div>

				<div
					onClick={() => {
						document.getElementById("modal_delete").showModal()
						setIndex(3)
					}}
					className={`${
						index === 3 && "text-accent-focus"
					} text-gray-400 w-[80px] flex flex-col items-center cursor-pointer text-center`}>
					<RiDeleteBinLine className="text-4xl " />
					<p>delete</p>

					<div className="divider my-5 "></div>
				</div>
			</div>
		</div>
	)
}

export default BatchEditing
