import { ProductDetailTypes } from "@/types/products/details"
import { ProductTypes } from "@/types/products/products"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFetchProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
            return response.data.data
        }
    })
}

export const useFetchProductId = (id: string) => {
    return useQuery<ProductDetailTypes>({
        queryKey: ["productId"],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`)
            return response.data
        }
    })
}