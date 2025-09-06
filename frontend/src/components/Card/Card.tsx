import React from "react";
import { useNavigate } from "react-router-dom";

interface Product {
    id: number;
    title: string;
    img: string;
    price: number;
}

const Card: React.FC<{ product: Product }> = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all w-full h-full"
            onClick={handleClick}
        >
            <img
                src={product.img}
                alt={product.title}
                className="object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <div className="text-lg font-semibold text-gray-900 mt-2">
                    ${product.price}
                </div>
            </div>
        </div>
    );
};

export default Card;