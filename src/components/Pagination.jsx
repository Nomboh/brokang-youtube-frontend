import React from "react"

function Pagination({ currrentPage, totalPages, onPageChange }) {
	return (
		<div className=" w-full flex mt-6">
			<div className=" flex-1 "></div>
			<div className=" flex-0">
				<div className=" flex items-center justify-center space-x-2">
					{currrentPage > 1 && (
						<button
							onClick={() => onPageChange(currrentPage - 1)}
							className=" w-8 h-8 flex items-center justify-center rounded-full bg-accent text-white">
							{" "}
							&lt;
						</button>
					)}

					{Array.from(Array(totalPages).keys()).map((pageNumber) => (
						<button
							onClick={() => onPageChange(pageNumber + 1)}
							className={` w-8 h-8 flex items-center justify-center rounded-full ${
								pageNumber + 1 === currrentPage
									? " bg-accent text-white"
									: "bg-gray-300 text-gray-700 hover:bg-accent hover:text-white"
							}`}>
							{pageNumber + 1}
						</button>
					))}

					{currrentPage < totalPages && (
						<button
							onClick={() => onPageChange(currrentPage + 1)}
							className=" w-8 h-8 flex items-center justify-center rounded-full bg-accent text-white">
							{" "}
							&gt;
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Pagination
