const SteamTag = ({ tagName }) => {
    return (  
        <div>
            <input id="checkbox" type="checkbox" value={tagName} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="checkbox" className="ml-2 text-md font-bold text-gray-400 dark:text-gray-500">{ tagName }</label>
        </div>
                
    );
}
 export default SteamTag;