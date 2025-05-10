import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const { products, search, showSearch, currency } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  // Available brands for filtering
  const availableBrands = [
    "Rolex", "Casio", "Seiko", "Fossil", "Rado", "PatekPhilippe", "Cartier", "Tissot"
  ];

  // Toggle category selection
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  // Toggle subcategory selection
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setPriceRange({ min: 0, max: 10000 });
    setSortType('relevant');
    
    // Reset all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset price range inputs
    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');
    if (minInput) minInput.value = 0;
    if (maxInput) maxInput.value = 10000;
  };

  // Apply filters to the products
  const applyFilter = () => {
    setIsLoading(true);
    let productsCopy = products.slice();

    // Search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // Subcategory (brand) filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // Price range filter
    productsCopy = productsCopy.filter(item => {
      const itemPrice = item.price || item.discount;
      return itemPrice >= priceRange.min && itemPrice <= priceRange.max;
    });

    setFilterProducts(productsCopy);
    setTimeout(() => setIsLoading(false), 300); // Add a small delay to show loading state
  };

  // Sort products
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price || 0) - (b.price || 0)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price || 0) - (a.price || 0)));
        break;
      case 'newest':
        setFilterProducts(fpCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        break;
      case 'bestselling':
        setFilterProducts(fpCopy.sort((a, b) => (b.sold || 0) - (a.sold || 0)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Handle price range changes
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, priceRange]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Set loading state when component mounts
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-gray-200">
        {/* Filter Sidebar */}
        <div className="w-full sm:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 
                onClick={() => setShowFilter(!showFilter)}
                className="text-xl font-semibold flex items-center gap-2 cursor-pointer"
              >
                <span>Filters</span>
                <img 
                  className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} 
                  src={assets.dropdown_icon} 
                  alt="Toggle filters" 
                />
              </h2>
              
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Clear All
              </button>
            </div>

            {/* Filter Sections */}
            <div className={`space-y-6 ${showFilter ? '' : 'hidden'} sm:block`}>
              {/* Category Filter */}
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {['Men', 'Women', 'Couple'].map((cat, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        id={`category-${cat}`}
                        type="checkbox"
                        value={cat}
                        onChange={toggleCategory}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${cat}`} className="ml-2 text-sm text-gray-700">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {availableBrands.map((brand, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        id={`brand-${brand}`}
                        type="checkbox"
                        value={brand}
                        onChange={toggleSubCategory}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-1/2 pr-2">
                      <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">Min</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-sm text-gray-500">
                          {currency}
                        </span>
                        <input
                          id="min-price"
                          type="number"
                          min="0"
                          value={priceRange.min}
                          onChange={(e) => handlePriceChange(e, 'min')}
                          className="pl-6 pr-2 py-1 w-full border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 pl-2">
                      <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">Max</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-sm text-gray-500">
                          {currency}
                        </span>
                        <input
                          id="max-price"
                          type="number"
                          min="0"
                          value={priceRange.max}
                          onChange={(e) => handlePriceChange(e, 'max')}
                          className="pl-6 pr-2 py-1 w-full border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            
            {/* Products count and sort options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filterProducts.length}</span> products
              </p>
              
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-2 bg-white focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="bestselling">Best Selling</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-48 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : filterProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {filterProducts.map((item, index) => (
                <ProductItem 
                  key={index} 
                  id={item._id} 
                  name={item.name} 
                  image={item.image} 
                  price={item.price} 
                  discount={item.discount || ''} 
                />
              ))}
            </div>
          ) : (
            // No products found
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
              <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
              <button 
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;