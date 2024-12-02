import { useQuery } from "@tanstack/react-query"

export const useLoginGoogle = () => {
    return useQuery({
        queryKey: ["google"],
        queryFn: async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const accessToken = urlParams.get('access_token')
            const refreshToken = urlParams.get('refresh_token')
        }
    })
}