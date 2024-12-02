import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type loginUser = {
    email: string;
    password: string
}

export const useCreateLoginUser = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async (body: loginUser) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, body)
            return response.data
        },
        onSuccess: (data) => {
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                toast.success("welcome to our dashboard!")
                setTimeout(() => {
                    router.push('/')
                }, 1000);
        }
    })
}