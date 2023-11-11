import { Link, useLocation } from "react-router-dom"
import React, { useState } from "react"
import { checkIfIsFollowing } from "../../utils/checkIfIsFollowing"
import {
	useCreateFollower,
	useFollowees,
	useFollowers,
	useUnfollow,
} from "./follow"
import Spinner from "../../components/Spinner"

function Follower() {
	const path = useLocation().pathname.split("/")[2]
	const [followId, setfollowId] = useState("")

	const { followees } = useFollowees()
	const { followers, isGettingFollowers } = useFollowers()
	const { followAUser, isFollowing: iscreating } = useCreateFollower()
	const { isUnfollowing, unfollowAUser } = useUnfollow()

	const handleFollow = (e, followerId) => {
		e.preventDefault()
		followAUser(followerId)
		setfollowId(followerId)
	}

	const handleUnfollow = (e, followerId) => {
		e.preventDefault()
		unfollowAUser(followerId)
		setfollowId(followerId)
	}

	if (isGettingFollowers) return <Spinner />

	const { followers: allFollowers } = followers
	return (
		<div className=" mt-3">
			<Link
				className={` mr-8 text-xl font-bold ${
					path === "follower" ? " underline" : ""
				}`}
				to={`/follow/follower`}>
				follower
			</Link>

			<Link
				className={`text-xl font-bold ${
					path === "following" ? " underline" : ""
				}`}
				to={`/follow/following`}>
				following
			</Link>
			<div className="flex flex-col mt-4 gap-4">
				{allFollowers &&
					allFollowers.map((follower) => (
						<div
							key={follower?._id}
							className="flex items-center justify-between	">
							<Link
								to={`/seller/${follower.followee._id}?tab=products`}
								className="flex cursor-pointer items-center gap-4">
								<img
									src={follower.followee.photo}
									alt="profile"
									className="w-16 h-16 rounded-full"
								/>
								<div className="flex flex-col">
									<h2 className="font-bold">{follower?.followee.name}</h2>
									<p className="text-gray-500">
										number of products{" "}
										<strong>({follower?.followee.numProducts})</strong>{" "}
									</p>
								</div>
							</Link>
							{checkIfIsFollowing(
								followees?.followees,
								follower?.followee._id
							) ? (
								<button
									disabled={isUnfollowing && followId === follower.followee._id}
									onClick={(e) => handleUnfollow(e, follower?.followee._id)}
									className="btn btn-accent rounded-full">
									{isUnfollowing && followId === follower.followee._id
										? "Unfollowing"
										: "Unfollow"}
								</button>
							) : (
								<button
									disabled={iscreating && followId === follower.followee._id}
									onClick={(e) => handleFollow(e, follower?.followee._id)}
									className="btn btn-accent btn-outline rounded-full">
									{iscreating && followId === follower.followee._id
										? "Following"
										: "Follow"}
								</button>
							)}
						</div>
					))}
			</div>
		</div>
	)
}

export default Follower
