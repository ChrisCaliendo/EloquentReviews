import { useState } from 'react';
import { useEffect } from 'react';
import { useSettingsContext } from './Hooks/UseSettingsContext';

const Home = () => {

    const backendUrl = `https://eloquent-review-scraper.onrender.com/scrape`//`http://localhost:5000/scrape`//`https://eloquent-review-scraper.onrender.com/scrape`
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');
    const [game, setGame] = useState("");
    const [gameUrl, setGameUrl] = useState("");
    const [searchName, setSearchName] = useState("");


    const {settings} = useSettingsContext();


    const handleSearchInput = (event) => {
        setSearchName(event.target.value);
    };

    const sendInfo = async(reviewType) => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                'reviewType': reviewType,
                'gameUrl': gameUrl,
                'useConfig': settings.useConfig,
                'gameTags': settings.gameTags,
                'reviewLength': settings.reviewLength,
                'reviewRating': settings.reviewRating,
                'searchName': searchName
            })
        };
        console.log(requestOptions);
        const response = await fetch(backendUrl, requestOptions);
        const json = await response.json().catch(setError("Please Try Again"));
        if(response.ok){
            if(json.errorMessage != null)
            {
                setError(json.errorMessage);
            }
            else 
            {
                console.log(json);
            
                setError("");
                setDate(json.reviewDate)
                setAuthor(json.author)
                setGame(json.title)
                setMessage(json.review)
                setGameUrl(json.gameUrl)
            }
            setLoading(false)
        }
        }
        

    const findRandomReview = () => {
        setLoading(true);
        setError("");
        setMessage("");
        sendInfo("random");
    }

    const findSimilarReview = () => {
        setLoading(true)
        setError("");
        setMessage("");
        sendInfo("similar");
    }

    const findSearchReview = () => {
        setLoading(true)
        setError("");
        setMessage("");
        sendInfo("search");
    }

    return (  
        <div className="home">
            
            <div className="container flex items-center justify-between mx-auto flex-col 2xl:flex-row">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            
                <div className="p-5 max-w-2xl w-full mx-auto px-3 py-2 ">
                    <div className="relative max-w-xl justify-evenly mx-auto">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-10 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 10 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" onChange={handleSearchInput} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-600 focus:border-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 " placeholder="Enter Name of Game" required/>
                        <br />                
                    </div>
                    <div className="flex justify-evenly">
                        <button title="Finds Review of Random Game" data-te-placement="top" data-te-toggle="tooltip" onClick={findRandomReview} className="px-4 py-2 font-bold text-gray-700  bg-white rounded hover:bg-gray-300">Find Random Review</button>
                        <button title="Finds Review From The Same Game as Previous Review" data-te-placement="top" data-te-toggle="tooltip" onClick={findSimilarReview} disabled={!game} className="px-4 py-2 font-bold text-gray-700 bg-white rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">Find Similar Review</button>
                        <button title="Finds Review From Game Entered in Search" data-te-placement="top" data-te-toggle="tooltip" onClick={findSearchReview} disabled={!searchName} className="px-4 py-2 font-bold text-gray-700 bg-white rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">Find Search Review</button>
                    </div>
                <br />
                <div className="border border-none shadow rounded-md p-5 max-w-2xl w-full mx-auto px-3 py-2 text-white bg-zinc-900">
                {loading && gameUrl !== "" &&
                    <div role="status" className="text-center">
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                        <p>Loading...</p>
                    </div>
                } 
                {loading && gameUrl === "" &&
                    <div role="status" className="text-center">
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                        <p>The Server may take some time to start. Please be Patient. Thank You!</p>
                    </div>
                    
                }
                {error !== '' && error}
                
                { message !== '' && 
                    <div className="whitespace-pre-wrap font-eloquent">
                        <p>{message}</p>
                        <br />
                        <p>A review of {game}</p>
                        <p>Written by {author}    {date}</p>
                        <br />
                    </div>
                }
                </div>
                </div>
            </div>
        </div>
    );
}
export default Home;

