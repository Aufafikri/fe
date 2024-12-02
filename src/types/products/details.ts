type categoryTypes = {
    id: string;
    name: string;
    type?: string;
    label?: string;
    size?: string;
    brand?: string;
    description?: string;
}

type MerchantTypes = {
    id: string;
    storeName: string;
    storeDescription: string;
    image?: string;

}

export type ProductDetailTypes = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image?: string;
    Merchant: MerchantTypes;
    category: categoryTypes;
    categoryId: string;
    merchantId: string;
}