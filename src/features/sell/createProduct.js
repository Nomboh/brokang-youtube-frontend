import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct, editProduct } from "./createProductApi"
import toast from "react-hot-toast"

export const useCreateProduct = () => {
	const queryClient = useQueryClient()
	const { mutate: createAProduct, isLoading: isCreating } = useMutation({
		mutationFn: (data) => createProduct(data),
		onSuccess: () => {
			toast.success("Product created successfully")
			queryClient.invalidateQueries({
				queryKey: ["get-all-products"],
			})
		},
	})

	return { createAProduct, isCreating }
}

export const useEditProduct = () => {
	const queryClient = useQueryClient()
	const { mutate: editAProduct, isLoading: isEditing } = useMutation({
		mutationFn: (data) => editProduct(data),
		onSuccess: (data) => {
			toast.success("Product Edited successfully")
			queryClient.refetchQueries({
				queryKey: ["product", data?._id],
			})
		},
	})

	return { editAProduct, isEditing }
}
