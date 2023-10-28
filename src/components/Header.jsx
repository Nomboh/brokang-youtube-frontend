import React from "react"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BsChatDots } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useLogout } from "../app/hooks/logoutUser"

function Header({ user }) {
	const { logout } = useLogout()
	const handleLogout = (e) => {
		e.preventDefault()
		logout()
	}
	return (
		<div>
			{/* nav up bar */}
			<div className="navbar bg-base-100">
				{/* logo */}
				<Link to={"/"} className="flex-1">
					<img
						src="https://res.cloudinary.com/queentech/image/upload/v1692021184/profile/brokang1_1_zmaurb.svg"
						alt="logo"
						className="w-20 h-20"
					/>
				</Link>
				<div className="flex-none gap-8">
					{/* notification */}
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle">
							<div className="indicator">
								<IoMdNotificationsOutline size={25} />
								<span className="badge badge-primary badge-xs indicator-item"></span>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<Link to={"/profile"} className="justify-between">
									Profile
								</Link>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a>Logout</a>
							</li>
						</ul>
					</div>

					{/* chat */}
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle">
							<div className="indicator">
								<BsChatDots size={25} />
								<span className="badge badge-primary badge-sm indicator-item">
									5
								</span>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<Link to={"/profile"} className="justify-between">
									Profile
								</Link>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a>Logout</a>
							</li>
						</ul>
					</div>

					{user ? (
						<div className="dropdown dropdown-end">
							<div className="flex items-center gap-1">
								<label
									tabIndex={0}
									className="btn btn-accent btn-circle avatar">
									<div className="w-10 rounded-full">
										<img src={user.photo} />
									</div>
								</label>
								<p className="text-bold">{user.storename}</p>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<Link to={"/profile"} className="justify-between">
										Profile
									</Link>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li onClick={handleLogout}>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					) : (
						<div>
							<Link to={"/login"} className="btn btn-ghost mr-1">
								Login
							</Link>
							<Link to={"/register"} className="btn btn-ghost">
								Register
							</Link>
						</div>
					)}
				</div>
			</div>

			{/* nab bellow bar */}
			<div className="800px:navbar hidden bg-base-100">
				<div className="navbar-start w-1/3">
					<a className="btn btn-accent normal-case text-xl">All Categories</a>
				</div>
				<div className="navbar-center flex-1 hidden lg:flex">
					<div className="relative w-full">
						<input className="input w-full input-bordered rounded-full" />
						<BiSearch
							className="text-gray-400 absolute top-3 right-3"
							size={25}
						/>
					</div>
				</div>
				<Link to={"/sell"} className="navbar-end w-1/3">
					<button className="btn btn-neutral">Sell your Items</button>
				</Link>
			</div>
		</div>
	)
}

export default Header
