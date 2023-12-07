import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import router from "./router/router.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"
import { NotificationProvider } from "./app/context/NotificationContext.jsx"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 20 * 1000,
		},
	},
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<NotificationProvider>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<RouterProvider router={router} />
			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: {
						duration: 5000,
					},

					error: {
						duration: 7000,
					},

					style: {
						fontSize: "18px",
						maxWidth: "500px",
						padding: "16px 24px",
					},
				}}
			/>
		</QueryClientProvider>
	</NotificationProvider>
)
