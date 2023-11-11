import React from "react"

function SellerReview() {
	return (
		<div className=" w-full">
			<h1 className=" mt-4 text-2xl font-bold">All Reviews ({12})</h1>
			<br />
			<div className=" flex flex-col gap-5">
				<div className=" flex gap-2">
					<img
						className=" h-14 w-14 rounded-full object-fill"
						src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
					/>

					<div className=" flex flex-col gap-1">
						<div className=" flex gap-2">
							<h1 className=" font-bold">John Doe</h1>
							<span className=" text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
						</div>
						<span className=" text-sm text-gray-500">tennis running shoes</span>

						<p>Timelyy delivery and product is exactly as expected</p>
					</div>
				</div>

				<div className=" flex gap-2">
					<img
						className=" h-14 w-14 rounded-full object-fill"
						src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
					/>

					<div className=" flex flex-col gap-1">
						<div className=" flex gap-2">
							<h1 className=" font-bold">John Doe</h1>
							<span className=" text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
						</div>
						<span className=" text-sm text-gray-500">tennis running shoes</span>

						<p>Timelyy delivery and product is exactly as expected</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SellerReview
