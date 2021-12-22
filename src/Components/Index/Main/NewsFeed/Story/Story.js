import React from 'react'
import styled from 'styled-components'
import StoryItem from './StoryItem'


const Container = styled.div`
    display: flex;
    overflow-x: hidden;
    margin-bottom: 20px;
`

export default function Story() {
    let test = 'https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697'
    return (
        <Container>
            <StoryItem avatar={test} storyImage={test} username="Hello" />
            <StoryItem avatar={test} storyImage={test} username="Hello" />
            <StoryItem avatar={test} storyImage={test} username="Hello" />
            <StoryItem avatar={test} storyImage={test} username="Hello" />
            <StoryItem avatar={test} storyImage={test} username="Hello" />
            <StoryItem avatar={test} storyImage={test} username="Hello" />
            <StoryItem avatar={test} storyImage={test} username="Hello" />
        </Container>
    )
}
