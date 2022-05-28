import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorGreyInput } from "../../../../../../../../Constants/Colors";
import { AvatarComment } from "./Comments";
import AvatarPic from '../../../../../../../../Images/Avatar.png';


const Container = styled.div`
    display: flex;
    margin-bottom: 15px;
    align-items: start;
    &:last-of-type{
        margin-bottom: 0;
    }

    &:first-of-type{
        margin-top: 15px;
    }
`;


const Comment = styled.div`
    width: fit-content;
    background: ${colorGreyInput};
    padding: 7px 10px;
    border-radius: 15px;
    color: white;
`;

const DisplayName = styled(Link)`
    display: block;
    font-size: 14px;
    margin-bottom: 2.5px;
    width: max-content;

    &:hover{
        text-decoration: underline;
    }
`;

const Content = styled.p`
    word-break: break-all;
`;

const TimeStamp = styled.small`
    padding-left: 10px;
`;

function CommentItem({ uid, displayName, photoURL, content, timeStamp }) {
    return (
        <Container>
            <Link to={`/${uid}`}>
                <AvatarComment src={photoURL || AvatarPic} />
            </Link>
            <div>
                <Comment>
                    <DisplayName to={`/${uid}`}>{displayName}</DisplayName>
                    <Content>{content}</Content>
                </Comment>
                <TimeStamp>{timeStamp}</TimeStamp>
            </div>
        </Container>
    );
}

export default CommentItem;
