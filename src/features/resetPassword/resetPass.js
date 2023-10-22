import { useMutation } from "@tanstack/react-query"
import { resetPassword } from "./resetPassApi"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const useResetPassword = () => {
	const navigate = useNavigate()
	const { mutate: resetPass, isLoading } = useMutation({
		mutationFn: (data) => resetPassword(data),

		onSuccess: (data) => {
			localStorage.setItem("brokangToken", data.token)
			toast.success("Password reset successful")
			navigate("/")
		},
	})

	return { resetPass, isLoading }
}
