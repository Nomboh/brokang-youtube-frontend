import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "../App"

// import HomePage from "../features/HomePage.jsx"

import ProtectedRoutes from "./ProtectedRoutes"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Spinner from "../components/Spinner.jsx"

const OrderList = lazy(() => import("../features/order/OrderList.jsx"))
const Address = lazy(() => import("../features/address/Address.jsx"))
const ResetPassword = lazy(() =>
	import("../features/resetPassword/ResetPassword")
)
const ActivationPage = lazy(() =>
	import("../features/activation/ActivationPage")
)
const ProductDetails = lazy(() =>
	import("../features/productDetails/ProductDetails")
)
const Search = lazy(() => import("../features/search/Search.jsx"))
const Register = lazy(() => import("../features/register/Register"))
const Login = lazy(() => import("../features/login/Login.jsx"))
const ProfilePage = lazy(() => import("../features/profile/ProfilePage"))
const SellProducts = lazy(() => import("../features/sell/SellProducts"))
const EditProducts = lazy(() => import("../features/sell/EditProducts"))
const MyStore = lazy(() => import("../features/store/MyStore.jsx"))
const Follow = lazy(() => import("../features/follow/Follow.jsx"))
const Follower = lazy(() => import("../features/follow/Follower.jsx"))
const Following = lazy(() => import("../features/follow/Following.jsx"))
const Checkout = lazy(() => import("../features/checkout/Checkout.jsx"))
const Success = lazy(() => import("../features/payment/Success.jsx"))
const Payment = lazy(() => import("../features/payment/Payment.jsx"))
const Seller = lazy(() => import("../features/seller/Seller.jsx"))
const OrderDetails = lazy(() => import("../features/order/OrderDetails.jsx"))
const Chat = lazy(() => import("../features/chat/Chat.jsx"))
const PaymentManagement = lazy(() =>
	import("../features/paymentManagement/PaymentManagement.jsx")
)
const NotFound = lazy(() => import("../components/NotFound.jsx"))
const ForgotPassword = lazy(() =>
	import("../features/forgotPassword/ForgotPassword.jsx")
)
const HomePage = lazy(() => import("../features/HomePage.jsx"))

const stripeKey = import.meta.env.VITE_PUBLISHABLE_KEY

const stripePromise = loadStripe(stripeKey)

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Suspense fallback={<Spinner />}>
				<App />
			</Suspense>
		),
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
						element: <Chat />,
						path: "/chat",
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

			{
				element: <NotFound />,
				path: "*",
			},
		],
	},
])

export default router
