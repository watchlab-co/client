import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';

const BestSeller = () => {
    const navigate = useNavigate();
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    const handleSeeMore = () => {
        navigate('/collection');
    };

    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center mb-3 bg-amber-50 px-4 py-1 rounded-full">
                        <TrendingUp size={16} className="text-amber-600 mr-2" />
                        <span className="text-sm font-medium text-amber-600">CUSTOMER FAVORITES</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Best Sellers</h2>
                    
                    <p className="max-w-2xl mx-auto text-gray-600 text-base leading-relaxed">
                        Our most coveted timepieces, chosen by discerning collectors worldwide. These signature pieces represent the pinnacle of craftsmanship and design.
                    </p>
                </div>

                {/* Featured Badge - Optional visual element */}
                <div className="flex justify-center mb-10">
                    <div className="h-px w-16 bg-amber-300"></div>
                </div>

                {/* Products Grid with Larger Featured Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                    {bestSeller.length > 0 && (
                        <div className="md:col-span-2 lg:col-span-2 row-span-2 bg-gray-50 rounded-lg p-6 relative">
                            <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                TOP PICK
                            </div>
                            <ProductItem 
                                id={bestSeller[0]._id} 
                                image={bestSeller[0].image} 
                                name={bestSeller[0].name} 
                                price={bestSeller[0].price} 
                                featured={true}
                            />
                        </div>
                    )}
                    
                    {/* Rest of the products */}
                    {bestSeller.slice(1).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <ProductItem 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price} 
                            />
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleSeeMore}
                        className="group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                        <span className="font-medium">Explore All Best Sellers</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BestSeller;