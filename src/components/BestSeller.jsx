import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';

const BestSeller = () => {
    const navigate = useNavigate()

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    const handleSeeMore = () => {
        navigate('/collection')
    };

    return (
        <div className='my-10'>
            <div className="text-center text-3xl py-8">
                <Title text1={'BEST'} text2={'SELLERS'} />
                {/* <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover our most popular timepieces, loved by watch enthusiasts around the world. Our best-selling watches combine timeless elegance, precision engineering, and unmatched quality, making them the perfect choice for anyone seeking sophistication and style in their wristwear.
                </p> */}
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
                {bestSeller.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleSeeMore}
                    className="px-6 py-3 bg-black text-white rounded-full shadow-lg transition duration-300 hover:bg-gray-800"
                >
                    See More
                </button>
            </div>
        </div>
    )
}

export default BestSeller
