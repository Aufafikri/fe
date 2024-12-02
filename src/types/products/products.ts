type categoryTypes = {
    id: string;
    name: string;
    type?: string;
    label?: string;
    size?: string;
    brand?: string;
    description?: string;
}

export type ProductTypes = {
    id: string;
    name: string;
    description: string;
    price: number | undefined;
    stock: number;
    image?: string;
    category: categoryTypes;
    categoryId: string;
    merchantId: string;
    quantity: any | undefined;
}