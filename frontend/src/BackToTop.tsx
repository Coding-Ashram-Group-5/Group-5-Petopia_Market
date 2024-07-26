import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { FaArrowUp } from "react-icons/fa6";
import { motion } from 'framer-motion';

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = debounce(() => {
            setIsVisible(window.scrollY > 300);
        }, 50);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.button
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-yellow-300/90 dark:bg-red-500/90 rounded-full shadow-lg z-20"
            aria-label="Scroll back to top"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 24 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <span className='text-black/80 dark:text-white'>
            <FaArrowUp
            size={32}
            />
            </span>
        </motion.button>
    );
};

export default BackToTopButton;
