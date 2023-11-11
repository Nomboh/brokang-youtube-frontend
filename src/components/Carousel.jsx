import React from "react"

function Carousel() {
	return (
		<div className="carousel section h-[300px] 800px:h-[400px] w-full">
			<div id="slide1" className="carousel-item relative w-full">
				<img
					src="https://res.cloudinary.com/queentech/image/upload/v1699363811/Black_Yellow_Bold_Bag_Fashion_Sale_Banner_by0k8m.png"
					className="w-full"
				/>
				<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
					<a href="#slide4" className="btn btn-circle">
						❮
					</a>
					<a href="#slide2" className="btn btn-circle">
						❯
					</a>
				</div>
			</div>
			<div id="slide2" className="carousel-item relative w-full">
				<img
					src="https://res.cloudinary.com/queentech/image/upload/v1699363810/Gray_Red_Black_White_Dark_Red_Photo_Shopping_Black_Friday_Sale_Banner_rglo3f.png"
					className="w-full"
				/>
				<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
					<a href="#slide1" className="btn btn-circle">
						❮
					</a>
					<a href="#slide3" className="btn btn-circle">
						❯
					</a>
				</div>
			</div>
			<div id="slide3" className="carousel-item relative w-full">
				<img
					src="https://res.cloudinary.com/queentech/image/upload/v1699363808/Blue_Simple_Special_Offer_Big_Sale_Banner_Landscape_fdqwwq.png"
					className="w-full"
				/>
				<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
					<a href="#slide2" className="btn btn-circle">
						❮
					</a>
					<a href="#slide4" className="btn btn-circle">
						❯
					</a>
				</div>
			</div>
		</div>
	)
}

export default Carousel
