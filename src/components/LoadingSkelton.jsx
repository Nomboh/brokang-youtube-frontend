import React from "react"

function LoadingSkelton() {
	return (
		<div className="animate-pulse space-y-4 ">
			<div className="h-56 bg-gray-300 w-full rounded-x"></div>
			<div className="h-4 bg-gray-300 w-1/2"></div>
			<div className="h-4 bg-gray-300 w-1/4"></div>
			<div className="h-4 bg-gray-300 w-3/4"></div>
			<div className="h-4 bg-gray-300 w-1/2"></div>
		</div>
	)
}

export default LoadingSkelton
