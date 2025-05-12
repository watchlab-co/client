import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

// Constants for better maintenance
const CATEGORIES = ['Men', 'Women', 'Couple'];
const BRANDS = [
  "Rolex", "Casio", "Seiko", "Fossil", "Rado", "PatekPhilippe", "Cartier", "Tissot"
];
const SORT_OPTIONS = {
  relevant: { label: 'Sort by: Relevant', fn: null },
  'low-high': { label: 'Price: Low to High', fn: (a, b) => (a.price || a.discount || 0) - (b.price || b.discount || 0) },
  'high-low': { label: 'Price: High to Low', fn: (a, b) => (b.price || b.discount || 0) - (a.price || a.discount || 0) },
  newest: { label: 'Newest First', fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  bestselling: { label: 'Best Selling', fn: (a, b) => (b.sold || 0) - (a.sold || 0) }
};
const DEFAULT_PRICE_RANGE = { min: 0, max: 10000 };
const PRODUCTS_PER_PAGE = 12;

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch, currency } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (showSearch && search) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      result = result.filter(item => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      result = result.filter(item => subCategory.includes(item.subCategory));
    }

    // Apply price range filter
    result = result.filter(item => {
      const itemPrice = item.price || item.discount || 0;
      return itemPrice >= priceRange.min && itemPrice <= priceRange.max;
    });

    // Apply sorting
    const sortFn = SORT_OPTIONS[sortType]?.fn;
    if (sortFn) {
      result.sort(sortFn);
    }

    return result;
  }, [products, search, showSearch, category, subCategory, priceRange, sortType]);
  
  // Calculate pagination data
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, subCategory, search, priceRange, sortType]);

  // Toggle category selection - memoized to prevent recreating on every render
  const toggleCategory = useCallback((e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  }, []);

  // Toggle subcategory selection - memoized callback
  const toggleSubCategory = useCallback((e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setCategory([]);
    setSubCategory([]);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSortType('relevant');
    setCurrentPage(1);
    
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset price inputs
    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');
    if (minInput) minInput.value = DEFAULT_PRICE_RANGE.min;
    if (maxInput) maxInput.value = DEFAULT_PRICE_RANGE.max;
  }, []);

  // Handle price range changes
  const handlePriceChange = useCallback((e, type) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPriceRange(prev => ({
        ...prev,
        [type]: value
      }));
    }
  }, []);
  
  // Handle page change
  const changePage = useCallback((pageNumber) => {
    // Ensure page number is within valid range
    const validPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(validPage);
    
    // Scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [totalPages]);

  // Loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Pagination controls component
  const PaginationControls = () => {
    if (totalPages <= 1) return null;
    
    const renderPageNumbers = () => {
      const pages = [];
      const maxPagesToShow = 5;
      
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      // Adjust if we're at the end
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      // Always show first page
      if (startPage > 1) {
        pages.push(
          <button 
            key="1" 
            onClick={() => changePage(1)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
          >
            1
          </button>
        );
        
        // Add ellipsis if there's a gap
        if (startPage > 2) {
          pages.push(
            <span key="start-ellipsis" className="w-8 h-8 flex items-center justify-center">...</span>
          );
        }
      }
      
      // Add page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button 
            key={i} 
            onClick={() => changePage(i)}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage === i 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-100'
            }`}
          >
            {i}
          </button>
        );
      }
      
      // Always show last page
      if (endPage < totalPages) {
        // Add ellipsis if there's a gap
        if (endPage < totalPages - 1) {
          pages.push(
            <span key="end-ellipsis" className="w-8 h-8 flex items-center justify-center">...</span>
          );
        }
        
        pages.push(
          <button 
            key={totalPages} 
            onClick={() => changePage(totalPages)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
          >
            {totalPages}
          </button>
        );
      }
      
      return pages;
    };
    
    return (
      <div className="flex items-center justify-center mt-8 space-x-1">
        {/* Previous button */}
        <button 
          onClick={() => changePage(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded-md ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Page numbers */}
        {renderPageNumbers()}
        
        {/* Next button */}
        <button 
          onClick={() => changePage(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded-md ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return [...Array(PRODUCTS_PER_PAGE)].map((_, idx) => (
      <div key={idx} className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-48 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    ));
  };

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
                  {CATEGORIES.map((cat) => (
                    <div key={cat} className="flex items-center">
                      <input
                        id={`category-${cat}`}
                        type="checkbox"
                        value={cat}
                        checked={category.includes(cat)}
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
                  {BRANDS.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        id={`brand-${brand}`}
                        type="checkbox"
                        value={brand}
                        checked={subCategory.includes(brand)}
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
                Showing <span className="font-medium">
                  {Math.min(
                    (currentPage - 1) * PRODUCTS_PER_PAGE + 1,
                    filteredProducts.length
                  )} - {Math.min(
                    currentPage * PRODUCTS_PER_PAGE,
                    filteredProducts.length
                  )}
                </span> of <span className="font-medium">{filteredProducts.length}</span> products
              </p>
              
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-2 bg-white focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
              >
                {Object.entries(SORT_OPTIONS).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {renderSkeletons()}
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
                {paginatedProducts.map((item, index) => (
                  <ProductItem 
                    key={item._id || index} 
                    id={item._id} 
                    name={item.name} 
                    image={item.image} 
                    price={item.price} 
                    discount={item.discount || ''} 
                  />
                ))}
              </div>
              
              {/* Pagination controls */}
              <PaginationControls />
            </>
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