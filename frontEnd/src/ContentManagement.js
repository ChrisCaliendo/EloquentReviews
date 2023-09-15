import React, { useState, createContext } from 'react';

const ConfigContext = createContext();

export const ContentManager = ({ children }) => {
    const [contentConfig, updateContentConfig] = useState({
        useConfig: true,
        gameTags: ["none"],
        gameRating: 'Any',
        reviewLength: 50,
        lengthType: ''
    });

    return( 
        <ConfigContext.Provider value ={{ contentConfig, updateContentConfig }}>
            {children} 
        </ConfigContext.Provider>         
    );
}
export default ContentManager