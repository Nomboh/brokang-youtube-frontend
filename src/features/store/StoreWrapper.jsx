import React from "react"
import ProfileSidebar from "../profile/ProfileSidebar"
import { useSearchParams } from "react-router-dom"
import SaleProducts from "./SallProducts"
import LikeProducts from "./LikeProducts"

function StoreWrapper({ user }) {
	const [searchParamas, setSearchParamas] = useSearchParams()

	const tab = searchParamas.get("tab") || "products"
	return (
		<div className=" normalFlexResponsive section">
			<div className=" w-full 800px:w-3/12 self-start mb-14 800px:mr-12 800px:mb-0">
				<ProfileSidebar user={user} />
			</div>
			<div className=" w-full self-start 800px:w-9/12">
				{/* banner image */}
				<div className=" h-52 800px:h-64 w-full">
					<img
						className=" rounded-md w-full h-full object-cover"
						src={user?.bannerImage}
						alt="banner"
					/>
				</div>

				<br />

				<div className=" w-full flex gap-12">
					<h3
						onClick={() => setSearchParamas("tab=products")}
						className={` ${
							tab === "products" && "underline"
						} text-xl cursor-pointer pl-2`}>
						Sale Products
					</h3>
					<h3
						onClick={() => setSearchParamas("tab=likes")}
						className={` ${
							tab === "likes" && "underline"
						} text-xl cursor-pointer pl-2`}>
						Liked Products
					</h3>
				</div>

				{/* tab content */}
				<br />
				<div className=" w-full">
					{tab === "products" && <SaleProducts user={user} />}
					{tab === "likes" && <LikeProducts />}
				</div>
			</div>
		</div>
	)
}

export default StoreWrapper
