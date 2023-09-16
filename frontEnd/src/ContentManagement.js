import React, { useState, useContext, createContext } from 'react';

const ConfigContext = createContext();

export const ContentManager = ({ children }) => {
    const [contentConfig, updateContentConfig] = useState({
        useConfig: true,
        gameTags: ["none"],
        gameRating: 'Any',
        reviewLength: 50,
        lengthType: ''
    });

    const getGlobalData = () => {
        console.log(contentConfig);
    }

    return( 
        <ConfigContext.Provider value ={{ contentConfig, updateContentConfig, getGlobalData }}>
            {children} 
        </ConfigContext.Provider>         
    );
}
export const useContentManager = () => {
    return useContext(ConfigContext);
};