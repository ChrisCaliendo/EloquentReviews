const SteamTag = ({ tagName }) => {
    return (  
        <div>
            <input id="checkbox" type="checkbox" value={tagName} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-black-500  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-green-800"/>
            <label for="checkbox" className="ml-2 text-md font-bold text-gray-400 ">{ tagName }</label>
        </div>
                
    );
}
 export default SteamTag;