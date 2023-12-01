import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createReview, getSellerReviews } from "./reviewApi"
import toast from "react-hot-toast"

export const useCreateReview = () => {
	const queryClient = useQueryClient()
	const { mutate: createAReview, isLoading: isCreatingReview } = useMutation({
		mutationFn: (data) => createReview(data),
		onSuccess: () => {
			toast.success("review updated successfully")
			queryClient.invalidateQueries({
				queryKey: ["seller_reviews"],
			})
		},
	})

	return { createAReview, isCreatingReview }
}

export const useGetReviews = (sellerId) => {
	const { isLoading, data: sellerReviews } = useQuery({
		queryKey: ["seller_reviews", sellerId],
		queryFn: () => getSellerReviews(sellerId),
		enabled: !!sellerId,
	})

	return { isLoading, sellerReviews }
}
