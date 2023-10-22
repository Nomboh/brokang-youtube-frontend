import { useMutation } from "@tanstack/react-query"
import { registerUser } from "./registerUserApi"
import toast from "react-hot-toast"

export const useRegister = () => {
	const { mutate: register, isLoading } = useMutation({
		mutationFn: (data) => registerUser(data),
		onSuccess: (data) => {
			toast.success(data.message)
		},
	})

	return { register, isLoading }
}
