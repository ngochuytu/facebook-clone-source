import React from 'react';
import styled from "styled-components";
import { animationSkeletonBrightness, skeletonBackgroundColor, skeletonContainerBackgroundColor, skeletonLinesBorderRadiusAndBackground } from "./Skeleton.style";


const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100px; //NotificationItemContainerMaxHeight
    padding: 15px; //NotificationItemContainerPadding
    background: ${skeletonContainerBackgroundColor};
`;

const Avatar = styled.div`
    flex-shrink: 0;
    width: 40px; 
    height: 40px; 
    margin-right: 12.5px; //NotificationItemAvatarMarginRight
    border-radius: 50%;
    background: ${skeletonBackgroundColor};
    ${animationSkeletonBrightness};
`;

const Content = styled.p`
    width: 100%;
    ${skeletonLinesBorderRadiusAndBackground};
    ${animationSkeletonBrightness};
`;

function NotificationSkeleton() {
    return (
        <Container>
            <Avatar />
            <Content />
        </Container>
    );
}

export default NotificationSkeleton;
