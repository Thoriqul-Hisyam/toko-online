"use client"
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
type CartContextType = {
    cartTotalQty: number
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

    useEffect(() => {
        const cartItem: any = localStorage.getItem('eShopCartItems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItem);

        setCartProducts(cProducts);
    }, []);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }

            toast.success("Produk berhasil ditambahkan");
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);
    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }

    return <CartContext.Provider value={value} {...props} />
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be use within a CartContext Provider")
    }
    return context
}