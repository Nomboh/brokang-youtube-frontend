import React, { useRef, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

function ProductImages({ product }) {
	const [index, setIndex] = useState(0)
	const [scrollPosition, setscrollPosition] = useState(0)
	const containerRef = useRef()
	let distance = containerRef.current?.getBoundingClientRect().x - 48

	const scrollLeft = () => {
		setscrollPosition(120 + distance)
	}

	const scrollRight = () => {
		setscrollPosition(120 - distance)
	}

	const handleChangeImage = (direction) => {
		if (direction === "left" && index > 0) {
			setIndex((index) => index - 1)
		}

		if (direction === "right" && index < product.images.length - 1) {
			setIndex((index) => index + 1)
		}
	}
	return (
		<>
			<div className=" mb-4 relative w-full">
				<img
					src={product.images[index]}
					alt={product.title}
					className="w-full h-[500px] object-contain"
				/>

				<div className=" absolute flex justify-between transform -translate-y-1/2 top-1/2 left-5 right-5">
					<div
						onClick={() => handleChangeImage("left")}
						className="btn btn-circle">
						{" "}
						<BsChevronLeft className="font-bold" />{" "}
					</div>
					<div
						onClick={() => handleChangeImage("right")}
						className="btn btn-circle">
						{" "}
						<BsChevronRight className="font-bold" />{" "}
					</div>
				</div>
			</div>
			<div className="mb-4 w-full hidden  800px:flex 800px:normalFlex">
				<div className="btn btn-ghost" onClick={scrollLeft}>
					<BsChevronLeft size={23} />
				</div>

				<div className=" carousel w-full flex gap-2 overflow-x-scroll">
					<div
						ref={containerRef}
						style={{
							transform: `translateX(${scrollPosition}px)`,
							transition: "all 1s ease",
						}}
						className="w-full flex gap-2">
						{product?.images.map((img, i) => (
							<div
								key={i}
								onMouseEnter={() => setIndex(i)}
								className=" relative min-w-[120px]">
								<img src={img} alt={img} />
								<div
									className={`absolute w-full backdrop-blur-sm inset-0 bg-black ${
										i === index ? "opacity-5" : "opacity-0"
									}`}></div>
							</div>
						))}
					</div>
				</div>
				<div onClick={scrollRight} className="btn btn-ghost">
					<BsChevronRight size={23} />
				</div>
			</div>
		</>
	)
}

export default ProductImages
