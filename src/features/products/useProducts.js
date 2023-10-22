import { useInfiniteQuery } from "@tanstack/react-query"
import { getAllProducts } from "./productApi"

export const useAllProducts = (filterData) => {
	const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryFn: ({ pageParam = 1 }) => getAllProducts(pageParam, filterData),
			queryKey: ["get-all-products"],
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.totalPages === allPages.length
					? undefined
					: allPages.length + 1
			},
		})

	return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }
}
