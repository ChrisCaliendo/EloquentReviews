import { useState } from 'react';
import { useEffect } from 'react';
import logo from './resources/EloquentReviews.png';
const Home = () => {

    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');
    const [game, setGame] = useState('');

    const getBackendData = async() => {
        const response = await fetch(`http://localhost:5000/scrape`)
        const json = await response.json()
            console.log(json);
            if (response.ok){
                console.log(json);
                
                setDate(json.reviewDate)
                setAuthor(json.author)
                setGame(json.title)
                setMessage(json.review)
            }
    }

    const genQuote = () => {
        setMessage(null);
        getBackendData();
    }


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
                <button onClick={genQuote} className="px-4 py-2 font-bold text-gray-700  bg-white rounded hover:bg-gray-300">Generate Quote</button>
                <button href="#" className="px-4 py-2 font-bold text-gray-700 bg-white rounded hover:bg-gray-300">Download Quote</button>
            </div>
            </nav>
            <br />
            <br />
            <div className="container flex items-center justify-between mx-auto flex-col lg:flex-row ">
                <div className="border border-white-300 shadow rounded-md p-5 max-w-xl w-full mx-auto px-3 py-2 text-white bg-zinc-900">
                {!message !== '' && <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">Processing...</svg>} 
                <p>
                    { message !== '' && 
                        <div className="whitespace-pre-wrap">
                            <p>{message}</p>
                            <br />
                            <p>A review of {game}</p>
                            <p>Written by {author}{date}</p>
                            <br />
                        </div>
                    }
                </p>
                </div>
            </div>
        </div>
    );
}
export default Home;

