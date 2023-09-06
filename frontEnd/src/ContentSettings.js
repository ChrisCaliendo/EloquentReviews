import { useState } from "react";


const ContentSettings = ({ contentConfig, updateCC}) => {
    const [gameType, setGameType] = useState("topSelling")
    const [reviewLength, setCharLimit] = useState(50) //from 30 to 250

    const applyContentSettings = () => {
        updateCC(
        )
    };
    const handleSliderChange = (event) => {
        setCharLimit(event.target.value);
    };
    return (  
        <div className="border border-none shadow rounded-md p-5 max-w-3xl w-full mx-auto px-3 py-2 text-white bg-zinc-900 font-semibold">
            
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Select Which Games Do You Want Reviews From</h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="horizontal-list-radio-license" type="radio" value="topSelling" name="list-radio" classNameName="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="horizontal-list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Top Selling</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="horizontal-list-radio-id" type="radio" value="mostPlayed" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="horizontal-list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Most Played</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="horizontal-list-radio-millitary" type="radio" value="random" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="horizontal-list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Random</label>
                    </div>
                </li>
                <li className="w-full dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="horizontal-list-radio-passport" type="radio" value="selectSet" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="horizontal-list-radio-passport" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">From Select Set</label>
                    </div>
                </li>
            </ul>
            <br />

            <label for="disabled-range" className="block mb-2 text-sm font-bold  text-white">Review Length</label>
            <label for="disabled-range" className="block mb-2 text-sm font-medium  text-white">{reviewLength}</label>
            <input id="minmax-range" type="range" min="0" max="100" value={reviewLength} onChange={handleSliderChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

            <br />
            <br />
            
            <form  onSubmit={applyContentSettings}>
                <button type="submit" className="px-2 py-1 font-bold text-gray-700  bg-white rounded hover:bg-gray-300"> Apply Setting </button>
            </form>
        </div>
    );
}
export default ContentSettings;