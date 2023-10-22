import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useUser } from "../../app/hooks/loadUser"
import {
	useOtherSellers,
	useProductDetail,
	useRecommended,
} from "./productDetail"
import { useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"

import ProductImages from "./ProductImages"
import { BsChatDots, BsFillHeartFill, BsStarFill } from "react-icons/bs"
import { AiOutlineDollarCircle } from "react-icons/ai"
import { format } from "timeago.js"
import { LiaShippingFastSolid } from "react-icons/lia"
import { RiBox3Line } from "react-icons/ri"
import SellerOtherItems from "./SellersOtherProduct"
import RecommendedProducts from "./RecommendedProducts"
import ProductBar from "./productBar"

function ProductDetail() {
	const params = useParams()
	const { user } = useUser()
	const { product, isLoading } = useProductDetail(params?.id)
	const { sellersProducts } = useOtherSellers(product?.user.id)
	const { recommendedProducts } = useRecommended(product?.category)

	const [isVisble, setIsVisble] = useState(false)

	useEffect(() => {
		const scrollContainer = () => {
			const innerHeight = window.innerHeight
			const scrollHeight = window.scrollY

			const isScrolledVisible = scrollHeight > innerHeight
			setIsVisble(isScrolledVisible)
		}

		window.addEventListener("scroll", scrollContainer)

		return () => {
			window.removeEventListener("scroll", scrollContainer)
		}
	}, [])

	if (isLoading) return <Spinner />
	return (
		<div>
			<Header user={user} />
			<div className="section normalFlexResponsive gap-5 items-start">
				{/* left side Product iMages */}
				<div className=" w-full 800px:w-1/2 self-start">
					<ProductImages product={product} />

					<div className="divider w-full"></div>

					{/* user shop info */}
					<div className="px-2 normalFlex justify-between">
						<div className="flex gap-1 items-center">
							<div className="avatar">
								<div className=" w-24 rounded-full ring-offset-base-100 ring-offset-2 ">
									<img src={product.user.photo} alt="avater" />
								</div>
							</div>

							<div className="flex flex-col gap-1">
								<h3>{product?.user.storename}</h3>
								<p>
									Sale Products <strong>{product.user.numProducts}</strong>
								</p>
								<div className="flex gap-2">
									{Array.from(Array(5)).map((rating) => (
										<BsStarFill
											key={rating}
											className="text-primary"
											size={23}
										/>
									))}
								</div>
							</div>
						</div>

						<button className="btn btn-accent">follow</button>
					</div>
				</div>

				{/* Right side Product details */}
				<div className="w-full 800px:w-1/2 self-start scrollbar-none p-2 overflow-y-scroll h-[650px] ">
					<h2 className="font-medium text-2xl">{product.title}</h2>
					<div className="flex gap4 items-center">
						<h1 className="text-4xl mt-3">
							{product?.discountPrice
								? product?.discountPrice
								: product.originalPrice}{" "}
							$
						</h1>
						{product?.discountPrice && (
							<h1 className="text-4xl mt-3">{product?.discountPrice}</h1>
						)}
					</div>
					<p className="text-gray-400 text-right">
						{format(product.createdAt)}
					</p>

					<div className=" w-full flex gap-6 mt-4 justify-between">
						<button className="btn flex items-center btn-square w-16">
							<BsFillHeartFill size={25} className="text-red-500" />
							<p className="text-lg">{12}</p>
						</button>

						<button className="btn flex items-center btn-outline btn-accent w-36 800px:w-52">
							<BsChatDots size={25} className="" />
							<p className="text-lg">Chat</p>
						</button>

						<button className="btn flex items-center btn-active btn-accent w-48 800px:w-52">
							<AiOutlineDollarCircle size={25} className="" />
							<p className="text-lg">Pay Safe</p>
						</button>
					</div>

					<br />
					<div className="divider w-full"></div>
					<br />

					<p className="text-lg whitespace-pre-line break-normal leading-10">
						{product.description}
					</p>

					<br />
					<div className="">
						<h2 className="font-bold mb-2">Tags</h2>
						<div className="flex flex-wrap gap-2">
							{product.tags &&
								product.tags.map((tag) => (
									<div
										key={tag}
										className="badge cursor-pointer badge-outline h-8 rounded-lg">
										# {tag}
									</div>
								))}
						</div>
					</div>
					<br />
					<div className=" ">
						<h2 className=" font-bold mb-2">Shipping Information</h2>
						<div className="">
							<div className=" h-32 bg-slate-100 rounded-xl flex items-center px-5 flex-wrap gap-5">
								<LiaShippingFastSolid size={50} />
								<h4 className=" text-xl font-bold w-24">Shipping Method</h4>

								<p>
									{product.shippingFee === 0 ? "Seller" : "Buyer"} takes care of
									shipping
								</p>
							</div>

							<br />

							<div className=" h-32 bg-slate-100 rounded-xl flex items-center px-5 flex-wrap gap-5">
								<RiBox3Line size={50} />
								<h4 className=" text-xl font-bold w-24">Delivery fee</h4>
								<p>{product.shippingFee === 0 ? "4" : product.shippingFee} $</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* seller other items */}
			<SellerOtherItems products={sellersProducts} />

			{/* recommended products */}
			<RecommendedProducts products={recommendedProducts} />

			{/* product bar */}
			<ProductBar isVisible={isVisble} product={product} user={user} />

			<Footer />
		</div>
	)
}

export default ProductDetail
