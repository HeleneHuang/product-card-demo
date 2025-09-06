import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import Cart from "../Cart/Cart";

const MiniNavbar: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const products = useSelector((state: RootState) => state.cart.products);
    const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* 固定右上角的按钮区域 */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-4 px-4 py-2 rounded-lg">
                <a
                    href="/"
                    className="text-lg font-medium text-gray-700 hover:text-indigo-600"
                >
                    Home
                </a>

                <div
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative text-lg font-medium text-gray-700 hover:text-indigo-600 cursor-pointer"
                >
                    Cart
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {totalQuantity}
                        </span>
                    )}
                </div>
            </div>

            {/* 条件渲染购物车弹出 */}
            {isCartOpen && (
                <div className="fixed top-16 right-4 w-full sm:w-96 max-h-[80vh] bg-white shadow-xl border border-gray-300 rounded-lg p-4 z-50 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-gray-500 hover:text-black text-2xl"
                        >
                            ×
                        </button>
                    </div>
                    <Cart />
                </div>
            )}
        </>
    );
};

export default MiniNavbar;