import type { RootState } from "../../redux/store";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useSelector, useDispatch } from "react-redux";

interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
    img: string;
    size: string;
}

const Cart: React.FC = () => {
    const products = useSelector((state: RootState) => state.cart.products as Product[]);
    const dispatch = useDispatch();

    const totalPrice = (): string => {
        let total = 0;
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    };

    const handlePayment = () => {
        // Fake backend logic for now
        const minimalProducts = products.map((p) => ({
            id: p.id,
            quantity: p.quantity || 1,
        }));
        console.log("Simulating checkout with products:", minimalProducts);
        alert("Checkout simulated. Total: $" + totalPrice());
    };

    return (
        <div className="w-full">
            {products?.map((item) => (
                <div key={item.id} className="flex items-start gap-4 border-b pb-4 mb-4">
                    {/* img */}
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-20 h-30 object-cover rounded"
                    />
                    {/* title and size info */}
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold text-gray-800">{item.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium text-gray-700">{item.size}</span>
                        </p>
                        <div className="text-gray-600">
                            {item.quantity} x ${item.price}
                        </div>
                    </div>
                    {/* remove item */}
                    <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-red-500 hover:text-red-700 text-sm mt-11"
                    >
                        Delete
                    </button>
                </div>
            ))}

            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-800">SUBTOTAL</span>
                <span className="text-lg font-semibold text-indigo-600">${totalPrice()}</span>
            </div>

            <div className="flex justify-between items-center">
                <button
                    onClick={() => dispatch(resetCart())}
                    className="text-sm text-red-500 hover:text-red-700"
                >
                    Reset Cart
                </button>
                <button
                    onClick={handlePayment}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                >
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </div>
    );
};

export default Cart;