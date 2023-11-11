import axios from "axios"
import toast from "react-hot-toast"

axios.defaults.baseURL = "http://localhost:4000/api/v1"
axios.defaults.withCredentials = true

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
	get: (url, params) => axios.get(url, { params }).then(responseBody),
	post: (url, body) => axios.post(url, body).then(responseBody),
	put: (url, body) => axios.put(url, body).then(responseBody),
	delete: (url) => axios.post(url).then(responseBody),
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

const Subscription = {
	subscribe: (sellerId) => request.post(`/subscription/${sellerId}`, {}),
	unsubscribe: (sellerId) =>
		request.post(`/subscription/unsubscribe/${sellerId}`, {}),
	getUserSubscriptions: (sellerId) => request.get(`/subscription/${sellerId}`),
	checkSubscription: (sellerId) =>
		request.get(`/subscription/check/${sellerId}`),
}

const agent = {
	Account,
	Product,
	Like,
	Follow,
	Subscription,
}

export default agent
