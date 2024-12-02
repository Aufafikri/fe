import { MerchantProfileProps } from "@/types/merchant/merchant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFetchMerchantProfile = (userId: string | undefined) => {
    return useQuery<MerchantProfileProps>({
        queryKey: ['merchant_profile'],
        queryFn: async () => {
            const token = localStorage.getItem('access_token')

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/merchant/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }
    })
}

export const useFetchMerchantProducts =  (merchantId: string) => {
    return useQuery({
        queryKey: ["merchant_products"],
        queryFn: async () => {
            const token = localStorage.getItem('access_token')

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/merchant/product/${merchantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }
    })
}