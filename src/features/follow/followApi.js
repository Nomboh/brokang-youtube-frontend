import agent from "../../app/agent"

export const createFollower = async (follower) => {
	try {
		return await agent.Follow.followUser(follower)
	} catch (error) {
		throw error
	}
}

export const deleteFollower = async (follower) => {
	try {
		return await agent.Follow.unfollowUser(follower)
	} catch (error) {
		throw error
	}
}

export const getFollowers = async () => {
	try {
		return await agent.Follow.getUserFollowers()
	} catch (error) {
		throw error
	}
}

export const getFollowees = async () => {
	try {
		return await agent.Follow.getUserFollowees()
	} catch (error) {
		throw error
	}
}
