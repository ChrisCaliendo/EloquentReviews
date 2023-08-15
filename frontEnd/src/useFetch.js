import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        setTimeout(() =>{
            fetch(url)
            .then(res => {
                //console.log(res);
                if(!res.ok){
                    throw Error('Data couldnt be fetched from resource')
                }
                return res.json();
            })
            .then(data => { 
                setData(data);
                setPending(false);
                setError(null);
            })
            .catch((err) => {
                setPending(false);
                setError(err.message);
            })
        }, 300);
    }, []);

    return {data, isPending, error}
}

export default useFetch;