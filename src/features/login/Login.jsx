import React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "./login"

function Login() {
	const { mutate, isLoading } = loginUser()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({ mode: "onTouched" })

	const submitForm = (data) => {
		mutate(data, {
			onSuccess: () => {
				navigate("/")
			},
		})
	}

	return (
		<div className="min-h-screen text-left flex flex-col justify-center py-14 sm:px-4 lg:px-8">
			<h1 className="mt-6 text-center text-2xl font-bold ">
				Login to your account
			</h1>

			<div className="mt-8 mx-auto w-full max-w-md">
				<div className="bg-white w-full py-8 px-4 shadow sm:rounded-lg ">
					<form onSubmit={handleSubmit(submitForm)} className="space-y-6">
						{/* email */}
						<div className=" w-full">
							<label htmlFor="email">Email address</label>
							<div className="mt-1 w-full">
								<input
									{...register("email", {
										required: {
											value: true,
											message: "email is required",
										},
										pattern: {
											value:
												/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
											message: "Please provide a valid email address",
										},
									})}
									type="email"
									className="input input-bordered w-full"
								/>
								{errors?.email && (
									<span className="text-red-500">* {errors.email.message}</span>
								)}
							</div>
						</div>

						{/* password */}
						<div className=" w-full">
							<label htmlFor="password">Password</label>
							<div className="mt-1 w-full">
								<input
									{...register("password", {
										required: {
											value: true,
											message: "Password is required",
										},
										minLength: {
											value: 6,
											message: "Password most be atleast 6 characters long",
										},
									})}
									type="password"
									className="input input-bordered w-full"
								/>

								{errors?.password && (
									<span className="text-red-500">
										* {errors.password.message}
									</span>
								)}
							</div>
						</div>

						{/* check box */}
						<div className="normalFlex justify-between">
							<div className="normalFlex">
								<input
									type="checkbox"
									name="remember-me"
									id="remember-me"
									className="checkbox checkbox-accent"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900">
									Remember Me
								</label>
							</div>
							<Link
								to={"/forgotPassword"}
								className="font-medium text-accent hover:text-accent-focus">
								Forgot password
							</Link>
						</div>

						<button
							disabled={isLoading || !isValid || !isDirty}
							type="submit"
							className="btn btn-neutral">
							Submint
						</button>
						<div className="normalFlex">
							<h4>Do not have an account yet?</h4>
							<Link className="text-accent pl-2" to={"/register"}>
								Singup
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
