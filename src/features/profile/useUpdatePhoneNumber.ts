import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useUpdatePhoneNumber = () => {
    return useMutation({
        mutationFn: async ({userId, phoneNumber}: { userId: string, phoneNumber: number }) => {
            const token = localStorage.getItem('access_token')

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/phone/${userId}`, {phoneNumber}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }
    })
}