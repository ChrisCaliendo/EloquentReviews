import logo from './resources/EloquentReviews.png';
import { BrowserRouter as Link} from 'react-router-dom';
const Header = () => {
    return (  
        <div className="header">
            <nav className="container flex items-center justify-between mx-auto">
            <img src={logo} alt="Logo" width="400" />
            <div className="hidden lg:block">
                <ul className="flex space-x-4">
                <li>
                    <a className="px-3 py-2 font-bold text-white hover:text-gray-500">Home</a>
                </li>
                <li>
                    <a href="#" className="px-3 py-2 font-bold text-white hover:text-gray-500">About</a>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold mr-2 px-2 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">WIP</span>
                </li>
                <li>
                    <a href="#" className="px-3 py-2 font-bold text-white hover:text-gray-500">Content Settings</a>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold  mr-2 px-2 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">WIP</span>
                </li>
                <li>
                    <a href="#" className="px-3 py-2 font-bold text-white hover:text-gray-500">Specifics</a>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold mr-2 px-2 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">WIP</span>
                </li>
                </ul>
                
            </div>
            </nav>
            
            <br />
            <br />
        </div>
    );
}
export default Header;