import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logoutUser } from "../api/logoutUserApi"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { mutate: logout } = useMutation({
		mutationFn: logoutUser,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["user"],
			})
			queryClient.resetQueries()
			localStorage.removeItem("brokangToken")
			if (data.success) {
				navigate("/", { replace: true })
			}
		},
	})

	return { logout }
}
