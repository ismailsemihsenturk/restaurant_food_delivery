"use client"
import { ProductType } from '@/types/types';
import { useCartStore } from '@/utils/store';
import { Decimal } from '@prisma/client/runtime/library';
import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {

    //When you declare in an interface that a property is a number then it stays as a declaration only, it won't be translated into javascript. You have to cast it.
    const [total, setTotal] = useState(Number.parseFloat(product.price.toString()));
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(0);
    product.price = Number.parseFloat(product.price.toString());
    const { addToCart } = useCartStore();


    useEffect(() => {
        useCartStore.persist.rehydrate();

        return () => {
        }
    }, []);


    useEffect(() => {
        if (product.options?.length !== 0) {
            product.options[selected].additionalPrice = Number.parseFloat(product.options[selected].additionalPrice.toString());
            setTotal(quantity * (product.price + product.options[selected]?.additionalPrice));
        }
        else {
            setTotal(quantity * product.price);
        }
        return () => {
        }
    }, [quantity, selected, product]);


    const handleCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            img: product.img,
            price: total,
            ...(product.options?.length && {
                optionTitle: product.options[selected].title,
            }),
            quantity: quantity,
        })
        toast.success("The product added to the cart!")
    };


    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>${total.toFixed(2)}</h2>
            {/** Options Container */}
            <div className='flex gap-4'>
                {product.options?.map((option, index) => (
                    <button className='min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md' key={option.title}
                        style={{
                            background: selected === index ? "rgb(248 113 113)" : "white",
                            color: selected === index ? "white" : "red"
                        }}
                        onClick={() => setSelected(index)}
                    >
                        {option.title}
                    </button>
                ))}
            </div>
            {/** Quantity Container */}
            <div className='flex justify-between items-center'>
                <div className='flex justify-between w-full p-3 ring-1 ring-red-500'>
                    <span>Quantity</span>
                    <div className='flex gap-4 items-center '>
                        <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>{'<'}</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}>{'>'}</button>
                    </div>
                </div>
                {/** Cart Button */}
                <button className='uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-400' onClick={handleCart}> Add to Cart </button>
            </div>
        </div>
    )
}

export default Price