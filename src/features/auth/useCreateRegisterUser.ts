import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type registerUser = {
    name: string;
    email: string;
    password: string
}

export const useCreateRegisterUser = () => {
    return useMutation({
        mutationFn: async (body: registerUser) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, body)
            return response.data
        }
    })
}