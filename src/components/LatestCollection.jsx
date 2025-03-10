import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';

const LatestCollection = () => {
    const navigate = useNavigate()
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
        navigate('/collection')
    };

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"LATEST"} text2={'COLLECTIONS'} />
                {/* <p className='2-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Explore the latest additions to our exquisite watch collection, where timeless elegance meets modern craftsmanship.
                    From classic designs to contemporary styles, our latest range showcases the perfect blend of functionality and luxury.
                    Whether you're seeking a statement piece or an everyday accessory, our collection is designed to elevate your look for any occasion.
                </p> */}
            </div>

            {/* Rendering products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                      latestProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price = {item.price}  discount ={item.discount || ''} />
                     ))
                }
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
    );
};

export default LatestCollection;
