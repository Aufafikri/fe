import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export const useResetPasswordUser = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async ({ token, newPassword }: { token: string, newPassword: string }) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password?token=${token}`, { newPassword } )
            return response.data
        },
        onError: (error) => {
            // Handle error here, e.g., show error message
            console.error("Error during forgot password request:", error);
          },
          onSuccess: (data) => {
            toast.success("Your password has been reset successfully")
            setTimeout(() => {
              router.push('/login')
            }, 1000);
            console.log("Forgot password request successful:", data);
          },
    })
}