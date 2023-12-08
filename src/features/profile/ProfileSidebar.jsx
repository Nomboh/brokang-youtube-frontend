import React from "react"
import { BsFillChatDotsFill, BsStarFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import LongSting from "../../components/LongSting"
import { useCreateFollower, useFollowees, useUnfollow } from "../follow/follow"
import { checkIfIsFollowing } from "../../utils/checkIfIsFollowing"
import { LuBell, LuBellRing } from "react-icons/lu"
import {
	useCheckSubscription,
	useCreateSubscription,
	useUnSubscription,
} from "../seller/seller"
import { useGetReviews } from "../order/review"
import Rating from "../../components/Rating"
import { useNavigate } from "react-router-dom"

function ProfileSidebar({ user, seller, handleChat }) {
	const { followees } = useFollowees()
	const { followAUser, isFollowing: isfollowing } = useCreateFollower()
	const { isUnfollowing, unfollowAUser } = useUnfollow()

	const navigate = useNavigate()

	const { isSubscribe } = useCheckSubscription(user?._id)
	const { createASubscription } = useCreateSubscription()
	const { unSubscriptionToSeller } = useUnSubscription()

	const { sellerReviews } = useGetReviews(user?._id)

	const ratings = sellerReviews?.reduce((acc, review) => {
		return acc + review?.rating
	}, 0)

	const isFollowing = checkIfIsFollowing(followees?.followees, user?._id)

	const handleFollow = () => {
		followAUser(user?._id, { onError: () => navigate("/login") })
	}

	const handleUnfollow = () => {
		unfollowAUser(user?._id, { onError: () => navigate("/login") })
	}

	const handleSubscription = () => {
		createASubscription(user?._id, { onError: () => navigate("/login") })
	}

	const handleUnSubscription = () => {
		unSubscriptionToSeller(user?._id, { onError: () => navigate("/login") })
	}

	return (
		<div className="flex flex-col items-center p-4">
			<div className="avatar">
				<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
					<img alt={user?.name} src={user?.photo} />
				</div>
			</div>

			<h1 className="font-bold text-xl mb-3 mt-1">{user?.name}</h1>
			<p className="text-slate-500">Started on monday</p>
			<br />
			<div className="flex flex-col gap-2 items-center w-full">
				{seller ? (
					<>
						{isFollowing ? (
							<div className=" w-4/5 flex items-center justify-between">
								<button
									disabled={isUnfollowing}
									onClick={handleUnfollow}
									className="btn btn-primary text-white/90 rounded-full ">
									Un Follow
								</button>

								{isSubscribe?.success ? (
									<button
										onClick={handleUnSubscription}
										className=" btn btn-primary rounded-full">
										<LuBell size={23} />
									</button>
								) : (
									<button
										onClick={handleSubscription}
										className=" btn btn-primary btn-outline rounded-full">
										<LuBellRing size={23} />
									</button>
								)}
							</div>
						) : (
							<button
								disabled={isfollowing}
								onClick={handleFollow}
								className="btn btn-primary text-white/90 rounded-full w-4/5">
								Follow
							</button>
						)}

						<button
							onClick={handleChat}
							className="btn btn-primary btn-outline rounded-full w-4/5">
							<BsFillChatDotsFill size={23} className="mr-2" />
							Chat
						</button>
					</>
				) : (
					<>
						<Link
							className="btn btn-primary text-white/90 rounded-full w-4/5"
							to={"/follow/follower"}>
							Follower
						</Link>
						<Link
							className="btn btn-primary text-white/90 rounded-full w-4/5"
							to={"/follow/following"}>
							Following
						</Link>
					</>
				)}
			</div>
			<br />
			<br />
			<div className="w-full text-left">
				<div className="flex items-center justify-between mb-2">
					<p>Goods</p>
					<p className=" font-bold justify-self-end">{user.numProducts}</p>
				</div>

				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<p>Ratings</p>
						<Rating rating={ratings / sellerReviews?.length} />
					</div>

					<p className=" font-bold justify-self-end">
						({sellerReviews?.length})
					</p>
				</div>
			</div>
			<br />
			{user?.introduction ? (
				<LongSting maxLength={10} text={user?.introduction} />
			) : (
				<p className=" font-light w-full text-left ">
					Write an introduction for this store
				</p>
			)}
			<br />
			<button className="btn w-full btn-outline btn-neutral">
				My information settings
			</button>
		</div>
	)
}

export default ProfileSidebar
