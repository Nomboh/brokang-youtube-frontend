import React from "react"
import { productCategories } from "../utils/productCategories"

function Categories() {
	return (
		<section className="section">
			<div className=" shadow-lg rounded-lg normalFlex p-6 flex-wrap gap-6 800px:gap-16">
				{productCategories.map((category) => (
					<div key={category.id} className="normalFlex gap-4 cursor-pointer">
						<p>{category.title}</p>
						<img
							className="w-[70px] 800px:w-[120px]"
							src={category.image_Url}
							alt={category.title}
						/>
					</div>
				))}
			</div>
		</section>
	)
}

export default Categories
