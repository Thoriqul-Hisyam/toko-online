'use client';
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hook/useCart";
import { products } from "@/utils/products";
import { Rating } from "@mui/material"
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
    productDetails: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    quantity: number,
    price: number,
    selectedImage: SelectedImageType
}

export type SelectedImageType = {
    color: string,
    colorCode: string,
    image: string
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productDetails }) => {
    const { handleAddProductToCart, cartProducts } = useCart();

    const [isProductInCart, setIsProductInCart] = useState(false);

    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: productDetails.id,
        name: productDetails.name,
        description: productDetails.description,
        category: productDetails.category,
        brand: productDetails.brand,
        quantity: 1,
        price: productDetails.price,
        selectedImage: { ...productDetails.images[0] }
    })
    const router = useRouter()

    useEffect(() => {
        setIsProductInCart(false)
        if (cartProducts) {
            const existingIndex = cartProducts?.findIndex((item) => item.id === productDetails.id)
            if (existingIndex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [cartProducts])

    const productRating = productDetails.reviews.reduce((acc: number, item: any) =>
        item.rating + acc, 0) / productDetails.reviews.length

    const Horizontal = () => {
        return <hr className="w-[30%] my-2" />
    }
    const handleColorSelect = useCallback(
        (value: SelectedImageType) => {
            setCartProduct((prev) => {
                return { ...prev, selectedImage: value }
            })
        },
        [cartProduct.selectedImage])

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity == 99) {
            return;
        }

        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 }
        })
    }, [cartProduct])
    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity == 1) {
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 }
        })
    }, [cartProduct])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage
                cartProduct={cartProduct}
                product={productDetails}
                handleColorSelect={handleColorSelect}
            />
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-2xl font-medium text-slate-700">{productDetails.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div className="">{productDetails.reviews.length} reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify">
                    {productDetails.description}
                </div>
                <Horizontal />
                <div className="">
                    <span className="font-semibold">Category : </span>
                    {productDetails.category}
                </div>
                <div className="">
                    <span className="font-semibold">Brand : </span>
                    {productDetails.brand}
                </div>
                <div className={productDetails.inStock ? 'text-teal-600' : 'text-rose-600'}>
                    {productDetails.inStock ? 'In stock' : 'Out of stock'}
                </div>
                <Horizontal />
                {isProductInCart ? (<><p className="mb-2 text-slate-500 flex items-center gap-1">
                    <MdCheckCircle className="text-teal-400" size={20} />
                    <span>Product telah ditambahkan ke keranjang</span>
                </p>
                    <Button label="View Cart" outline onClick={() => { router.push("/cart") }} />
                </>) : (
                    <>
                        <SetColor
                            cartProduct={cartProduct}
                            images={productDetails.images}
                            handleColorSelect={handleColorSelect}
                        />
                        <Horizontal />
                        <SetQuantity
                            cartProduct={cartProduct}
                            handleQtyDecrease={handleQtyDecrease}
                            handleQtyIncrease={handleQtyIncrease}
                        />
                        <Horizontal />
                        <div className="max-w-[300px]">
                            <Button
                                label="Add to cart"
                                onClick={() => handleAddProductToCart(cartProduct)}
                            />

                        </div>
                    </>)}

            </div>
        </div>
    );
}

export default ProductDetails;