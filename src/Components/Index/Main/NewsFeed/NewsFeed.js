import React from "react";
import styled from "styled-components";
import Feed from "./Feed/Feed";
import Story from "./Story/Story";
import { headerCenterSpacing, headerSpacing } from "../../../../Constants/Spacing/Header";
import { breakPointSmall } from "../../../../Constants/BreakPoints";

const Container = styled.div`
    flex: 1;
    padding: 0 ${headerCenterSpacing.paddingHorizontal.default};
    padding-bottom: 40px;
    overflow: hidden;
    
    & > :last-child{
        width: 85%;
        margin: 0 auto;
    }
    
    @media screen and (max-width: ${breakPointSmall}){
        padding: 0 ${headerSpacing.paddingHorizontal};
        
        & > :last-child{
            width: 90%;
        }        
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
