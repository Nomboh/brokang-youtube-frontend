import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createOrder,
	getSellerOrder,
	getUserOrder,
	getUserOrders,
	updateOrder,
} from "./orderApi"
import toast from "react-hot-toast"

export const useCreateOrder = () => {
	const { mutate: order, isLoading: isOrdering } = useMutation({
		mutationFn: (data) => createOrder(data),
		onSuccess: () => {
			toast.success("Order completed successfully")
		},
	})

	return { order, isOrdering }
}

export const useUpdateOrder = () => {
	const queryClient = useQueryClient()
	const { mutate: updateOrderMutation, isLoading: isUpdatingOrder } =
		useMutation({
			mutationFn: (data) => updateOrder(data.data, data.id),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["seller_orders"],
				})
				toast.success("Order updated successfully")
			},
		})

	return { updateOrderMutation, isUpdatingOrder }
}

export const useGetOrder = (id) => {
	const { isLoading, data: order } = useQuery({
		queryKey: ["order", id],
		queryFn: () => getUserOrder(id),
	})

	return { isLoading, order }
}

export const useGetUserOrders = () => {
	const { isLoading: loadingUserOrders, data: userOrders } = useQuery({
		queryKey: ["user_orders"],
		queryFn: () => getUserOrders(),
	})

	return { loadingUserOrders, userOrders }
}

export const useGetSellerOrders = () => {
	const { isLoading: loadingSellerOrders, data: sellerOrders } = useQuery({
		queryKey: ["seller_orders"],
		queryFn: () => getSellerOrder(),
	})

	return { loadingSellerOrders, sellerOrders }
}
