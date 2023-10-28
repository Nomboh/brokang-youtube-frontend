import React, { useState } from "react"

function LongSting({ text, maxLength }) {
	const [showFull, setShowFull] = useState(false)

	const toggleContent = () => {
		setShowFull(!showFull)
	}

	const truncateArr = text.split(" ")
	const truncateText = truncateArr.slice(0, maxLength).join(" ")
	return (
		<div className="text-left mt-3 w-full font-light">
			{showFull ? text : truncateText}
			{truncateArr?.length > maxLength && (
				<button
					onClick={toggleContent}
					className=" btn btn-sm ml-2 lowercase btn-ghost">
					{showFull ? "show less" : "show more"}
				</button>
			)}
		</div>
	)
}

export default LongSting
