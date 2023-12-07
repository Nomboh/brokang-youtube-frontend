import { createContext, useState } from "react"

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([])

	const addNotification = (notification) => {
		setNotifications((prev) => [...prev, { ...notification, seen: false }])
	}

	const removeNotification = (conversationId) => {
		setNotifications((prev) =>
			prev.filter((notify) => notify.conversationId !== conversationId)
		)
	}
	return (
		<NotificationContext.Provider
			value={{
				addNotification,
				removeNotification,
				notifications,
				setNotifications,
			}}>
			{children}
		</NotificationContext.Provider>
	)
}
