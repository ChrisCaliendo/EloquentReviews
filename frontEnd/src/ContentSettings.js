import { useState, useContext, useEffect } from "react";
import SteamTag from "./SteamTag";
import { useSettingsContext } from "./Hooks/UseSettingsContext";
//import {useSettingsContext} from '../.'

const ContentSettings = () => {

    const {settings, dispatch} = useSettingsContext();

    const [useConfig, setUseConfig] = useState(settings.useConfig)
    const [gameTags, setGameTags] = useState(settings.gameTags)
    const [reviewRating, setRating] = useState(settings.reviewRating)
    const [reviewLength, setReviewLimit] = useState(settings.reviewLength) //from 30 to 250

    const [isNewSetting, setIsNewSetting] = useState(false)

    const applyContentSettings = () => {

        const newSettings = {
            useConfig: useConfig,
            gameTags: gameTags,
            reviewRating: reviewRating,
            reviewLength: reviewLength,
        }
        
        dispatch({type:'SET_SETTINGS', payload:newSettings})
        localStorage.setItem('settings', JSON.stringify(newSettings))
        setIsNewSetting(false);
    };

    const handleSliderChange = (event) => {
        setReviewLimit(event.target.value);
        setIsNewSetting(true);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
        setIsNewSetting(true);
    };

    const handleToggle = (event) => {
        if(useConfig === false) setUseConfig(true);
        else setUseConfig(false);
        setIsNewSetting(true);
    };


    const handleCheckboxChange = (value, isChecked) => {
        if (isChecked) {
            setGameTags([...gameTags, value]);
        } 
        else {
            setGameTags(gameTags.filter(item => item !== value));
        }
        
        setIsNewSetting(true);
    };

    const resetSettings = () => {
        dispatch({type:'RESET_SETTINGS'})
        localStorage.removeItem('settings')
        setIsNewSetting(true);
    }

    return (  
        
        <div className="border border-none shadow rounded-md p-5 max-w-3xl w-full mx-auto px-3 py-2 text-white bg-zinc-900 font-semibold">
            <h1 className="mb-1 font-bold text-2xl text-gray-200">Random Search Tags</h1>
            <h3 className="mb-8 font-semibold dark:text-white">What Kind of Games Do You Want To Find?</h3>
            <div  className="grid grid-cols-4 gap-4">
                
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Indie" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Adventure" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Singleplayer" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Multiplayer" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Action" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Strategy" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Casual" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Rougelike" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Simulation" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="FPS" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Puzzle" />
                <SteamTag onChange={handleCheckboxChange} checkCondition={ gameTags } tagName="Metroidvania" />
                
            </div>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <div onChange={handleRatingChange}>
                <h1 className="mb-1 font-bold text-2xl text-gray-200">General Search Ratings</h1>
                <h3 className="mb-8 font-semibold">What Ratings Are You Interested In?</h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 accent-gray-900">
                        <div className="flex items-center pl-3">
                            <input id="horizontal-list-radio-license" type="radio" value="Any" name="rating-input" defaultChecked={ reviewRating === "Any" } className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label className="w-full py-3 ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Any</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 bg-blue-300 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input id="horizontal-list-radio-id" type="radio" value="Positive" name="rating-input" defaultChecked={ reviewRating === "Positive" } className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 accent-gray-900 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label className="w-full py-3 ml-2 text-sm font-bold text-gray-900  ">Postive</label>
                        </div>
                    </li>
                    <li className="w-full rounded-r-xl border-b  border-gray-200 bg-red-300 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3 ">
                            <input id="horizontal-list-radio-millitary" type="radio" value="Negative" name="rating-input" defaultChecked={ reviewRating === "Negative" } className="w-4 h-4 text-gray-600 bg-gray-100  border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 accent-gray-900 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label className="w-full py-3 ml-2 text-sm font-bold text-gray-900 accent-gray-800 ">Negative</label>
                        </div>
                    </li>
                </ul>
            </div>
            <br />
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            
            <h1 className="mb-1 font-bold text-2xl text-gray-200">Review Content Parameters</h1>
            <h3 className="mb-8 font-semibold">How Short Do You Want Your Reviews?</h3>

            <label className="block mb-2 text-sm font-bold  text-white">Review Length:</label>
            <label className="block mb-2 text-sm font-medium  text-white"> {useConfig ? <div>{reviewLength} Words Long</div> : <div>Unlimited Word Length</div>} </label>
            <input id="minmax-range" type="range" min="0" max="100" value={reviewLength} disabled={!useConfig} onChange={handleSliderChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

            <br />
            <br />

            <div className="flex 2xl:flex justify-evenly">
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={handleToggle} defaultChecked={useConfig}  className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-black rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                <span className="ml-3 text-sm font-medium dark:text-gray-300">{useConfig ? "Disable" : "Enable"} Review Content Parameters</span>
            </label>

            
                <button onClick={applyContentSettings} disabled={isNewSetting === false} type="submit" className="px-2 py-1 font-bold text-gray-700  bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-500"> Apply Setting </button>
            </div>

        </div>
    );
}
export default ContentSettings;