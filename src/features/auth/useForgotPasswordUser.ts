import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`,
        { email }
      );

      sessionStorage.setItem("email", email);

      return response.data;
    },
    onError: (error) => {
      console.error("Error during forgot password request:", error);
    },
    onSuccess: (data) => {
      console.log("Forgot password request successful:", data);
    },
  });
};
