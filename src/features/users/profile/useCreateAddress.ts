import { useMutation } from "@tanstack/react-query"
import axios from "axios"

interface AddressProps {
    country: string;
    province: string;
    city: string;
    zipCode: string;
    subdistrict: string;
    district: string;
    street: string;
    description?: string | undefined;
}

export const useCreateAddress = () => {
    return useMutation({
        mutationFn: async (body: AddressProps) => {
            const token = localStorage.getItem('access_token')

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/address`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }
    })
}