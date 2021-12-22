import React from 'react';
import styled from "styled-components";
import { colorGreyMain } from "../../Constants/Colors";
import { headerSpacing } from "../../Constants/Spacing/Header";
import Header from "../Header/Header";
import Feed from "../Index/Main/NewsFeed/Feed/Feed";
import { indexMainSpacing } from "../../Constants/Spacing/Index";
import { useParams } from 'react-router-dom';
const Container = styled.div`
    background: ${colorGreyMain};
    min-height: calc(100vh - ${headerSpacing.height});
    padding-top: ${indexMainSpacing.paddingTop};

    & > *{
        width: 40%;
        margin: 0 auto;

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
