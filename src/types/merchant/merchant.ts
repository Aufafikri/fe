export type ProductTypes = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image?: string;
    map: any
}

export type MerchantProfileProps = {
    storeName: string;
    storeDescription: string;
    image: string;
    id: string
    Product: ProductTypes
}