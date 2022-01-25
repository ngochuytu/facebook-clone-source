import React from 'react';
import styled from "styled-components";
import { colorGreyMain } from "../../Constants/Colors";
import { headerSpacing } from "../../Constants/Spacing/Header";
import Header from "../Header/Header";
import Feed from "../Index/Main/NewsFeed/Feed/Feed";
import { indexMainSpacing } from "../../Constants/Spacing/Index";
import { useParams } from 'react-router-dom';
import { breakPointLarge, breakPointSmall, breakPointVerySmall } from "../../Constants/BreakPoints";

const Container = styled.div`
    background: ${colorGreyMain};
    min-height: calc(100vh - ${headerSpacing.height});
    padding: ${indexMainSpacing.paddingTop} 0;

    & > *{
        width: 40%;
        min-width: 600px;
        margin: 0 auto;
    }
    
    @media screen and (max-width: ${breakPointLarge}){
        & > *{
            width: 75%;
            min-width: 450px;
        }
    }

    @media screen and (max-width: ${breakPointSmall}){
        & > *{
            min-width: 325px;
            padding: 0 10px;
        }
    }

    @media screen and (max-width: ${breakPointVerySmall}){
        & > *{
            min-width: 275px;
        }
    }
`;

function Posts() {
    const { postId } = useParams();

    return (
        <div>
            <Header />
            <Container>
                <Feed postsPage={true} postId={postId} />
            </Container>
        </div>
    );
}

export default Posts;
