export type MenuType = {
    [index: number]: MenuType;
    id: string;
    slug: string;
    title: string;
    desc?: string;
    img?: string;
    color: string;
}[];

export type ProductType = {
    [index: number]: ProductType;
    id: string;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    options: Options[],
};
export type Options = {
    title: string,
    additionalPrice: number,
};

export type OrderType = {
    [index: number]: OrderType;
    id: string;
    createdAt: string;
    price: number;
    products: CartItemType[];
    status: string;
    intent_id?: String;
};

export type CartItemType = {
    [index: number]: CartItemType;
    id: string;
    title: string;
    img?: string;
    price: number;
    optionTitle?: string;
    quantity: number;
};

export type CartType = {
    [index: number]: CartType;
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
};

export type ActionTypes = {
    addToCart: (item: CartItemType) => void;
    removeFromCart: (item: CartItemType) => void;
};

export type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
};

