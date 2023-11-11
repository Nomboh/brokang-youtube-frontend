import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	checkSubscription,
	createSubscription,
	getAllSubscriptions,
	getseller,
	unsubscribe,
} from "./sellerApi"
import toast from "react-hot-toast"

export const useGetSeller = (sellerId) => {
	const { data: seller, isLoading } = useQuery({
		queryKey: ["seller", sellerId],
		queryFn: () => getseller(sellerId),
	})

	return { seller, isLoading }
}

export const useCheckSubscription = (sellerId) => {
	const { data: isSubscribe, isLoading } = useQuery({
		queryKey: ["check-subscription", sellerId],
		queryFn: () => checkSubscription(sellerId),
	})

	return { isSubscribe, isLoading }
}

export const useGetAllSubscription = (sellerId) => {
	const { data: isSubscribe, isLoading } = useQuery({
		queryKey: ["get-subscriptions", sellerId],
		queryFn: () => getAllSubscriptions(sellerId),
	})

	return { isSubscribe, isLoading }
}

export const useCreateSubscription = () => {
	const queryClient = useQueryClient()
	const { mutate: createASubscription, isLoading } = useMutation({
		mutationFn: (sellerId) => createSubscription(sellerId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["check-subscription", data.sellerId],
			})

			toast.success("successfully subscribed to this seller")
		},
	})

	return { createASubscription, isLoading }
}

export const useUnSubscription = () => {
	const queryClient = useQueryClient()
	const { mutate: unSubscriptionToSeller, isLoading } = useMutation({
		mutationFn: (sellerId) => unsubscribe(sellerId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["check-subscription", data.sellerId],
			})

			toast.success("successfully unsubscribed from this seller")
		},
	})

	return { unSubscriptionToSeller, isLoading }
}
