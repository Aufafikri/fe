import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: async (data: { email: string; otp: string }) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`, data);
            return response.data;
        },
        onError: (error) => {
            console.error("Error during OTP verification:", error);
        },
        onSuccess: (data) => {
            console.log("OTP verification successful:", data);
        },
    });
};
