import { useState } from "react"
import { useResetPassword } from "./resetPass"
import { useParams } from "react-router-dom"

const ResetPassword = () => {
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const params = useParams()?.resetToken
	console.log(params)
	const { resetPass, isLoading } = useResetPassword()

	const handleSubmit = (e) => {
		e.preventDefault()

		resetPass({
			password,
			confirmPassword,
			resetToken: params,
		})
	}
	return (
		<div className="w-full h-screen flex items-center justify-center flex-col">
			<div className="w-[400px] p-10 shadow-xl">
				<h1 className="mb-4 text-2xl font-bold">Reset Password</h1>
				<form onSubmit={handleSubmit} className="w-full float-left">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your Password"
						className="input input-bordered w-full max-w-xs"
					/>

					<br />
					<br />

					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Password"
						className="input input-bordered w-full max-w-xs"
					/>

					<br />
					<br />

					<input
						type="submit"
						disabled={isLoading}
						value="Submit"
						className={"btn-accent btn  float-left "}
					/>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword
