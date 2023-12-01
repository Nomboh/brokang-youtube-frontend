import React from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { BsStarHalf } from "react-icons/bs"

function Rating({ rating }) {
	const stars = []

	for (let i = 1; i <= 5; i++) {
		if (i <= rating) {
			stars.push(
				<AiFillStar
					size={20}
					key={i}
					className=" cursor-pointer mr-2 text-primary"
				/>
			)
		} else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
			stars.push(
				<BsStarHalf
					size={20}
					key={i}
					className=" cursor-pointer mr-2 text-primary"
				/>
			)
		} else {
			stars.push(
				<AiOutlineStar
					size={20}
					key={i}
					className=" cursor-pointer mr-2 text-primary"
				/>
			)
		}
	}
	return <div className=" flex">{stars}</div>
}

export default Rating
