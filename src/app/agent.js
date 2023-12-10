import axios from "axios"
import toast from "react-hot-toast"
import router from "../router/router"

axios.defaults.baseURL = "https://backend-brokang-youtube.vercel.app/"

const responseBody = (response) => response.data

axios.interceptors.request.use((config) => {
	const token = localStorage.getItem("brokangToken")

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axios.interceptors.response.use(
	async (response) => response,
	(err) => {
		const { data, status } = err.response

		switch (status) {
			case 400:
				toast.error(data.message)
				break

			case 404: {
				router.navigate("/not-found")
				break
			}

			case 403:
				toast.error("You are not allowed to do that")
				break

			default:
				break
		}

		return Promise.reject(err.response)
	}
)

const request = {
	get: (url, params) =>
		axios.get(url, { params, withCredentials: true }).then(responseBody),
	post: (url, body) =>
		axios.post(url, body, { withCredentials: true }).then(responseBody),
	put: (url, body) =>
		axios.put(url, body, { withCredentials: true }).then(responseBody),
	delete: (url) =>
		axios.post(url, {}, { withCredentials: true }).then(responseBody),
}

const Account = {
	login: (data) => request.post("/user/login", data),
	loadUser: () => request.get("/user/loadUser"),
	logoutUser: () => request.post("/user/logout", {}),
	registerUser: (data) => request.post("/user/register", data),
	activateUser: (data) => request.post("/user/activate", data),
	forgotPassword: (data) => request.post("/user/forgotPassword", data),
	resetPassword: (data) =>
		request.post(`/user/resetPassword/${data.resetToken}`, data),
	updateMe: (data) => request.put("/user/me", data),
	updatePassword: (data) => request.put("/user/updatePassword", data),
	getSeller: (sellerId) => request.get(`/user/${sellerId}`),
	addUserAddress: (data) => request.put("/user/address/addAddress", data),
	removeUserAddress: (addressId) =>
		request.put(`/user/address/removeAddress/${addressId}`, {}),

	addAccount: (data) => request.post("user/account/add", data),
	removeAccount: (id) => request.put(`user/account/remove/${id}`, {}),
}

const Withdrawals = {
	createWithdrawalRequest: (data) => request.post("/withdrawal", data),
	getWithdrawalRequests: () => request.get("/withdrawal?status=Processing"),
	getUserWithdrawalRequests: () => request.get("/withdrawal/user"),
	updateWithdrawalRequests: (data, id) =>
		request.put(`/withdrawal/${id}`, data),
}

const Product = {
	getAllProducts: (params) => request.get("/product", params),
	getProductsDetails: (id) => request.get(`/product/${id}`),
	getOtherSellerItems: (userId) =>
		request.get(`product/seller-other-items/${userId}`),
	getRecommendedProducts: (category, params) =>
		request.get(`/product/recommended/${category}`, params),

	deleteImages: (data) => request.post("/product/deleteImage", data),
	createProduct: (data) => request.post("/product", data),
	editProduct: (data) => request.put(`/product/${data?.productId}`, data),
	editManyProducts: (data) => request.put("/product/update/manyProducts", data),
}

const Like = {
	likeProducts: (productId) => request.post(`/like/${productId}`),
	unlikeProducts: (productId) => request.post(`/like/unlike/${productId}`),
	getUserLikes: () => request.get(`/like`),
}

const Follow = {
	followUser: (follower) => request.post(`/follow`, { follower }),
	unfollowUser: (follower) => request.post(`/follow/unfollow/`, { follower }),
	getUserFollowers: () => request.get(`/follow/follower`),
	getUserFollowees: () => request.get(`/follow/followee`),
}

const Order = {
	createOrder: (data) => request.post("order", data),
	getUserOrder: () => request.get("order"),
	getOrder: (id) => request.get("order/" + id),
	getSellerOrders: () => request.get("order/seller/items"),
	updateOrderStatus: (data, id) => request.put(`order/${id}`, data),
}

const Payment = {
	getPaymentIntent: (data) => request.post(`/payment`, data),
}

const Review = {
	createReview: (data) => request.post(`/review/${data.productId}`, data),
	getSellersReviews: (sellerId) => request.get(`/review/${sellerId}`),
}

const Subscription = {
	subscribe: (sellerId) => request.post(`/subscription/${sellerId}`, {}),
	unsubscribe: (sellerId) =>
		request.post(`/subscription/unsubscribe/${sellerId}`, {}),
	getUserSubscriptions: (sellerId) => request.get(`/subscription/${sellerId}`),
	checkSubscription: (sellerId) =>
		request.get(`/subscription/check/${sellerId}`),
}

const Chat = {
	createConversation: (data) => request.post(`/conversation`, data),
	getUsersConversation: () => request.get(`/conversation`),
	getSingleConversation: (id) => request.get(`/conversation/${id}`),
	createMessage: (data) => request.post(`message`, data),
	getUsersMessage: (conversationId) =>
		request.get(`/message/${conversationId}`),
}

const agent = {
	Account,
	Product,
	Like,
	Follow,
	Subscription,
	Payment,
	Order,
	Review,
	Withdrawals,
	Chat,
}

export default agent
