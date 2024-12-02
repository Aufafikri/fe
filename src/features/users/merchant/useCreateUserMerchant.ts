import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

interface MerchantProps {
  storeName: string;
  storeDescription: string;
  merchantImage?: File | null;
}

export const useCreateUserMerchant = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (body: FormData) => {
      try {
        const token = localStorage.getItem("access_token")

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/merchant`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error creating merchant:", error);
        throw error;
      }
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push('/settings/your-account')
      }, 1000);
      toast.success("sucess!");
    },
    onError: (error) => {
      console.error("Error creating post:", (error as Error).message);
      toast.error("error", error);
    },
  });
};
