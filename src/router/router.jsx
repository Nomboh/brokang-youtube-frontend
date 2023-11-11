import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import HomePage from "../features/HomePage.jsx"
import Login from "../features/login/Login.jsx"
import Register from "../features/register/Register"
import ActivationPage from "../features/activation/ActivationPage"
import ForgotPassword from "../features/forgotPassword/ForgotPassword.jsx"
import ResetPassword from "../features/resetPassword/ResetPassword"
import ProfilePage from "../features/profile/ProfilePage"
import ProtectedRoutes from "./ProtectedRoutes"
import ProductDetails from "../features/productDetails/productDetails"
import SellProducts from "../features/sell/SellProducts"
import EditProducts from "../features/sell/EditProducts"
import Search from "../features/search/Search.jsx"
import MyStore from "../features/store/MyStore.jsx"
import Follow from "../features/follow/Follow.jsx"
import Follower from "../features/follow/Follower.jsx"
import Following from "../features/follow/Following.jsx"
import Seller from "../features/seller/Seller.jsx"

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
						element: <SellProducts />,
						path: "/sell",
					},

					{
						element: <EditProducts />,
						path: "/edit-product",
					},

					{
						element: <MyStore />,
						path: "/my-store",
					},

					{
						element: <Follow />,
						path: "/follow",
						children: [
							{
								element: <Follower />,
								path: "follower",
							},
							{
								element: <Following />,
								path: "following",
							},
						],
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
				element: <ProductDetails />,
				path: "/:id",
			},

			{
				element: <Search />,
				path: "/search",
			},

			{
				element: <Seller />,
				path: "/seller/:id",
			},
		],
	},
])

export default router
