import { Link } from "react-router-dom";
const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry</h2>
            <p>That page doesnt exist or cant be found</p>
            <Link to="/">Go Back to Homepage</Link>
        </div>
        
    );
}
 
export default NotFound;