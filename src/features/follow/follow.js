import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createFollower,
	deleteFollower,
	getFollowees,
	getFollowers,
} from "./followApi"
import toast from "react-hot-toast"

export const useCreateFollower = () => {
	const queryClient = useQueryClient()
	const { mutate: followAUser, isLoading: isFollowing } = useMutation({
		mutationFn: (follower) => createFollower(follower),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["followers"],
			})
			queryClient.invalidateQueries({
				queryKey: ["followees"],
			})
			toast.success("you successfully followed this user")
		},
	})

	return { followAUser, isFollowing }
}

export const useUnfollow = () => {
	const queryClient = useQueryClient()
	const { mutate: unfollowAUser, isLoading: isUnfollowing } = useMutation({
		mutationFn: (follower) => deleteFollower(follower),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["followers"],
			})
			queryClient.invalidateQueries({
				queryKey: ["followees"],
			})
			toast.success("you have unfollowed this user")
		},
	})

	return { unfollowAUser, isUnfollowing }
}

export const useFollowers = () => {
	const { data: followers, isLoading: isGettingFollowers } = useQuery({
		queryFn: getFollowers,
		queryKey: ["followers"],
	})

	return { followers, isGettingFollowers }
}

export const useFollowees = () => {
	const { data: followees, isLoading: isGettingFollowees } = useQuery({
		queryFn: getFollowees,
		queryKey: ["followees"],
	})

	return { followees, isGettingFollowees }
}
