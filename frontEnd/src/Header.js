import { useEffect, useState } from 'react';
import logo from './resources/EloquentReviews.png';
import {Link} from 'react-router-dom';
const Header = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 770); // Adjust the threshold as needed
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (  
        <div className="header">
            <nav className="container flex items-center justify-between mx-auto">
            <img src={logo} alt="Logo" width="400" />
            {   isMobile ? 
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    
                    <button onClick={(e) => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-white rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    {

                    }
                </div>
                :
                <div className="">
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="px-3 py-2 font-bold text-white hover:text-gray-500">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="px-3 py-2 font-bold text-white hover:text-gray-500">About</a>
                        </li>
                        <li>
                            <a href="/content_settings" className="px-3 py-2 font-bold text-white hover:text-gray-500">Content Settings</a>
                        </li>
                    </ul>
                </div>
            }
            
            </nav>
            
            <br />
            <br />
        </div>
    );
}
export default Header;