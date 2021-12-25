import React, { createContext, useContext, useState, useEffect } from 'react';

const BreakPointContext = createContext();

export const useBreakPointContext = () => useContext(BreakPointContext);

export default function BreakPointContextProvider({ children }) {
    const [breakPoint, setBreakPoint] = useState({
        large: true,
        medium: false,
        small: false,
        verySmall: false
    });

    useEffect(() => {
        const detectScreenSize = windowWidth => {
            if (windowWidth > 1000)
                return setBreakPoint({ large: true, medium: false, small: false, verySmall: false });
            else if (windowWidth > 700)
                return setBreakPoint({ large: false, medium: true, small: false, verySmall: false });
            else if (windowWidth > 350)
                return setBreakPoint({ large: false, medium: false, small: true, verySmall: false });
            else
                return setBreakPoint({ large: false, medium: false, small: false, verySmall: true });
        };

        detectScreenSize(window.innerWidth);

        window.addEventListener("resize", () => {
            detectScreenSize(window.innerWidth);
        });
    }, []);

    return (
        <BreakPointContext.Provider value={{ breakPoint }}>
            {children}
        </BreakPointContext.Provider>
    );
}
