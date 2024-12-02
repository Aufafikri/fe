import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAddress = () => {
    return useQuery({
        queryKey: ["address"],
        queryFn: async () => {
            const response = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
            console.log(response.data.provinsi)
            return response.data.provinsi
        }
    })
}

export const useCitiesAddress = (provinceId: string | null) => {
    return useQuery({
        queryKey: ["cities", provinceId],
        queryFn: async () => {
            if (!provinceId) return [];
            try {
                const response = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provinceId}`)
                return response.data.kota_kabupaten
            } catch (error) {
                console.error("Error fetching cities: ", error);
                return [];
            }
        },
        // enabled: !!provinceId
    })
}