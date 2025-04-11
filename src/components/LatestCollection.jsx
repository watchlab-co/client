import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LatestCollection = () => {
    const navigate = useNavigate();
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));  // Display only the first 10 products
    }, [products]);

    // Helper function to calculate discounted price
    const getDiscountedPrice = (price, discount) => {
        if (discount && discount > 0) {
            return price - (price * discount / 100);
        }
        return null;  // Return null if there's no discount
    };

    const handleSeeMore = () => {
        navigate('/collection');
    };

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="h-px w-8 bg-amber-500"></div>
                            <span className="text-sm font-medium tracking-wider text-amber-600">NEW ARRIVALS</span>
                            <div className="h-px w-8 bg-amber-500"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Collections</h2>
                    </div>
                    <p className="max-w-2xl mx-auto text-gray-600 text-base leading-relaxed">
                        Explore our newest timepieces that blend sophistication with innovation. Each piece is crafted with meticulous attention to detail and exceptional quality.
                    </p>
                </div>

                {/* Filtering Tabs (optional) */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-md shadow-sm">
                        <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-l-lg hover:bg-indigo-50">
                            All
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-50">
                            Watches
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-50">
                            Accessories
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-r border-gray-200 rounded-r-lg hover:bg-gray-50">
                            Limited Edition
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
                    {latestProducts.map((item, index) => (
                        <ProductItem 
                            key={index} 
                            id={item._id} 
                            image={item.image} 
                            name={item.name} 
                            price={item.price} 
                            discount={item.discount || ''} 
                        />
                    ))}
                </div>

                {/* See More Button */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleSeeMore}
                        className="group flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="font-medium">View Collection</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LatestCollection;