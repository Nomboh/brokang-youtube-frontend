import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useFollowees, useUnfollow } from "./follow"
import Spinner from "../../components/Spinner"

function Following() {
	const [followId, setFollowId] = useState("")
	const path = useLocation().pathname.split("/")[2]

	const { followees, isGettingFollowees } = useFollowees()
	const { isUnfollowing, unfollowAUser } = useUnfollow()
	const handleUnfollow = (e, followerId) => {
		e.preventDefault()
		unfollowAUser(followerId)
		setFollowId(followerId)
	}

	if (isGettingFollowees) return null
	const { followees: followeesList } = followees
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
				{followeesList &&
					followeesList?.map((followee) => (
						<div
							key={followee?._id}
							className="flex items-center justify-between	">
							<Link
								to={`/seller/${followee.follower._id}?tab=products`}
								className="flex items-center gap-4">
								<img
									src={followee.follower.photo}
									alt="profile"
									className="w-16 h-16 rounded-full"
								/>
								<div className="flex flex-col">
									<h2 className="font-bold">{followee?.follower.name}</h2>
									<p className="text-gray-500">
										number of products{" "}
										<strong>({followee?.follower.numProducts})</strong>{" "}
									</p>
								</div>
							</Link>
							<button
								disabled={isUnfollowing && followId === followee.follower._id}
								onClick={(e) => handleUnfollow(e, followee?.follower._id)}
								className="btn btn-accent rounded-full">
								{isUnfollowing && followId === followee.follower._id
									? "Unfollowing"
									: "Unfollow"}
							</button>
						</div>
					))}

				{followeesList?.length === 0 && (
					<h1 className="text-2xl text-center text-gray-400 mt-20">
						You do not have any followees
					</h1>
				)}
			</div>
		</div>
	)
}

export default Following
