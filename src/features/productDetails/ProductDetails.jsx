import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useUser } from "../../app/hooks/loadUser"
import { useProduct, useRecommended, useSellerProducts } from "./productDetail"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import ProductImages from "./ProductImages"
import { BsChatDots, BsFillHeartFill, BsHeart } from "react-icons/bs"
import { AiOutlineDollarCircle } from "react-icons/ai"
import { LiaShippingFastSolid } from "react-icons/lia"
import { FaExchangeAlt } from "react-icons/fa"
import { BiEdit } from "react-icons/bi"
import { RiBox3Line } from "react-icons/ri"
import { format } from "timeago.js"
import SellerOtherItems from "./SellerOtherItems"
import RecommendedProducts from "./RecommendedProducts"
import Spinner from "../../components/Spinner"
import ProductBar from "./ProductBar"
import { useLike, useUnlike } from "../../app/hooks/like"
import { useCreateFollower, useFollowees, useUnfollow } from "../follow/follow"
import { checkIfIsFollowing } from "../../utils/checkIfIsFollowing"
import Rating from "../../components/Rating"
import { useGetReviews } from "../order/review"
import toast from "react-hot-toast"
import { useEditProduct } from "../sell/createProduct"
import { useCreateConversation } from "../chat/chat"

const status = ["sale", "under reservation", "sold out", "hide"]

function ProductDetails() {
	const params = useParams()

	const [isVisible, setIsVisible] = useState(false)

	const { user } = useUser()
	const { product, isLoading } = useProduct(params?.id)
	const { sellerProducts } = useSellerProducts(product?.user._id, params?.id)
	const { recommenedProducts } = useRecommended(
		product?.category,
		params?.id,
		user?._id
	)

	const { editAProduct } = useEditProduct()

	const { likeAProduct } = useLike(params?.id)
	const { unlikeAProduct } = useUnlike(params?.id)

	const { followees } = useFollowees()
	const { followAUser, isFollowing: iscreating } = useCreateFollower()
	const { isUnfollowing, unfollowAUser } = useUnfollow()
	const { conversation, isCreating } = useCreateConversation()

	const { sellerReviews } = useGetReviews(product?.user._id)

	const ratings = sellerReviews?.reduce((acc, review) => {
		return acc + review?.rating
	}, 0)

	const isFollowing = checkIfIsFollowing(
		followees?.followees,
		product?.user._id
	)

	const likes = JSON.parse(localStorage.getItem("likes"))
	const isProductLiked = likes?.some((lk) => lk.product._id === params?.id)

	const [isLike, setIslike] = useState(isProductLiked)
	const [numLikes, setNumlikes] = useState(likes?.length)

	useEffect(() => {
		const scrollContainer = () => {
			const innerHeight = window.innerHeight
			const scrollHeight = window.scrollY

			const isScrolledVisible = scrollHeight > innerHeight
			setIsVisible(isScrolledVisible)
		}

		window.addEventListener("scroll", scrollContainer)

		return () => {
			window.removeEventListener("scroll", scrollContainer)
		}
	}, [])

	const navigate = useNavigate()

	if (isLoading) return <Spinner />

	const percentageOff = product?.discountPrice
		? ((product?.originalPrice - product?.discountPrice) /
				product?.originalPrice) *
		  100
		: 0

	const handleFollow = (e) => {
		e.preventDefault()
		followAUser(product?.user._id)
	}
	const handleUnFollow = (e) => {
		e.preventDefault()
		unfollowAUser(product?.user._id)
	}

	const handleStatus = (st) => {
		if (st === product?.status) {
			toast.error("This is already the current status")
		} else {
			editAProduct({ status: st, productId: params?.id })
		}
	}

	const handleChat = () => {
		conversation(
			{
				sellerId: product?.user._id,
				userId: user?._id,
			},
			{
				onSuccess: (data) => {
					navigate(`/chat?id=${data?._id}`)
				},

				onError: () => {
					navigate(`/login`)
				},
			}
		)
	}

	const handleLike = () => {
		if (!user) return navigate("/login")
		setIslike(!isLike)
		likeAProduct(params?.id)
		setNumlikes((prev) => prev + 1)
	}

	const handleUnlike = () => {
		if (!user) return navigate("/login")
		setIslike(!isLike)
		unlikeAProduct(params?.id)
		setNumlikes((prev) => prev - 1)
	}

	return (
		<div>
			<Header user={user} />
			<div className=" section normalFlexResponsive gap-6 items-start">
				{/* Left side */}
				<div className=" w-full 800px:w-1/2 self-start">
					<ProductImages product={product} />

					<div className=" divider w-full"></div>

					{/* user shop */}
					<div className=" px-2 normalFlex justify-between">
						<Link
							to={`/seller/${product?.user._id}?tab=products`}
							className="flex gap-2 items-center">
							<div className=" avatar">
								<div className=" w-24 rounded-full ring-offset-base-100 ring-offset-2">
									<img src={product?.user.photo} alt="avatar" />
								</div>
							</div>
							<div className=" flex flex-col gap-1">
								<h3>{product?.user.storename}</h3>
								<p>
									Sale Product <strong>{product?.user?.numProducts}</strong>
								</p>
								<div className=" flex items-center  gap-3">
									<Rating rating={ratings / sellerReviews?.length} />
									<p className="font-bold">({sellerReviews?.length})</p>
								</div>
							</div>
						</Link>

						{isFollowing ? (
							<button
								disabled={isUnfollowing}
								onClick={handleUnFollow}
								className="btn btn-accent">
								{isUnfollowing ? "Unfollowing" : "Unfollow"}
							</button>
						) : (
							<button
								onClick={handleFollow}
								disabled={iscreating}
								className="btn btn-accent">
								{iscreating ? "Following" : "Follow"}
							</button>
						)}
					</div>
				</div>

				{/* Right side */}
				<div className=" h-[650px] overflow-y-scroll scrollbar-none w-full 800px:w-1/2 self-start">
					<h2 className=" font-medium text-2xl">{product?.title}</h2>
					<div className=" flex gap-16 items-center">
						<h1 className=" text-4xl mt-3">
							{product?.discountPrice
								? product?.discountPrice
								: product?.originalPrice}{" "}
							$
						</h1>

						{product?.discountPrice && (
							<h1 className="text-4xl text-gray-500 mt-3">
								{percentageOff !== 0 && Math.round(percentageOff)}% OFF
							</h1>
						)}
					</div>
					<div className=" flex items-center justify-between mt-1">
						{product?.size && (
							<div className=" badge badge-accent rounded-md badge-outline p-4">
								size {product?.size}
							</div>
						)}

						<p className="text-gray-400">{format(product?.createdAt)}</p>
					</div>
					{product?.user._id === user?._id && (
						<div className=" w-full flex gap-6 mt-4">
							<div className=" dropdown">
								<label
									htmlFor=""
									tabIndex={0}
									className="btn w-36 800px:w-52 btn-outline btn-accent">
									<FaExchangeAlt size={25} />
									Change State
								</label>

								<ul
									tabIndex={0}
									className=" dropdown-content z-10 menu p-2 shodow bg-base-100 rounded-box w-52">
									{status.map((st) => (
										<li
											onClick={() => handleStatus(st)}
											key={st}
											className={`${
												st === product?.status ? "bg-slate-300" : ""
											}`}>
											<a>{st}</a>
										</li>
									))}
								</ul>
							</div>
							<button
								onClick={() => navigate(`/edit-product?id=${product?._id}`)}
								className="btn flex-1 btn-accent btn-active btn-block text-white">
								<BiEdit size={25} />
								Edit Product
							</button>
						</div>
					)}

					{product?.user._id !== user?._id && product?.status === "sale" ? (
						<div className=" w-full flex gap-6 mt-4 justify-between">
							{isLike ? (
								<button
									onClick={handleUnlike}
									className=" w-16 btn  p-1 flex flex-col items-center">
									<BsFillHeartFill className="text-red-500" size={23} />
									<p>{numLikes}</p>
								</button>
							) : (
								<button
									onClick={handleLike}
									className=" w-16 btn  p-1 flex flex-col items-center">
									<BsHeart className="text-black" size={23} />
									<p>{numLikes}</p>
								</button>
							)}

							<button
								onClick={handleChat}
								className="btn flex items-center btn-outline btn-accent w-36 800px:w-52">
								<BsChatDots size={25} />
								<p className="text-lg">Chat</p>
							</button>

							<button
								onClick={() => navigate(`/checkout?id=${product?._id}`)}
								className="btn flex items-center btn-outline btn-accent w-48 800px:w-52">
								<AiOutlineDollarCircle size={25} />
								<p className="text-lg">Pay Safe</p>
							</button>
						</div>
					) : (
						<div
							role="alert"
							className="alert w-full border-none mt-6 bg-slate-950 ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="stroke-red-500 shrink-0 w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
							<span className=" text-white">
								This product is {product?.status}
							</span>
						</div>
					)}

					<br />
					<div className="divider w-full"></div>
					<br />

					<p className=" text-lg whitespace-pre-line break-normal leading-10">
						{product?.description}
					</p>

					<br />

					<div className="">
						<h2 className=" font-bold mb-2">Tags</h2>
						<div className=" flex flex-wrap gap-2">
							{product?.tags &&
								product?.tags.map((tag) => (
									<Link
										to={`/search?tag=${tag}`}
										key={tag}
										className=" badge cursor-pointer badge-outline h-8 rounded-lg">
										{" "}
										#{tag}
									</Link>
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
									{product?.shippingFee === 0 ? "Seller" : "Buyer"} takes care
									of shipping
								</p>
							</div>

							<br />

							<div className=" h-32 bg-slate-100 rounded-xl flex items-center px-5 flex-wrap gap-5">
								<RiBox3Line size={50} />
								<h4 className=" text-xl font-bold w-24">Delivery fee</h4>
								<p>
									{product?.shippingFee === 0 ? "4" : product?.shippingFee} $
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<SellerOtherItems sellerProducts={sellerProducts} />
			<RecommendedProducts recommenedProducts={recommenedProducts} />
			<ProductBar
				product={product}
				user={user}
				isVisible={isVisible}
				likeAProduct={likeAProduct}
				unlikeAProduct={unlikeAProduct}
				isLike={isLike}
				numLikes={numLikes}
				setIsLike={setIslike}
				setNumLikes={setNumlikes}
				status={status}
				handleChat={handleChat}
			/>
			<Footer />
		</div>
	)
}

export default ProductDetails
