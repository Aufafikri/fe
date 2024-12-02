import { useMutation } from "@tanstack/react-query"
import axios from "axios"

type CheckoutBnitypes = {
    orderId: string;
    productPrice: number | undefined;
    grossAmount: number;
    quantity: number
}

export const useBniCheckout = () => {
    return useMutation({
        mutationFn: async (body: CheckoutBnitypes) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BSE_URL}/transaction/bni`, body)
            return response.data
        }
    })
}