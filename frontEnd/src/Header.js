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
            { !isMobile &&
                <img src={logo} alt="Logo" width="400"/>
            }
            
            {   isMobile ? 
                <div className="max-w-screen-xl flex flex-wrap items-center  p-4">
                    <div className='flex justify-stretch'>
                        <img src={logo} alt="Logo" width="200" className='rounded justify-start mr-20' />
                        <button onClick={(e) => setIsOpen(!isOpen)} type="button" className="justify-center align-end inline-flex items-center p-2 w-10 h-10 text-sm text-white rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    { isOpen &&
                        <div className="w-full" id="navbar-hamburger">
                        <ul className="grid grid-cols-1 gap-5 font-medium mt-4 rounded-lg ">
                         <li>
                            <a href="/" className="rounded-md  px-5 py-2 w-32 font-bold text-white hover:bg-white transition ease-in-out duration-150 hover:text-slate-700 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">Home</a>
                        </li>
                        <li>
                            <a href="/about" className=" rounded-md px-5 py-2  font-bold text-white hover:bg-white transition ease-in-out duration-150 hover:text-slate-700 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">About</a>
                        </li>
                        <li>
                            <a href="/content_settings" className="rounded-md px-5 py-2 font-bold text-white hover:bg-white transition ease-in-out duration-150 hover:text-slate-700 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">Content Settings</a>
                        </li>
                        </ul>
                        </div>

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