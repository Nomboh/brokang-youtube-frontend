import { useState } from "react"
import { useForgotPassword } from "./forgotPassword"

const ForgotPassword = () => {
	const [email, setEmail] = useState("")

	const { forgotPass, isLoading } = useForgotPassword()

	const handleSubmit = (e) => {
		e.preventDefault()
		forgotPass({ email })
	}

	return (
		<div className="w-full h-screen flex items-center justify-center flex-col">
			<div className="w-[400px] p-10 shadow-xl">
				<h1 className="mb-4 text-2xl font-bold">Forgot Password</h1>
				<form onSubmit={handleSubmit} className="w-full float-left ">
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email here"
						className="input input-bordered w-full max-w-xs"
					/>

					<br />
					<br />

					<input
						disabled={isLoading}
						type="submit"
						value="Submit"
						className="btn-accent btn  float-left "
					/>
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword
