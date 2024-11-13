import React, { useState, useEffect } from 'react';
import { FaArrowUpLong } from "react-icons/fa6";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down 200px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll to top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button 
            onClick={scrollToTop} 
            className={`${isVisible ? 'opacity-100' : 'opacity-0'} fixed w-10 h-10 bottom-10 right-12 bg-gray-800 text-white rounded-full p-3 shadow-lg transition-opacity duration-300 hover:bg-gray-600`}
            aria-label="Scroll to top"
        >
            <FaArrowUpLong className='w-4 h-4'/>
        </button>
    );
};

export default BackToTopButton;