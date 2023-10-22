import { BsChatDots, BsFillHeartFill, BsHeart } from "react-icons/bs"
import { AiOutlineDollarCircle } from "react-icons/ai"

const isLike = true

const ProductBar = ({ product, user, isVisible }) => {
	const productBarStyles = isVisible
		? "fixed 800px:top-0 bottom-0 800px:-bottom-full left-0 right-0"
		: "800px:hidden fixed bottom-0 left-0 right-0"

	return (
		<div
			className={`p-2 flex transition-all  z-[5000] flex-col 800px:flex-row bg-slate-200 justify-between  items-center h-44 800px:h-40 ${productBarStyles}`}>
			<div className=" flex items-center gap-3 800px:gap-4 w-full 800px:w-2/5">
				<img
					className=" h-24 w-24 800px:h-32 800px:w-32 rounded-md"
					src={product?.images[0]}
					alt={product?.title}
				/>
				<div className=" flex-1">
					<h1 className="text-left font-bold hidden 800px:block text-xl">
						{product?.title}
					</h1>
					<h1 className=" text-left font-bold mt-5 800px:hidden text-xl">
						{product?.title.slice(0, 20)}
						{product?.title.length > 20 ? "..." : ""}
					</h1>
					<br />
					<div className=" hidden 800px:flex gap-6 items-center">
						{product?.size ? (
							<div className="badge badge-accent badge-outline h-9 rounded-md">
								size 256
							</div>
						) : null}

						<div className="badge badge-neutral h-9 rounded-md">
							{product?.condition}
						</div>
					</div>
				</div>

				<h1 className=" block text-right w-20 800px:hidden text-2xl 800px:text-3xl font-bold">
					{product?.discountPrice
						? product?.discountPrice
						: product?.originalPrice}{" "}
					$
				</h1>
			</div>

			<h1 className=" hidden 800px:block text-3xl font-bold">
				{product?.discountPrice
					? product?.discountPrice
					: product?.originalPrice}{" "}
				$
			</h1>

			{product?.userId !== user?._id && (
				<div className=" 800px:w-2/5 w-full flex gap-6 mt-4 ">
					{product?.status === "sale" && (
						<>
							{isLike !== undefined && (
								<button className="btn flex items-center btn-square w-16">
									{isLike ? (
										<BsFillHeartFill className="text-red-500" size={25} />
									) : (
										<BsHeart size={25} />
									)}

									<p className="text-lg">{12}</p>
								</button>
							)}

							<button className="btn w-36 800px:w-52 btn-outline btn-accent">
								<BsChatDots size={25} />
								Chat
							</button>
							<button className="btn flex-1 btn-active btn-block text-white btn-accent">
								<AiOutlineDollarCircle size={25} />
								Safe Payment
							</button>
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default ProductBar
