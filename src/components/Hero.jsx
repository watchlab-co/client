import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 sm:p-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Main Feature Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 bg-white rounded-3xl overflow-hidden shadow-md relative p-6 sm:p-10"
          >
            <div className="absolute top-6 left-6 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-medium border border-amber-200">
              FEATURED
            </div>
            
            <div className="h-full flex flex-col justify-between">
              <div className="mt-10">
                <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-800 leading-tight">
                  Latest <span className="text-amber-600">Arrivals</span>
                </h1>
                <p className="text-zinc-600 mt-4 max-w-md">
                  Discover our new collection featuring premium products designed for the modern lifestyle.
                </p>
              </div>
              
              <div className="flex items-start gap-4 mt-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/collection")}
                  className="group flex items-center gap-2 bg-zinc-900 text-white py-3 px-6 rounded-xl shadow-sm hover:bg-amber-600 transition-all duration-300"
                >
                  <span className="font-medium">SHOP NOW</span>
                  <svg 
                    className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.button>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/new-arrivals")}
                  className="flex items-center gap-2 py-3 px-6 rounded-xl border border-zinc-200 cursor-pointer hover:border-amber-300 transition-all duration-300"
                >
                  <span className="font-medium text-zinc-700">View All</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Feature Image Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="aspect-square sm:col-span-1 bg-amber-100 rounded-3xl overflow-hidden shadow-md"
          >
            <img 
              onClick={() => navigate("/collection")} 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 cursor-pointer" 
              src={assets.hero_3} 
              alt="Featured collection" 
            />
          </motion.div>
          
          {/* Three Small Feature Boxes - Hidden on Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => navigate("/new")}
            className="hidden sm:flex bg-zinc-800 text-white rounded-3xl p-6 items-center justify-between cursor-pointer hover:bg-zinc-700 transition-all duration-300"
          >
            <span className="font-medium">New Releases</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => navigate("/trending")}
            className="hidden sm:flex bg-amber-600 text-white rounded-3xl p-6 items-center justify-between cursor-pointer hover:bg-amber-500 transition-all duration-300"
          >
            <span className="font-medium">Trending Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => navigate("/sale")}
            className="hidden sm:flex bg-white border border-zinc-200 rounded-3xl p-6 items-center justify-between cursor-pointer hover:border-amber-300 transition-all duration-300"
          >
            <span className="font-medium text-zinc-800">Sale Items</span>
            <div className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-bold">
              -30%
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;