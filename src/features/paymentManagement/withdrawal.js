import toast from "react-hot-toast"
import {
	addAccountApi,
	createWithrawalRequestApi,
	getUserWithdrawalRequestsApi,
	getWithdrawalRequestsApi,
	removeAccountApi,
	updateWithdrawalApi,
} from "./withdrawalApi"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateWithdrawal = () => {
	const queryClient = useQueryClient()
	const { mutate: createWithdrawal, isLoading: isCreatingWithdrawal } =
		useMutation({
			mutationFn: (data) => createWithrawalRequestApi(data),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["user"],
				})

				queryClient.invalidateQueries({
					queryKey: ["getUserWithdrawal"],
				})
				toast.success("Withdrawal request created successfully")
			},
		})

	return { createWithdrawal, isCreatingWithdrawal }
}

export const useUpdateWithdrawal = () => {
	const queryClient = useQueryClient()
	const { mutate: updateWithdrawal, isLoading: isUpdatingWithdrawal } =
		useMutation({
			mutationFn: (data) => updateWithdrawalApi(data.data, data.id),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["getWithdrawal"],
				})
				toast.success("Withdrawal updated successfully")
			},
		})

	return { updateWithdrawal, isUpdatingWithdrawal }
}

export const useGetWithdrawal = () => {
	const { data: getWithdrawals } = useQuery({
		queryKey: ["getWithdrawal"],
		queryFn: () => getWithdrawalRequestsApi(),
	})

	return { getWithdrawals }
}

export const useGetUserWithdrawal = () => {
	const { data: getWithdrawals } = useQuery({
		queryKey: ["getUserWithdrawal"],
		queryFn: () => getUserWithdrawalRequestsApi(),
	})

	return { getWithdrawals }
}

export function useAddAccount() {
	const clientQuery = useQueryClient()
	const { mutate: addAccount, isLoading: isAddingAccount } = useMutation({
		mutationFn: (res) => addAccountApi(res),
		onSuccess: () => {
			toast.success("account added successfully")
			clientQuery.invalidateQueries(["user"])
		},
	})

	return { addAccount, isAddingAccount }
}

export function useRemoveAccount() {
	const clientQuery = useQueryClient()
	const { mutate: removeAccount, isLoading: isRemovingAccount } = useMutation({
		mutationFn: (id) => removeAccountApi(id),
		onSuccess: () => {
			toast.success("account removed successfully")
			clientQuery.invalidateQueries(["user"])
		},
	})

	return { removeAccount, isRemovingAccount }
}
