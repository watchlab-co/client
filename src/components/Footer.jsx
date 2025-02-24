import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* About Section */}
                <div>
                    <p className="text-3xl font-bold mb-5 text-gray-800">WatchLab</p>
                    <p className="w-full md:w-2/3 text-gray-600">
                        At WatchLab, we are passionate about curating the finest timepieces that blend craftsmanship, innovation, and style. 
                        Whether you're a seasoned collector or a first-time buyer, WatchLab brings you a collection that promises unmatched quality and timeless appeal.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Policies */}
                <div>
                    <p className='text-xl font-medium mb-5'>OUR POLICIES</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li><Link to="/payment-policy">Payment Policy</Link></li>
                        <li><Link to="/refund-policy">Refund Policy</Link></li>
                        <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                        <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>📍 Chemmankadavu, Malappuram, Kerala, India</li>
                        <li>📧 <a href="mailto:officialwatchlab@gmail.com">officialwatchlab@gmail.com</a></li>
                        <li>📞 <a href="tel:+919744676504">+91 9744676504</a></li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025 @ <a href="https://watchlab.in" className="font-medium text-gray-800">watchlab.in</a> - All Rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;
