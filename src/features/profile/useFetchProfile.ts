import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast";

type UserProfile = {
    id: string
    name: string;
    email: string
    profileImage: string;
    role: string;
    phone: string;
    Merchant: {
        storeName: string
    }
    Address: {
        id: string;
        country: string;     // Negara
        province: string;    // Provinsi
        city: string;        // Kota
        district: string;    // Kecamatan
        subdistrict: string; // Kelurahan/Desa
        zipCode: string;     // Kode pos
        street: string;      // Nama jalan
        description: string; // Deskripsi alamat
        createdAt: string;   // 
    }
}

const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
            refreshToken: refreshToken
        })

        const { access_token, refresh_token } = response.data
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token)

        return access_token
    } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        toast.error('Oops! Your token has expired. Please login again.');
        window.location.href = '/login';
        throw error
    }
}

const fetchProfile = async (): Promise<UserProfile> => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) { 
            toast.error('Oops! Your token has expired. Trying to refresh...');
            try {
                const newAccessToken = await refreshToken();
                // Retry the original request with the new access token
                const retryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`
                    }
                });
                return retryResponse.data;
            } catch (retryError) {
                toast.error('Failed to refresh token. Please login again.');
                throw retryError;
            }
        } else {
            toast.error('Failed to fetch profile. Please try again.');
            throw error;
        }
    }
};

export const useFetchProfileUser = () => {
    return useQuery<UserProfile>({
        queryKey: ["fetch-profile"],
        queryFn: fetchProfile,        
        retry: false, // Prevent automatic retry by React Query
        refetchOnWindowFocus: true, // Refetch data when the window regains focus
        refetchInterval: 5000,
         // Optional: Automatically refetch data at a set interval
    });
};

// import axiosInstance from "@/lib/axios";
// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"
// import toast from "react-hot-toast";

// type UserProfile = {
//     id: string
//     name: string;
//     email: string
//     profileImage: string;
//     role: string
//     Merchant: {
//         storeName: string
//     }
//     Address: {
//         id: string;
//         country: string;     // Negara
//         province: string;    // Provinsi
//         city: string;        // Kota
//         district: string;    // Kecamatan
//         subdistrict: string; // Kelurahan/Desa
//         zipCode: string;     // Kode pos
//         street: string;      // Nama jalan
//         description: string; // Deskripsi alamat
//         createdAt: string;   // 
//     }
// }

// const refreshToken = async () => {
//     const refreshToken = localStorage.getItem('refresh_token')
//     if (!refreshToken) {
//         throw new Error('No refresh token found');
//     }

//     try {
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
//             refreshToken: refreshToken
//         })

//         const { access_token, refresh_token } = response.data
//         localStorage.setItem('access_token', access_token);
//         localStorage.setItem('refresh_token', refresh_token)

//         return access_token
//     } catch (error) {
//         console.error('Error refreshing token:', error);
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         toast.error('Oops! Your token has expired. Please login again.');
//         window.location.href = '/login';
//         throw error
//     }
// }

// const fetchProfile = async (): Promise<UserProfile> => {
//     const accessToken = localStorage.getItem('access_token');
//     if (!accessToken) {
//         throw new Error('No access token found');
//     }

//     try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         });
//         return response.data;
//     } catch (error: any) {
//         if (error.response?.status === 401) { 
//             toast.error('Oops! Your token has expired. Trying to refresh...');
//             try {
//                 const newAccessToken = await refreshToken();
//                 // Retry the original request with the new access token
//                 const retryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`, {
//                     headers: {
//                         Authorization: `Bearer ${newAccessToken}`
//                     }
//                 });
//                 return retryResponse.data;
//             } catch (retryError) {
//                 toast.error('Failed to refresh token. Please login again.');
//                 throw retryError;
//             }
//         } else {
//             toast.error('Failed to fetch profile. Please try again.');
//             throw error;
//         }
//     }
// };

// export const useFetchProfileUser = () => {
//     return useQuery<UserProfile>({
//         queryKey: ["fetch-profile"],
//         queryFn: fetchProfile,        
//         retry: false, // Prevent automatic retry by React Query
//         refetchOnWindowFocus: true, // Refetch data when the window regains focus
//         refetchInterval: 5000,
//          // Optional: Automatically refetch data at a set interval
//     });
// };