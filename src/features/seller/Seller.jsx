import React from "react"
import Header from "../../components/Header"
import { useUser } from "../../app/hooks/loadUser"
import Footer from "../../components/Footer"
import ProfileSidebar from "../profile/ProfileSidebar"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { useGetSeller } from "./seller"
import { useProducts } from "../products/useProducts"
import SellerProducts from "./SellerProducts"
import SellerReview from "./SellerReview"
import { useGetReviews } from "../order/review"
import { useCreateConversation } from "../chat/chat"

function Seller() {
	const { user } = useUser()
	const userId = useParams()?.id
	const navigate = useNavigate()
	const [pageNumber, setPageNumber] = React.useState(1)
	let [searchParams, setSearchParams] = useSearchParams()
	const tab = searchParams.get("tab")
	const { seller } = useGetSeller(userId)
	const { conversation } = useCreateConversation()

	const { products, isLoading } = useProducts({
		pageNumber,
		limit: 6,
		user: userId,
	})

	const { isLoading: isLoadingReviews, sellerReviews } = useGetReviews(
		seller?.user?._id
	)

	const handleChat = () => {
		conversation(
			{
				sellerId: seller?.user._id,
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

	return (
		<div>
			<Header user={user} />
			<div className=" section normalFlexResponsive">
				<div className=" w-full 800px:w-3/12 self-start mb-14 800px:mr-12 800px:mb-0">
					{seller && (
						<ProfileSidebar
							handleChat={handleChat}
							user={seller?.user}
							seller={"sellerId"}
						/>
					)}
				</div>
				<div className=" w-full 800px:w-9/12 self-start">
					<div className=" h-52 800px:h-64 w-full rounded-md">
						<img
							alt="banner"
							className=" h-full w-full object-cover rounded-md"
							src={seller?.user.bannerImage}
						/>
					</div>
					<div className=" mt-6 flex gap-12 items-center">
						<h1
							onClick={() => setSearchParams({ tab: "products" })}
							className={`text-2xl cursor-pointer font-bold ${
								tab === "products" ? "underline" : ""
							}`}>
							Seller Products
						</h1>
						<h1
							onClick={() => setSearchParams({ tab: "reviews" })}
							className={`text-2xl cursor-pointer font-bold ${
								tab === "reviews" ? "underline" : ""
							}`}>
							Seller Reviews
						</h1>
					</div>

					{tab === "products" && products && (
						<SellerProducts
							pageNumber={pageNumber}
							setPageNumber={setPageNumber}
							products={products}
							isLoading={isLoading}
						/>
					)}

					{tab === "reviews" && (
						<SellerReview
							isLoadingReviews={isLoadingReviews}
							sellerReviews={sellerReviews}
						/>
					)}
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Seller
