import { useQuery } from "@tanstack/react-query"
import axios from "axios"


type UsersProps = {
    id: string;
    email: string;
    name: string;
    role: string;
    isVerified: boolean;
    Merchant?: {
        storeName: string;
    }
}

export const useFetchAllUsers = () => {
    return useQuery<UsersProps[]>({
        queryKey: ["fetch all users"],
        queryFn: async () => {
            const token = localStorage.getItem('access_token')

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }
    })
}