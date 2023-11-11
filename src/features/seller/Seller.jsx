import React from "react"
import Header from "../../components/Header"
import { useUser } from "../../app/hooks/loadUser"
import Footer from "../../components/Footer"
import ProfileSidebar from "../profile/ProfileSidebar"
import { useParams, useSearchParams } from "react-router-dom"
import { useGetSeller } from "./seller"
import { useProducts } from "../products/useProducts"
import SellerProducts from "./SellerProducts"
import SellerReview from "./SellerReview"

function Seller() {
	const { user } = useUser()
	const userId = useParams()?.id
	let [searchParams, setSearchParams] = useSearchParams()
	const tab = searchParams.get("tab")
	const { seller } = useGetSeller(userId)

	const { products, isLoading } = useProducts({
		pageNumber: 1,
		limit: 6,
		user: userId,
	})

	return (
		<div>
			<Header user={user} />
			<div className=" section normalFlexResponsive">
				<div className=" w-full 800px:w-3/12 self-start mb-14 800px:mr-12 800px:mb-0">
					{seller && <ProfileSidebar user={seller?.user} seller={user?._id} />}
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
						<SellerProducts products={products} isLoading={isLoading} />
					)}

					{tab === "reviews" && <SellerReview />}
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Seller
