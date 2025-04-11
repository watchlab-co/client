import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import toast from 'react-hot-toast';

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products = [], currency, addToCart } = useContext(ShopContext);
  const videoRef = useRef(null);

  const [productData, setProductData] = useState(null);
  const [mediaType, setMediaType] = useState('image'); // 'image' or 'video'
  const [selectedMedia, setSelectedMedia] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const fetchProductData = () => {
      if (!products || products.length === 0) return;

      const foundProduct = products.find(item => item._id === productId);
      if (foundProduct) {
        console.log('====================================');
        console.log('Product found:', foundProduct);
        console.log('====================================');
        setProductData(foundProduct);
        
        // Set default media (prioritize first image if available)
        if (foundProduct.image && foundProduct.image.length > 0) {
          setSelectedMedia(foundProduct.image[0]);
          setMediaType('image');
        } else if (foundProduct.video) {
          setSelectedMedia(foundProduct.video);
          setMediaType('video');
        }
      }
    };

    fetchProductData();
  }, [productId, products]);

  // Handle media selection
  const handleMediaSelect = (media, type) => {
    setSelectedMedia(media);
    setMediaType(type);
    
    // Pause any playing video when switching media
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  if (!productData) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  // Create a combined media array for the gallery
  const productMedia = [
    ...(productData.image || []).map(img => ({ src: img, type: 'image' })),
    ...(productData.video ? [{ src: productData.video, type: 'video' }] : [])
  ];

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images & video */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productMedia.map((media, index) => (
              <div 
                key={index} 
                onClick={() => handleMediaSelect(media.src, media.type)}
                className="relative w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              >
                {media.type === 'image' ? (
                  <img
                    className="w-full h-auto"
                    src={media.src}
                    alt={`Product Media ${index + 1}`}
                  />
                ) : (
                  <div className="relative">
                    <video 
                      className="w-full h-auto"
                      src={media.src}
                      muted
                      poster={productData.videoPoster || productData.image?.[0]}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            {mediaType === 'image' ? (
              <img 
                className="w-full h-auto" 
                src={selectedMedia} 
                alt="Selected Product" 
              />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-auto"
                src={selectedMedia}
                controls
                poster={productData.videoPoster || productData.image?.[0]}
              />
            )}
          </div>
        </div>

        {/* Product information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="Star" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Size selection */}
          {productData?.colours?.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select colour</p>
              <div className="flex gap-2">
                {productData?.colours?.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={async () => {
              if (!size && productData?.colours?.length > 0) {
                toast.error('Please select a colour.');
                return;
              }
              const added = await addToCart(productData._id, size);
              console.log(added);

              if (added) {
                toast.success('Item added to cart!');
                navigate('/cart');
              } else {
                toast.error('Please Login with Account')
                navigate("/login")
              }
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Review and Description */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce website is an online platform that facilitates buying and selling the products online.</p>
          <p>E-commerce websites typically display products or services along with detailed product information for users to find it easy for purchasing.</p>
        </div>
      </div>

      {/* Displaying related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        productId={productId}
      />
    </div>
  );
};

export default Product;