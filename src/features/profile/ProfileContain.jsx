import React, { useState } from "react"
import { FiCamera } from "react-icons/fi"
import { useUpdateMe, useUpdatePassword } from "./profile"
import { cloudinaryUpload } from "../../utils/cloudinaryUpload"

function ProfileContain({ user }) {
	const [openPassword, setOpenPassword] = useState(false)
	const [storename, setStorename] = useState("")
	const [introduction, setIntroduction] = useState("")
	const [email, setEmail] = useState("")
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")

	const { updateMe } = useUpdateMe()
	const { updatePassword } = useUpdatePassword()

	const updateStoreName = (e) => {
		e.preventDefault()

		updateMe({ storename })
	}
	const handleChangeIntro = (e) => {
		e.preventDefault()

		updateMe({ introduction })
	}
	const handleChangeEmail = (e) => {
		e.preventDefault()

		updateMe({ email })
	}

	const handlePasswordChange = (e) => {
		e.preventDefault()
		updatePassword({
			newPassword,
			currentPassword,
		})
	}

	const handleProfileUpload = async (e) => {
		e.preventDefault()

		const files = e.target.files
		const uploadImages = await cloudinaryUpload({
			files: [files[0]],
			uploadPreset: "profile",
			width: 300,
			height: 300,
		})

		updateMe({
			photo: uploadImages[0],
		})
	}

	const handleBannerUpload = async (e) => {
		e.preventDefault()

		const files = e.target.files
		const uploadImages = await cloudinaryUpload({
			files: [files[0]],
			uploadPreset: "profile",
			width: 300,
			height: 970,
		})

		updateMe({
			bannerImage: uploadImages[0],
		})
	}
	return (
		<div>
			<div className=" h-52 800px:h-64 relative w-full">
				<label className="cursor-pointer h-full w-full" htmlFor="banner">
					<img
						className=" h-full w-full object-cover rounded-md"
						src={user?.bannerImage}
						alt="banner"
					/>
				</label>
				<input
					onChange={handleBannerUpload}
					className="hidden"
					type="file"
					name="banner"
					id="banner"
				/>

				<div className="absolute -bottom-14 800px:-bottom-16 left-1/2 right-1/2 -translate-x-1/2   w-32 h-32 rounded-full">
					<img
						src={user?.photo}
						alt="profile_image"
						className="h-full w-full object-cover rounded-full"
					/>
					<label
						htmlFor="profile_image"
						className="absolute flex justify-center items-center cursor-pointer h-10 right-0 bottom-0  w10 border-2 border-primary bg-base-100 p-1 rounded-full">
						<FiCamera size={25} color="#0000006a" />
					</label>
					<input
						className="hidden"
						type="file"
						name="profile_image"
						id="profile_image"
						onChange={handleProfileUpload}
					/>
				</div>
			</div>

			{/* text inputs */}
			<div className="mt-16 800px:mt-20 w-full p-4">
				{/* storename field */}
				<div className="flex flex-col items-start 800px:flex-row w-full 800px:items-center">
					<label htmlFor="name" className=" mb-2 800px:mb-0 w-52">
						Store Name
					</label>
					<div className="flex-1 flex items-center w-full">
						<input
							type="text"
							defaultValue={user?.storename}
							onChange={(e) => setStorename(e.target.value)}
							placeholder="your username"
							className=" input flex-1 input-bordered w-5/6"
						/>
						<button
							onClick={updateStoreName}
							className="btn btn-accent btn-outline ml-6">
							Change
						</button>
					</div>
				</div>
				<br />

				{/* Introduction field */}
				<div className="flex flex-col items-start 800px:flex-row w-full 800px:items-center">
					<label htmlFor="name" className=" self-start mb-2 800px:mb-0 w-52">
						Introduction
					</label>
					<div className="flex-1 flex items-center w-full">
						<textarea
							className="textarea textarea-bordered w-5/6 flex-1"
							placeholder="Enter description of store"
							defaultValue={user?.introduction}
							onChange={(e) => setIntroduction(e.target.value)}
							rows={5}></textarea>

						<button
							onClick={handleChangeIntro}
							className="btn btn-accent btn-outline ml-6 self-end">
							Change
						</button>
					</div>
				</div>
				<br />

				{/* email field */}
				<div className="flex flex-col items-start 800px:flex-row w-full 800px:items-center">
					<label htmlFor="name" className=" mb-2 800px:mb-0 w-52">
						Email
					</label>
					<div className="flex-1 flex items-center w-full">
						<input
							type="email"
							placeholder="your email address"
							onChange={(e) => setEmail(e.target.value)}
							defaultValue={user?.email}
							className=" input flex-1 input-bordered w-5/6"
						/>
						<button
							onClick={handleChangeEmail}
							className="btn btn-accent btn-outline ml-6">
							Change
						</button>
					</div>
				</div>
				<br />

				{/* password field */}
				<div className="flex flex-col items-start 800px:flex-row w-full 800px:items-center">
					<label htmlFor="name" className=" mb-2 800px:mb-0 w-52">
						Password
					</label>
					<div className="flex-1 flex items-center w-full">
						<p className="flex-1">***********</p>
						<button
							onClick={() => {
								setOpenPassword(!openPassword)
							}}
							className={`btn ${
								openPassword ? "btn-neutral" : "btn-accent"
							}  btn-outline ml-6`}>
							{openPassword ? "Cancel" : "Change"}
						</button>
					</div>
				</div>
				{openPassword && (
					<>
						<div className="flex flex-col mt-4 mb-4 items-start 800px:flex-row w-full 800px:items-center">
							<label htmlFor="name" className=" mb-2 800px:mb-0 w-52">
								Current Password
							</label>
							<div className="flex-1 flex items-center w-full">
								<input
									type="password"
									onChange={(e) => setCurrentPassword(e.target.value)}
									placeholder="your Current Password"
									className=" input flex-1 input-bordered w-5/6"
								/>

								<div className=" w-[85px] ml-6"></div>
							</div>
						</div>

						<div className="flex flex-col items-start 800px:flex-row w-full 800px:items-center">
							<label htmlFor="name" className=" mb-2 800px:mb-0 w-52">
								New Password
							</label>
							<div className="flex-1 flex items-center w-full">
								<input
									type="password"
									onChange={(e) => setNewPassword(e.target.value)}
									placeholder="include numbers, text and special characters"
									className=" input flex-1 input-bordered w-5/6"
								/>
								<button
									onClick={handlePasswordChange}
									className="btn btn-accent btn-outline ml-6">
									Submit
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default ProfileContain
