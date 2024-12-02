import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useUpdateNameProfile = () => {
    return useMutation({
    mutationFn: async ({userId, name}: { userId: string, name: string }) => {
            const token = localStorage.getItem('access_token')

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/name/${userId}`, {name}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        },
    })
}