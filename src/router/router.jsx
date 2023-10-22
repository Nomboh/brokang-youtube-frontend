import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import HomePage from "../features/HomePage.jsx"
import Login from "../features/login/Login.jsx"
import Register from "../features/register/Register"
import ActivationPage from "../features/activation/ActivationPage"
import ForgotPassword from "../features/forgotPassword/ForgotPassword.jsx"
import ResetPassword from "../features/resetPassword/ResetPassword"
import ProductDetail from "../features/productDetails/ProductDetail.jsx"
import ProfilePage from "../features/profile/ProfilePage"
import SellPage from "../features/sell/SellPage.jsx"
import ProtectedRoutes from "./ProtectedRoutes"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				element: <ProtectedRoutes />,
				children: [
					{
						element: <ProfilePage />,
						path: "/profile",
					},
					{
						element: <SellPage />,
						path: "/sell",
					},
				],
			},
			{
				element: <HomePage />,
				path: "/",
			},

			{
				element: <Login />,
				path: "/login",
			},

			{
				element: <Register />,
				path: "/register",
			},

			{
				element: <ActivationPage />,
				path: "/activation",
			},
			{
				element: <ForgotPassword />,
				path: "/forgotPassword",
			},
			{
				element: <ResetPassword />,
				path: "/resetPassword/:resetToken",
			},

			{
				element: <ProductDetail />,
				path: "/:id",
			},
		],
	},
])

export default router
