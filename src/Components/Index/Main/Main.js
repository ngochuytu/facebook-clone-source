import React from "react";
import styled from "styled-components";
import SideBar from "./SideBar/SideBar";
import Contact from "./Contacts/Contact";
import NewsFeed from "./NewsFeed/NewsFeed";
import { colorGreyMain } from "../../../Constants/Colors";
import { indexMainSpacing } from "../../../Constants/Spacing/Index";


const Container = styled.div`
    display: flex;
    background: ${colorGreyMain};
    min-height: 100vh;
    padding-top: ${indexMainSpacing.paddingTop};
`;

function Main() {
    return (
        <Container>
            <SideBar />
            <NewsFeed />
            <Contact />
        </Container>
    );
}

export default Main;
