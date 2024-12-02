/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "www.its.ac.id",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "http",
                hostname: 'localhost',
                port: '5000',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
