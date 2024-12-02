import { useMutation } from "@tanstack/react-query"
import axios from "axios";

interface UpdateProfileParams {
    userId: string
    formData: FormData
}

export const useUpdateProfileImage = () => {
    return useMutation({
        mutationFn: async ({ userId, formData }: UpdateProfileParams) => {
            const token: string | null = localStorage.getItem('access_token')

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/image/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            return response.data
        }
    })
}