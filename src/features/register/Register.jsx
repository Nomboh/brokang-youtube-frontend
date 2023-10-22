import React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useRegister } from "./registerUser"

function Register() {
	const { register: registerUser, isLoading } = useRegister()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid, isSubmitSuccessful },
	} = useForm({ mode: "onTouched" })
	const submitForm = (data) => {
		registerUser(data)
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset()
		}
	}, [isSubmitSuccessful])
	return (
		<div className="min-h-screen text-left flex flex-col justify-center py-14 sm:px-4 lg:px-8">
			<h1 className="mt-6 text-center text-2xl font-bold ">
				Register for an account
			</h1>

			<div className="mt-8 mx-auto w-full max-w-md">
				<div className="bg-white w-full py-8 px-4 shadow sm:rounded-lg ">
					<form onSubmit={handleSubmit(submitForm)} className="space-y-6">
						{/* name */}
						<div className=" w-full">
							<label htmlFor="name">Full name</label>
							<div className="mt-1 w-full">
								<input
									{...register("name", {
										required: {
											value: true,
											message: "name is required",
										},
									})}
									type="text"
									className="input input-bordered w-full"
								/>
								{errors?.name && (
									<span className="text-red-500">* {errors.name.message}</span>
								)}
							</div>
						</div>

						{/* store name */}
						<div className=" w-full">
							<label htmlFor="name">Store name</label>
							<div className="mt-1 w-full">
								<input
									{...register("storename", {
										required: {
											value: true,
											message: "storename is required",
										},
									})}
									type="text"
									className="input input-bordered w-full"
								/>
								{errors?.storename && (
									<span className="text-red-500">
										* {errors.storename.message}
									</span>
								)}
							</div>
						</div>

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

						<button
							disabled={!isDirty || !isValid || isLoading}
							type="submit"
							className="btn btn-neutral">
							Submint
						</button>

						<div className="normalFlex">
							<h4>Have an account?</h4>
							<Link className="text-accent pl-2" to={"/login"}>
								Login
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
