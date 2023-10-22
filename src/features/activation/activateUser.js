import { useMutation } from "@tanstack/react-query"
import { activateUser } from "./activationApi"
import toast from "react-hot-toast"

export const useActivate = () => {
	const {
		mutate: activate,
		isError,
		error,
		isLoading,
	} = useMutation({
		mutationFn: (data) => activateUser(data),
		onError: (data) => {
			if (data.message) {
				toast.error(data?.message)
			}
		},
	})

	return { activate, isError, error, isLoading }
}
