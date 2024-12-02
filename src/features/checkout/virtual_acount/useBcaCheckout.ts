import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type CheckoutBcatypes = {
    orderId: string;
    productPrice: number | undefined;
    grossAmount: number;
    quantity: number
}

export const useBcaCheckout = () => {
    return useMutation({
        mutationFn: async (body: CheckoutBcatypes) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/bca`, body)
            return response.data
        }
    })
}