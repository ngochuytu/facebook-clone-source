import React, { useEffect } from "react";
import { RefetchPostsContextProvider } from "../../Contexts/RefetchPostsContext";
import Header from "../Header/Header";
import Main from "./Main/Main";

function Index() {
    useEffect(() => {
        document.title = "Facebook";
    }, []);

    return (
        <div>
            <RefetchPostsContextProvider>
                <Header />
                <Main />
            </RefetchPostsContextProvider>
        </div>
    );
}

export default Index;
