import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserLikes, likeProduct, unlikeProduct } from "../api/likeApi"

export const useLike = () => {
	const queryClient = useQueryClient()
	const { mutate: likeAProduct } = useMutation({
		mutationFn: (productId) => likeProduct(productId),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: ["likes"],
			})
		},
	})

	return { likeAProduct }
}

export const useUnlike = () => {
	const queryClient = useQueryClient()
	const { mutate: unlikeAProduct } = useMutation({
		mutationFn: (productId) => unlikeProduct(productId),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: ["likes"],
			})
		},
	})

	return { unlikeAProduct }
}

export const useLikes = () => {
	const { data: likes } = useQuery({
		queryFn: () => getUserLikes(),
		queryKey: ["likes"],
	})

	return { likes }
}
