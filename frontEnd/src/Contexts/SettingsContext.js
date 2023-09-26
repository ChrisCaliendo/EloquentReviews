import { createContext, useReducer, useState, useEffect } from "react";

export const SettingsContext = createContext();

export const settingsReducer = (state,action) => {
    switch(action.type){
        case 'SET_SETTINGS':
            return{
                settings:action.payload
            }
        case 'RESET_SETTINGS':
            return{
                settings:{
                    useConfig:false,
                    gameTags: [],
                    reviewRating: 'Any',
                    reviewLength: 50,
                }
            }
        default:
            return state
    }
}

export const SettingsContextProvider = ({children}) => {
    const[state,dispatch] = useReducer(settingsReducer, {
        settings:{
            useConfig:false,
            gameTags: [],
            reviewRating: 'Any',
            reviewLength: 50,
        }
    })

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const settings = JSON.parse(localStorage.getItem("settings"));

        if (settings) {
        dispatch({ type: "SET_SETTINGS", payload: settings });
        } else {
        dispatch({ type: "RESET_SETTINGS" });
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <SettingsContext.Provider value={{...state, dispatch}}>
            { children }
        </SettingsContext.Provider>
    )
}