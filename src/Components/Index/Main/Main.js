import React from "react";
import styled from "styled-components";
import Contact from "./Contacts/Contact";
import NewsFeed from "./NewsFeed/NewsFeed";
import { colorGreyInput, colorGreyMain } from "../../../Constants/Colors";
import { indexMainSpacing } from "../../../Constants/Spacing/Index";
import { headerLeftSpacing, headerSpacing } from "../../../Constants/Spacing/Header";
import { breakPointLarge, breakPointMedium } from "../../../Constants/BreakPoints";
import Bookmarks from "../../Bookmarks/Bookmarks";

const Container = styled.div`
    display: flex;
    background: ${colorGreyMain};
    min-height: 100vh;
    
    & > *{
        padding-top: ${indexMainSpacing.paddingTop};
    }
`;

export const SideScrollContainer = styled.div`
    max-width: ${headerLeftSpacing.maxWidth};
    flex: 1;
    height: calc(100vh - ${headerSpacing.height});
    overflow-y: scroll;
    position: sticky;
    top: ${headerSpacing.height};

    &::-webkit-scrollbar {
        width: 0px;
    }

    &:hover{
        ::-webkit-scrollbar{
            width: 10px;
        }
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${colorGreyInput};
        border-radius: 10px;
    }
`;

export const BookmarksContainer = styled(SideScrollContainer)`
    @media screen and (max-width: ${breakPointLarge}){
        display: none;
    }
`;

export const ContactContainer = styled(SideScrollContainer)`
    @media screen and (max-width: ${breakPointLarge}){
        flex-grow: 0;
        flex-basis: 30%;
    }

    @media screen and (max-width: ${breakPointMedium}){
        display: none;
    }
`;


function Main() {
    return (
        <Container>
            <BookmarksContainer>
                <Bookmarks />
            </BookmarksContainer>
            <NewsFeed />
            <ContactContainer>
                <Contact />
            </ContactContainer>
        </Container>
    );
}

export default Main;
