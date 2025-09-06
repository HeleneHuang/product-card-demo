import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { Fragment } from 'react'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { addToCart } from "../../redux/cartReducer";
import Navbar from "../../components/Navbar/Navbar";

interface Product {
    id: number;
    title: string;
    desc: string;
    price: number;
    sizes: string[];
    img: string;
    img2: string;
    inStock: boolean;
    features: string[];
    care: string[];
    shipping: string[];
    returns: string[];
}

const DisclosureItem: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <Disclosure as="div" className="w-full max-w-md">
        {({ open }) => (
            <>
                <DisclosureButton className="w-full border-t pt-2 pb-2 text-left font-medium text-gray-800">
                    {title}
                </DisclosureButton>
                <div className="overflow-hidden py-2 text-gray-600">
                    <AnimatePresence>
                        {open && (
                            <DisclosurePanel static as={Fragment}>
                                <motion.ul
                                    initial={{ opacity: 0, y: -24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -24 }}
                                    transition={{ duration: 0.2, ease: easeOut }}
                                    className="origin-top list-disc pl-5 space-y-1"
                                >
                                    {items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </motion.ul>
                            </DisclosurePanel>
                        )}
                    </AnimatePresence>
                </div>
            </>
        )}
    </Disclosure>
);

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [selectedImg, setSelectedImg] = useState<"img1" | "img2">("img1");
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/products/${id}`)
                setProduct(res.data)
            } catch (err) {
                console.error("Failed to fetch product", err)
                setError("Product not found")
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) return <div className="p-8 text-xl">Loading...</div>
    if (error || !product) return <div className="p-8 text-xl text-red-600">{error || "Error"}</div>

    return (
        <div>
            <Navbar />
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto p-8">
                {/* Left - Images */}
                <div className="flex-1">
                    <div className="flex gap-4">
                        <div>
                            <img
                                src={selectedImg === 'img1' ? product.img : product.img2}
                                alt="Main"
                                className="w-full h-auto object-cover rounded"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <img
                            src={product.img}
                            onClick={() => setSelectedImg('img1')}
                            className={`w-20 h-20 object-cover cursor-pointer rounded 
                            ${selectedImg === 'img1' ? 'ring-2 ring-blue-500' : ''}`}
                            alt="Thumbnail 1"
                        />
                        <img
                            src={product.img2}
                            onClick={() => setSelectedImg('img2')}
                            className={`w-20 h-20 object-cover cursor-pointer rounded 
                            ${selectedImg === 'img2' ? 'ring-2 ring-blue-500' : ''}`}
                            alt="Thumbnail 2"
                        />
                    </div>
                </div>

                {/* Right - Info */}
                <div className="flex-1">

                    <h1 className="text-5xl font-bold mb-2">{product.title}</h1>
                    <p className="text-4xl text-gray-800 my-4">${product.price}</p>
                    <p className="text-gray-600 mb-4">{product.desc}</p>

                    {/* choose the size of the product */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">SIZE</label>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`my-2 px-4 py-2 border rounded 
                                    ${selectedSize === size
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-800 border-gray-300'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* choose the amount of product */}
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            className="px-3 py-1 bg-gray-200 rounded"
                        > - </button>
                        <span>{quantity}</span>
                        <button
                            onClick={() => setQuantity(prev => prev + 1)}
                            className="px-3 py-1 bg-gray-200 rounded"
                        > + </button>
                    </div>

                    {/* add to cart button */}
                    <button
                        className={`w-full py-3 mt-4 rounded text-white text-sm font-medium 
                        transition-all duration-200 
                        ${product.inStock ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!product.inStock}
                        onClick={() => {
                            if (!selectedSize) {
                                alert("Please select a size before adding to cart.")
                                return;
                            }
                            dispatch(addToCart({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                img: product.img,
                                size: selectedSize,
                                quantity
                            }))
                        }}
                    >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>

                    {/* detailed info */}
                    <div className="mt-8 space-y-2">
                        <DisclosureItem title="Features" items={product.features} />
                        <DisclosureItem title="Care Instructions" items={product.care} />
                        <DisclosureItem title="Shipping Info" items={product.shipping} />
                        <DisclosureItem title="Returns Policy" items={product.returns} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;