import React from 'react';
import styled from "styled-components";
import { skeletonBackgroundColor, animationSkeletonBrightness, skeletonLinesBorderRadiusAndBackground, skeletonContainerBackgroundColor } from "./Skeleton.style";

const Container = styled.div`
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: ${skeletonContainerBackgroundColor};
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const AvatarPost = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${skeletonBackgroundColor};
    ${animationSkeletonBrightness};
`;

const PostInfo = styled.div`
    flex: 1;
    margin: 0 10px;
    overflow: hidden;
`;

const Username = styled.div`
    width: clamp(70px, 20%, 20%);
    margin-bottom: 5px;
    ${skeletonLinesBorderRadiusAndBackground};
    ${animationSkeletonBrightness};
`;

const TimeStamp = styled.div`
    width: clamp(30px, 7.5%, 7.5%);
    ${skeletonLinesBorderRadiusAndBackground};
    ${animationSkeletonBrightness};

`;

const Content = styled.p`
    width: 100%;
    margin-bottom: 10px;
    ${skeletonLinesBorderRadiusAndBackground};
    ${animationSkeletonBrightness};
`;

const Buttons = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    & > *{
        flex-basis: 15%;
    }
`;

function PostSkeleton() {
    return (
        <Container>
            <Header>
                <AvatarPost />
                <PostInfo>
                    <Username />
                    <TimeStamp />
                </PostInfo>
            </Header>
            <Content />
            <Content />
            <Content />
            <Buttons>
                <Content />
                <Content />
            </Buttons>
        </Container>
    );
}

export default PostSkeleton;
