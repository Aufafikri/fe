import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: async (userId: string) => {
            const token = localStorage.getItem('access_token')
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/delete-account/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        }
    })
}