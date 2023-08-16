import { useState } from 'react';
import { useEffect } from 'react';
import logo from './resources/EloquentReviews.png';
const Home = () => {

    const [message, setMessage] = useState('');
    const getMessage = async() => {
        const response = await fetch(`http://localhost:5000/scrape`)
        const json = await response.json()
            console.log(json);
            if (response.ok){
                console.log(json);
                setMessage(json.message)
            }
    }


    useEffect(() => {
        getMessage();
    }, [])

    return (  
        <div className="home">
            <nav className="container flex items-center justify-between mx-auto">
            <img src={logo} alt="Logo" width="400" />
            <div className="hidden lg:block">
                <ul className="flex space-x-4">
                <li><a href="#" className="px-3 py-2 font-bold text-white hover:text-gray-500">Home</a></li>
                <li><a href="#" className="px-3 py-2 font-bold text-white hover:text-gray-500">About</a></li>
                <li><a href="#" className="px-3 py-2 font-bold text-white hover:text-gray-500">Content Settings</a></li>
                <li><a href="#" className="px-3 py-2 font-bold text-white hover:text-gray-500">Specifics</a></li>
                </ul>
            </div>
            <div className="flex space-x-4">
                <button href="#" className="px-4 py-2 font-bold text-gray-700 bg-white rounded hover:bg-gray-300">Generate Quote</button>
                <button href="#" className="px-4 py-2 font-bold text-gray-700 bg-white rounded hover:bg-gray-300">Download Quote</button>
            </div>
            </nav>
            <br />
            <br />
            <div className="container flex items-center justify-between mx-auto flex-col md:flex-row">
                <div className="px-3 py-2 text-white ">
                    { message !== '' && message}
                </div>
            </div>
        </div>
    );
}
export default Home;