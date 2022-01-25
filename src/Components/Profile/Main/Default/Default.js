import React from 'react';
import styled from "styled-components";
import { breakPointMedium } from "../../../../Constants/BreakPoints";
import Feed from "../../../Index/Main/NewsFeed/Feed/Feed";
import SideBars from "./SideBars/SideBars";

const Container = styled.div`
    display: flex;

    & > :first-child{
        flex-basis: 35%;
    }

    & > :last-child{
        flex: 1;
    }

    @media screen and (max-width: ${breakPointMedium}){
        flex-direction: column;
    }
`;

function Default() {
    return (
        <Container>
            <SideBars imagesPerRow={3} />
            <Feed profilePage={true} />
        </Container>
    );
}

export default Default;
