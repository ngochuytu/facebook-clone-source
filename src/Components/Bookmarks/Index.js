import React, { useEffect } from 'react';
import styled from "styled-components";
import { colorGreyMain } from "../../Constants/Colors";
import Header from "../Header/Header";
import Bookmarks from "./Bookmarks";

const Container = styled.div`
    & > :last-child{
        background: ${colorGreyMain};
        padding: 10px 0;
    }
`;


function Index() {
    useEffect(() => {
        document.title = "Bookmarks";
    }, []);

    return (
        <Container>
            <Header />
            <Bookmarks />
        </Container>
    );
}

export default Index;
