import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profileUpdate, profileUpdatePass } from "./profileApi"
import toast from "react-hot-toast"

export const useUpdatePassword = () => {
	const queryClient = useQueryClient()
	const { mutate: updatePassword, isLoading } = useMutation({
		mutationFn: (data) => profileUpdatePass(data),
		onSuccess: (data) => {
			toast.success("Password updated successfully")
			localStorage.setItem("brokangToken", data.token)
			queryClient.invalidateQueries({ queryKey: ["user"] })
		},
	})

	return { updatePassword, isLoading }
}
export const useUpdateMe = () => {
	const queryClient = useQueryClient()
	const { mutate: updateMe, isLoading } = useMutation({
		mutationFn: (data) => profileUpdate(data),
		onSuccess: () => {
			toast.success("Data updated successfully")
			queryClient.invalidateQueries({ queryKey: ["user"] })
		},
	})

	return { updateMe, isLoading }
}
