import { useState, useContext } from "react";
import { useContentConfig } from "./ContentManagement";
import SteamTag from "./SteamTag";
//import {useSettingsContext} from '../.'

const ContentSettings = () => {

    const { contentConfig, setContextConfig } = useContentConfig()

    const [useConfig, setUseConfig] = useState(contentConfig.useConfig)
    const [gameType, setGameType] = useState(contentConfig.gameType)
    const [reviewRating, setRating] = useState(contentConfig.gameRating)
    const [reviewLength, setReviewLimit] = useState(contentConfig.reviewLength) //from 30 to 250
    const [lengthType, setLengthType] = useState(contentConfig.lengthType)

    const applyContentSettings = () => {
        setContextConfig({
            useConfig: useConfig,
            gameType: gameType,
            reviewLength: reviewLength,
            lengthType: lengthType,
            reviewRating: reviewRating
        })
    };

    const handleSliderChange = (event) => {
        setReviewLimit(event.target.value);
    };

    const handleTypeChange = (event) => {
        setGameType(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleToggle = (event) => {
        setUseConfig(!event.target.value);
        console.log(useConfig)
    };

    return (  
        
        <div className="border border-none shadow rounded-md p-5 max-w-3xl w-full mx-auto px-3 py-2 text-white bg-zinc-900 font-semibold">
            <h3 className="mb-4 font-semibold dark:text-white">What Kind of Games Do You Want To Find?</h3>
            <div onChange={handleTypeChange} className="grid grid-cols-4 gap-4">
                
                <SteamTag tagName="Indie" />
                <SteamTag tagName="Adventure" />
                <SteamTag tagName="Singleplayer" />
                <SteamTag tagName="Multiplayer" />
                <SteamTag tagName="Action" />
                <SteamTag tagName="Strategy" />
                <SteamTag tagName="Casual" />
                <SteamTag tagName="Rougelike" />
                <SteamTag tagName="Simulation" />
                <SteamTag tagName="FPS" />
                <SteamTag tagName="Puzzle" />
                <SteamTag tagName="Metroidvania" />
                
            </div>
            <br />

            <div onChange={handleRatingChange}>
                <h3 className="mb-4 font-semibold dark:text-white">What Ratings Are You Interested In?</h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 accent-gray-900">
                        <div className="flex items-center pl-3">
                            <input id="horizontal-list-radio-license" type="radio" value="Any" name="rating-input" checked={reviewRating === "Any"} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="horizontal-list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Any</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 bg-blue-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input id="horizontal-list-radio-id" type="radio" value="Positive" name="rating-input" checked={reviewRating === "Positive"} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 accent-gray-900 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="horizontal-list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-gray-900  dark:text-gray-300">Postive</label>
                        </div>
                    </li>
                    <li className="w-full rounded-r-xl border-b  border-gray-200 bg-red-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3 ">
                            <input id="horizontal-list-radio-millitary" type="radio" value="Negative" name="rating-input" checked={reviewRating === "Negative"} className="w-4 h-4 text-gray-600 bg-gray-100  border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 accent-gray-900 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="horizontal-list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 accent-gray-900 dark:text-gray-300">Negative</label>
                        </div>
                    </li>
                </ul>
            </div>

            <br />
            <br />

            <label for="disabled-range" className="block mb-2 text-sm font-bold  text-white">Review Length</label>
            <label for="disabled-range" className="block mb-2 text-sm font-medium  text-white">{reviewLength}</label>
            <input id="minmax-range" type="range" min="0" max="100" value={reviewLength} onChange={handleSliderChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

            <br />
            <br />

            <div className="flex 2xl:flex justify-evenly">
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"/>
                <div onChange={handleToggle} className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-black rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                <span className="ml-3 text-sm font-medium dark:text-gray-300">Enable Custom Settings</span>
            </label>

            <form  onSubmit={applyContentSettings}>
                <button type="submit" className="px-2 py-1 font-bold text-gray-700  bg-white rounded hover:bg-gray-300"> Apply Setting </button>
            </form>
            </div>

            
        </div>
    );
}
export default ContentSettings;