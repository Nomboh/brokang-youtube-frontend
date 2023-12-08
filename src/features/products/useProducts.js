import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getAllProducts, getProducts } from "./productApi"

export const useAllProducts = (filterData) => {
	const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryFn: ({ pageParam = 1 }) => getAllProducts(pageParam, filterData),
			queryKey: ["get-all-products", filterData],
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.totalPages === allPages.length
					? undefined
					: allPages.length + 1
			},
		})

	return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }
}

export const useProducts = (filterData) => {
	const { data: products, isLoading } = useQuery({
		queryFn: () => getProducts(filterData),
		queryKey: ["get-products", filterData],
		enabled: !!filterData.user,
	})

	return { products, isLoading }
}
