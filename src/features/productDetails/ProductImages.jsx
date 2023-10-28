import React, { useRef, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

function ProductImages({ product }) {
	const [index, setIndex] = useState(0)
	const containerRef = useRef(null)
	const [scrollPosition, setScrollPosition] = useState(0)

	const distance = containerRef.current?.getBoundingClientRect().x - 48

	const scrollContainer = (direction) => {
		if (direction === "left") {
			setScrollPosition(120 + distance)
		}

		if (direction === "right") {
			setScrollPosition(120 - distance)
		}
	}

	const handleChangeImage = (direction) => {
		if (direction === "left" && index > 0) {
			setIndex((index) => index - 1)
		}

		if (direction === "right" && index < product?.images.length - 1) {
			setIndex((index) => index + 1)
		}
	}
	return (
		<>
			<div className=" mb-4 relative w-full ">
				<img
					src={product?.images[index]}
					alt={product?.title}
					className=" w-full h-[500px] object-contain"
				/>

				<div className=" absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
					<div
						onClick={() => handleChangeImage("left")}
						className="btn btn-circle">
						<BsChevronLeft size={25} />
					</div>
					<div
						onClick={() => handleChangeImage("right")}
						className=" btn btn-circle">
						<BsChevronRight size={25} />
					</div>
				</div>
			</div>

			<div className="mb-4 w-full hidden 800px:flex items-center">
				<div onClick={() => scrollContainer("left")} className=" btn btn-ghost">
					<BsChevronLeft size={23} />
				</div>
				<div className="carousel w-full flex gap-2 overflow-x-scroll">
					<div
						ref={containerRef}
						style={{
							transform: `translateX(${scrollPosition}px)`,
							transition: "all 1s ease",
						}}
						className=" flex gap-2">
						{product?.images.map((img, i) => (
							<img
								key={i}
								onMouseEnter={() => setIndex(i)}
								src={img}
								className={`w-[120px] ${
									index === i ? "brightness-75 filter blur-sm " : ""
								} `}
								alt={`product-${i}`}
							/>
						))}
					</div>
				</div>
				<div
					onClick={() => scrollContainer("right")}
					className=" btn btn-ghost">
					<BsChevronRight size={23} />
				</div>
			</div>
		</>
	)
}

export default ProductImages
