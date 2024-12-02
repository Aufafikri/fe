import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useDeleteAddress = () => {
    return useMutation({
        mutationFn: async (addressId: string) => {
            const token = localStorage.getItem('access_token')

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/address/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }
    })
}