import { useMutation } from "@tanstack/react-query"
import axios from 'axios'
import toast from "react-hot-toast"

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: async ({body, merchantId}: { body: FormData, merchantId: string | undefined}) => {
            console.log("Mutation function called with merchantId:", merchantId);
            const token = localStorage.getItem('access_token')

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${merchantId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // "Content-Type": "multipart/form-data"
                }
            })

            console.log("Response from API:", response.data);

            return response.data
        },
        onSuccess: () => {
            toast.success("sucess!");
          },
          onError: (error) => {
            console.error("Error creating post:", (error as Error).message);
            toast.error("error");
          },
    })
}