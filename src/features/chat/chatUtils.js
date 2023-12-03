export const otherUser = (conversation, user) => {
	return conversation?.members?.find((member) => member._id !== user?._id)
}
