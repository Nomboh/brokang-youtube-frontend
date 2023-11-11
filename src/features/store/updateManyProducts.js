import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMany } from "./updateManyApi"
import toast from "react-hot-toast"

export const useUpdateManyProducts = () => {
	const queryClient = useQueryClient()
	const { mutate, isLoading } = useMutation({
		mutationFn: (data) => updateMany(data),
		onSuccess: () => {
			queryClient.invalidateQueries("get-products")
			toast.success("Products updated successfully")
		},
	})
	return { mutate, isLoading }
}
