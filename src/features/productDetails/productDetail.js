import { useQuery } from "@tanstack/react-query"
import {
	getRecommendedProducts,
	productDetail,
	sellerOtherItems,
} from "./productDetailsApi"

export const useProduct = (id) => {
	const { data: product, isLoading } = useQuery({
		queryFn: () => productDetail(id),
		queryKey: ["product", id],
	})

	return { product, isLoading }
}

export const useSellerProducts = (userId, productId) => {
	const { data: sellerProducts, isLoading } = useQuery({
		queryFn: () => sellerOtherItems(userId),
		queryKey: ["seller-products", userId, productId],
		enabled: !!userId,
		select: (data) => data.filter((product) => product._id !== productId),
	})

	return { sellerProducts, isLoading }
}

export const useRecommended = (category, productId, userId) => {
	const { data: recommenedProducts, isLoading } = useQuery({
		queryFn: () => getRecommendedProducts(category, userId),
		queryKey: ["recommended-products", category, productId, userId],
		enabled: !!category && !!userId,
		select: (data) => data.filter((product) => product._id !== productId),
	})

	return { recommenedProducts, isLoading }
}
