import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)

    // Function to slice name if it's too long
    const truncateName = (text, limit = 40) => {
        return text.length > limit ? text.slice(0, limit) + "..." : text
    }

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className="relative w-full pb-[100%] overflow-hidden rounded-lg bg-gray-100">
                <img 
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out" 
                    src={image[0]} 
                    alt={name} 
                />
            </div>
            <p className="pt-3 pb-1 text-sm">{truncateName(name, 40)}</p>
            <p className="text-sm font-medium">{currency}{price}</p>
        </Link>
    )
}

export default ProductItem
