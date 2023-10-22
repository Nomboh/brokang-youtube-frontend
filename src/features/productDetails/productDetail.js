import { useQuery } from "@tanstack/react-query"
import {
	getOtherSellerPdt,
	getRecommendedPdt,
	productDetails,
} from "./productDetailApi"

export const useProductDetail = (id) => {
	const { data: product, isLoading } = useQuery({
		queryFn: () => productDetails(id),
		queryKey: ["product", id],
	})

	return { product, isLoading }
}

export const useOtherSellers = (id) => {
	const { data: sellersProducts, isLoading } = useQuery({
		queryFn: () => getOtherSellerPdt(id),
		queryKey: ["product-other-sellers", id],
		enabled: !!id,
	})

	return { sellersProducts, isLoading }
}
export const useRecommended = (category) => {
	const { data: recommendedProducts, isLoading } = useQuery({
		queryFn: () => getRecommendedPdt(category),
		queryKey: ["product-recommended", category],
		enabled: !!category,
	})

	return { recommendedProducts, isLoading }
}
