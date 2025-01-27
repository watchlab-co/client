import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <p className="text-3xl font-bold mb-5 text-gray-800">WatchLab</p>
                    <p className="w-full md:w-2/3 text-gray-600">
                    At WatchLab, we are passionate about curating the finest timepieces that blend craftsmanship, innovation, and style. With a rich history of designing watches that stand the test of time, we aim to offer our customers precision, luxury, and a unique expression of personality through every wristwatch. Whether you're a seasoned collector or a first-time buyer, WatchLab brings you a collection that promises unmatched quality and timeless appeal.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-212-345-411</li>
                        <li>officialwatchlab@gmail.com</li>

                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025 @ forever.com - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer