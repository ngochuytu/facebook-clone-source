import React from "react";
import { RefetchPostsContextProvider } from "../../Contexts/RefetchPostsContext";
import Header from "../Header/Header";
import Main from "./Main/Main";

function Index() {
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
