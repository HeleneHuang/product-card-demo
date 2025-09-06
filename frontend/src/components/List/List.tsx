import React from "react";
import Card from "../Card/Card";
import { demoProducts } from "../../data/products";

interface Product {
    id: number;
    title: string;
    desc: string;
    price: number;
    cat: string;
    img: string;
    img2: string;
    inStock: boolean;
    sizes: string[];
    features: string[];
    care: string[];
    shipping: string[];
    returns: string[];
}

interface Props {
    products: Product[];
}

const List: React.FC<Props> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {demoProducts.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </div>
    );
};

export default List;