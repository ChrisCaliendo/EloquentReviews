import React, { useState, useContext, createContext } from 'react';

const ConfigContext = createContext();

export const ContentManager = ({ children }) => {
    const [contentConfig, setContentConfig] = useState({

        useConfig: false,
        gameTags: [],
        gameRating: 'Any',
        reviewLength: 50,
        lengthType: ''


    })

    return( 
        <ConfigContext.Provider value ={{ contentConfig, setContentConfig }}>
            {children} 
        </ConfigContext.Provider>         
    );
}

export const useContentConfig = () => {
    return useContext(ConfigContext);
}