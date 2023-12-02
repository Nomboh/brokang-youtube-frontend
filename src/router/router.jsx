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
import Address from "../features/address/Address.jsx"
import Checkout from "../features/checkout/Checkout.jsx"
import Payment from "../features/payment/Payment.jsx"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Success from "../features/payment/Success.jsx"
import OrderList from "../features/order/OrderList.jsx"
import OrderDetails from "../features/order/OrderDetails.jsx"
import PaymentManagement from "../features/paymentManagement/PaymentManagement.jsx"

const stripeKey = import.meta.env.VITE_PUBLISHABLE_KEY

const stripePromise = loadStripe(stripeKey)

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

					{
						element: <Checkout />,
						path: "/checkout",
					},

					{
						element: <Success />,
						path: "/success",
					},

					{
						element: <OrderList />,
						path: "/order",
					},

					{
						element: <OrderDetails />,
						path: "/order/:id",
					},

					{
						element: <PaymentManagement />,
						path: "/payment-management",
					},

					{
						element: (
							<Elements stripe={stripePromise}>
								<Payment />
							</Elements>
						),

						path: "/payment",
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

			{
				element: <Address />,
				path: "/address",
			},
		],
	},
])

export default router
