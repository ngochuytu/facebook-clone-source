import React, { createContext, useContext, useState } from 'react';

const RefetchPostsContext = createContext();

export const useRefetchPostsContext = () => useContext(RefetchPostsContext);

export function RefetchPostsContextProvider({ children }) {
    const [refetchPosts, setRefetchPosts] = useState(false);

    const refetchPostsHandler = location => {
        if (location.pathname === '/') { //index
            window.scrollTo(0, 0);
            setRefetchPosts(!refetchPosts);
        }
    };

    const contextValues = { refetchPosts, setRefetchPosts, refetchPostsHandler };
    return (
        <RefetchPostsContext.Provider value={contextValues}>
            {children}
        </RefetchPostsContext.Provider>
    );
}



export default RefetchPostsContext;
