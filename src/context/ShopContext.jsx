import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const ShopContext = createContext();


const ShopContextProvider = (props) => {

    const currency = '₹'
    const delivery_fee = 0;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;// backend url

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token,setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size')
            return false;
        }

        
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if(token){
            try {
                const res = await axios.post(backendUrl + '/api/cart/add',{itemId, size},{headers:{token}})
                return res
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                return false
            }
        }else{
            console.log("No Token found");
            return false
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if(token){
            try {
                
                await axios.post(backendUrl + '/api/cart/update',{itemId, size, quantity},{headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
    
            if (!itemInfo) {
                console.warn(`Product with ID ${items} not found in products list.`);
                continue; // Skip if the product is not found
            }
    
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
        return totalAmount;
    };
    


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/listproduct');
            console.log(backendUrl + '/api/product/listproduct')
            if (response.data.success) {
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    };

    const getUserCart = async( token )=>{
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
        getUserCart(storedToken);  // Pass the token to fetch the cart data
    }
}, []);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;