import React from "react"
import { BsStarFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import LongSting from "../../components/LongSting"

function ProfileSidebar({ user }) {
	return (
		<div className="flex flex-col items-center p-4">
			<div className="avatar">
				<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
					<img alt={user?.name} src={user?.photo} />
				</div>
			</div>

			<h1 className="font-bold text-xl mb-3 mt-1">{user.name}</h1>
			<p className="text-slate-500">Started on monday</p>
			<br />
			<div className="flex flex-col gap-2 items-center w-full">
				<Link
					className="btn btn-primary text-white/90 rounded-full w-4/5"
					to={"/s/follower"}>
					Follower
				</Link>
				<Link
					className="btn btn-primary text-white/90 rounded-full w-4/5"
					to={"/s/following"}>
					Following
				</Link>
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
						<div className="flex gap-1">
							{Array.from(Array(5)).map((item) => (
								<BsStarFill key={item} className="text-primary" />
							))}
						</div>
					</div>

					<p className=" font-bold justify-self-end">(2)</p>
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
