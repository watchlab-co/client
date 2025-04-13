import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, Star } from 'lucide-react';

const BestSeller = () => {
    const navigate = useNavigate();
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for a smooth experience
        setIsLoading(true);
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
        
        // Add a short delay to show loading state
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        
        return () => clearTimeout(timer);
    }, [products]);

    const handleSeeMore = () => {
        navigate('/collection');
    };

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
            <div className="sm:col-span-2 lg:col-span-2 row-span-2 bg-gray-50 rounded-lg p-6 animate-pulse">
                <div className="h-64 sm:h-80 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );

    return (
        <section className="py-12 sm:py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <div className="inline-flex items-center justify-center mb-3 bg-amber-50 px-4 py-1.5 rounded-full">
                        <TrendingUp size={16} className="text-amber-600 mr-2" />
                        <span className="text-sm font-medium text-amber-600">CUSTOMER FAVORITES</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Our Best Sellers
                    </h2>
                    
                    <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
                        Discover our most sought-after timepieces, curated from the finest watchmakers around the world.
                    </p>
                </div>

                {/* Decorative element */}
                <div className="flex justify-center mb-8 sm:mb-10">
                    <div className="h-0.5 w-16 bg-amber-400 rounded-full"></div>
                </div>

                {/* Products Grid - Responsive layout */}
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 gap-y-8 sm:gap-y-10">
                        {bestSeller.length > 0 && (
                            <div className="sm:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 sm:p-6 relative shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center">
                                    <Star size={12} className="mr-1 fill-current" /> 
                                    <span>TOP RATED</span>
                                </div>
                                
                                <div className="h-full flex flex-col">
                                    <div className="flex-1 mb-4 overflow-hidden rounded-lg">
                                        <img 
                                            src={bestSeller[0].image[0] || "/api/placeholder/500/600"} 
                                            alt={bestSeller[0].name} 
                                            className="w-40 h-40 object-cover transform transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                    
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {bestSeller[0].name}
                                        </h3>
                                        
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 mb-3">
                                            <span className="text-amber-600 font-bold text-lg sm:text-xl">
                                                ${bestSeller[0].price}
                                            </span>
                                            
                                            {bestSeller[0].originalPrice && (
                                                <span className="text-gray-500 line-through text-sm">
                                                    ${bestSeller[0].originalPrice}
                                                </span>
                                            )}
                                            
                                            {bestSeller[0].discount && (
                                                <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
                                                    {bestSeller[0].discount}% OFF
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex justify-center sm:justify-start mb-3">
                                            <div className="flex text-amber-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={16} 
                                                        fill={i < 5 ? "currentColor" : "none"} 
                                                        className={i < 5 ? "" : "text-gray-300"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">(128)</span>
                                        </div>
                                        
                                        <button 
                                            onClick={() => navigate(`/product/${bestSeller[0]._id}`)}
                                            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 sm:py-3 px-4 rounded-lg font-medium transition-colors duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Regular product cards */}
                        {bestSeller.slice(1).map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 sm:p-4 flex flex-col">
                                <div className="relative mb-3 flex-1">
                                    {item.discount && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {item.discount}% OFF
                                        </div>
                                    )}
                                    
                                    <div className="h-36 sm:h-40 flex items-center justify-center overflow-hidden rounded-md">
                                        <img 
                                            src={item.image[0] || "/api/placeholder/300/300"} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2 h-10 sm:h-12">
                                        {item.name}
                                    </h3>
                                    
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    size={12} 
                                                    fill={i < 4 ? "currentColor" : "none"} 
                                                    className={i < 4 ? "" : "text-gray-300"}
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-1 text-xs text-gray-500">(64)</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-amber-600 font-semibold">${item.price}</span>
                                            {item.originalPrice && (
                                                <span className="text-gray-500 line-through text-xs">${item.originalPrice}</span>
                                            )}
                                        </div>
                                        
                                        <button 
                                            onClick={() => navigate(`/product/${item._id}`)}
                                            className="text-amber-600 hover:text-amber-800 text-sm font-medium transition-colors"
                                            aria-label={`View ${item.name} details`}
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* "See More" Button */}
                <div className="flex justify-center mt-10 sm:mt-12">
                    <button
                        onClick={handleSeeMore}
                        className="group flex items-center gap-2 bg-white border border-amber-500 text-amber-600 hover:bg-amber-50 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-sm transition-all duration-300 hover:shadow focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                        <span className="font-medium">View All Best Sellers</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BestSeller;