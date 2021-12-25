import React from 'react';
import styled from 'styled-components';

const storyImageHover = `filter: brightness(.8);
                        transform: scale(1.02);`;

const Avatar = styled.img`
    position: absolute;
    width: 40px;
    height: 40px;
    border: 3px solid #2e89ff;
    border-radius: 50%;
    top: 10px;
    left: 10px;
    object-fit: cover;
    z-index: 1;
`;

const StoryImage = styled.img`
    object-fit: cover;
    width: 95%;
    height: 95%;
    filter: brightness(.9);
    border-radius: 10px;

    &:hover{
        ${storyImageHover}
    }
`;

const Username = styled.p`
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-weight: 500;
    font-size: 1.05rem;
    color: #fff;
    z-index: 1;
`;

const Container = styled.div`
    flex-shrink: 0;
    position: relative;
    width: 120px;
    height: 200px;
    margin-right: 2.5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover ${StoryImage}{
        ${storyImageHover}
    }
`;

export default function StoryItem({ avatar, storyImage, username }) {
    return (
        <Container>
            <Avatar src={avatar} />
            <StoryImage src={storyImage} />
            <Username>{username}</Username>
        </Container>
    );
}
