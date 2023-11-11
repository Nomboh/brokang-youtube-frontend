export const checkIfIsFollowing = (followees, id) => {
	return followees && followees?.length > 0
		? followees?.some((followee) => followee?.follower?._id === id)
		: false
}
