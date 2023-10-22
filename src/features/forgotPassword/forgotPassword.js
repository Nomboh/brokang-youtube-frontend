import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "./forgotPasswordApi"
import toast from "react-hot-toast"

export const useForgotPassword = () => {
	const { mutate: forgotPass, isLoading } = useMutation({
		mutationFn: (data) => forgotPassword(data),

		onSuccess: (data) => {
			toast.success(data.message)
		},
	})

	return { forgotPass, isLoading }
}
