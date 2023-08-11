import logo from './resources/EloquentReviews.png';
const Home = () => {
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
                <a href="#" className="px-4 py-2 font-bold text-gray-700 bg-white rounded hover:bg-gray-300">Generate Quote</a>
                <a href="#" className="px-4 py-2 font-bold text-gray-700 bg-white rounded hover:bg-gray-300">Download Quote</a>
            </div>
            </nav>
            <br />
            <br />
            <div className="container flex items-center justify-between mx-auto flex-col md:flex-row">
                <dir className="px-3 py-2 text-white ">
                    Find funny quotes for games on steam
                </dir>
            </div>
        </div>
    );
}
export default Home;