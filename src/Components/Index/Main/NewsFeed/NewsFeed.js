import React from "react";
import styled from "styled-components";
import Feed from "./Feed/Feed";
import Story from "./Story/Story";
import { headerCenterSpacing } from "../../../../Constants/Spacing/Header";

const Container = styled.div`
    flex: 1;
    padding: 0 ${headerCenterSpacing.paddingHorizontal};
    padding-bottom: 40px;
    overflow: hidden;

    & > :last-child{
        width: 85%;
        margin: 0 auto;
    }
`;


function NewsFeed() {
    return (
        <Container>
            <Story />
            <Feed indexPage={true} />
        </Container>
    );
}


export default NewsFeed;
