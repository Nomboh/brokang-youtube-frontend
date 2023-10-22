import { useQuery } from "@tanstack/react-query"
import { loadUser } from "../api/loadUserApi"
export const useUser = () => {
	const { data: user, isLoading } = useQuery({
		queryKey: ["user"],
		queryFn: loadUser,
	})

	return { user, isLoading }
}
