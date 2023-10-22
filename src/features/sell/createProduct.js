import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProductApi } from "./createProductApi"
import toast from "react-hot-toast"

export const useCreateProduct = () => {
	const queryclient = useQueryClient()
	const { mutate: createProduct, isLoading: isCreating } = useMutation({
		mutationFn: (data) => createProductApi(data),
		onSuccess: () => {
			toast.success("product created successfull")
			queryclient.invalidateQueries({ queryKey: ["get-all-products"] })
		},
	})

	return { createProduct, isCreating }
}
