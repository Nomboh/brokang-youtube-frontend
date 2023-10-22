import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../app/hooks/loadUser"
import Spinner from "../components/Spinner"

export default function ProtectedRoutes() {
	const { user, isLoading } = useUser()

	if (isLoading) return <Spinner />

	if (!user && !isLoading) {
		return <Navigate to={"/login"} />
	}

	return <Outlet context={{ user }} />
}
