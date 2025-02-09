import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, discount }) => {
    const { currency } = useContext(ShopContext);

    // Function to truncate long product names
    const truncateName = (text, limit = 40) => {
        return text.length > limit ? text.slice(0, limit) + "..." : text;
    };

    // Calculate discount percentage
    const calculateDiscount = () => {
        if (!discount || discount <= price) return null;
        return Math.round(((discount - price) / discount) * 100);
    };

    const discountPercentage = calculateDiscount();

    return (
        <Link className="text-gray-700 cursor-pointer block" to={`/product/${id}`}>
            <div className="relative w-full pb-[100%] overflow-hidden rounded-xl bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                {/* Product Image */}
                <img 
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-300 ease-in-out" 
                    src={image[0]} 
                    alt={name} 
                />
                
                {/* Discount Badge */}
                {discountPercentage !== null && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full shadow-md">
                        -{discountPercentage}%
                    </div>
                )}
            </div>

            {/* Product Details */}
            <p className="pt-3 pb-1 text-sm font-medium text-gray-800">{truncateName(name, 40)}</p>
            <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-black">{currency}{price || discount}</p>
                {discount && <p className="text-xs font-medium text-gray-500 line-through">{currency}{discount}</p>}
            </div>
        </Link>
    );
};

export default ProductItem;