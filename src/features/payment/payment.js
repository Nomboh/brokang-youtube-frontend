import { useMutation } from "@tanstack/react-query"
import { getPaymentIntent } from "./paymentApi"

export const usePaymentIntent = () => {
	const {
		mutate,
		isLoadingPaymentIntent,
		data: clientSecret,
	} = useMutation({
		mutationKey: "paymentIntent",
		mutationFn: (data) => getPaymentIntent(data),
	})

	return { mutate, isLoadingPaymentIntent, clientSecret }
}
