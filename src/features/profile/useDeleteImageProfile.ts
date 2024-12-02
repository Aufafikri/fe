import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useDeleteImageProfile = () => {
    return useMutation({
        mutationFn: async (userId: string | undefined) => {
            const token = localStorage.getItem('access_token')

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/delete/profile/image/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }
    })
}