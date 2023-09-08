import React, { useState, useContext, createContext } from 'react';

const ConfigContext = createContext();

export const ContentManager = ({ children }) => {
    const [contentConfig, setContentConfig] = useState({

        useConfig: false,
        gameType: '',
        reviewLength: 50,
        lengthType: '',
        gameSearchTag: ''

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