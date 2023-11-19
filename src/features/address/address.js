import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddAddress, RemoveAddress } from "./addressApi"
import toast from "react-hot-toast"

export function useAddAddress() {
	const clientQuery = useQueryClient()
	const { mutate: addAddress, isLoading: isAddingAddress } = useMutation({
		mutationFn: (res) => AddAddress(res),
		onSuccess: () => {
			toast.success("address added successfully")
			clientQuery.invalidateQueries({
				queryKey: ["user"],
			})
		},
	})

	return { addAddress, isAddingAddress }
}

export function useRemoveAddress() {
	const clientQuery = useQueryClient()
	const { mutate: removeAddress, isLoading: isRemovingAddress } = useMutation({
		mutationFn: (addressId) => RemoveAddress(addressId),
		onSuccess: () => {
			toast.success("address removed successfully")
			clientQuery.invalidateQueries(["user"])
		},
	})

	return { removeAddress, isRemovingAddress }
}
