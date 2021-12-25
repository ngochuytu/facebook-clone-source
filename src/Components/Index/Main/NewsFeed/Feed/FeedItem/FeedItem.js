import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFireBaseAuthContext } from '../../../../../../Contexts/FireBaseAuthContext';
import AvatarPic from '../../../../../../Images/Avatar.png';
import { backgroundColorGreyHeader, colorGreySearchIcon } from '../../../../../../Constants/Colors';
import Interaction from "./Interaction/Interaction";
import More from './More/More';
import { convertTimeStamp } from "../../../../../../Functions/ConvertTimeStamp";
import { breakPointVerySmall } from "../../../../../../Constants/BreakPoints";

const Content = styled.div``;

const Container = styled.div` 
    margin-bottom: 10px;
    border-radius: 10px;
    background: ${backgroundColorGreyHeader};

    & > *{
        padding: 10px 15px;
    }
    
    & > ${Content}{
        padding: 10px 0px;
    }
    
    @media screen and (max-width: ${breakPointVerySmall}){
        & > *{
            padding: 10px;
        }        
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const AvatarPost = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:hover{
        filter: brightness(1.2);
    }
`;

const PostInfo = styled.div`
    flex: 1;
    margin: 0 10px;
    overflow: hidden;
    white-space: nowrap;
`;

const Username = styled(Link)`
    display: block;
    color: #fff;
    font-weight: 700;
    width: max-content;
    
    &:hover{
        text-decoration: underline;
    }
`;

const TimeStamp = styled(Link)`
    font-size: .8rem;
    color: ${colorGreySearchIcon};
    width: max-content;
    &:hover{
        text-decoration: underline;
    }
`;

const TextContent = styled.p`
    word-break: break-all;
    color: #fff;
    white-space: pre-wrap;
    margin-bottom: 10px;
    padding: 0 15px;
`;

const AttachmentContent = styled.img`
    width: 100%;
`;

const InteractionContext = createContext();
export const useInteractionContext = () => useContext(InteractionContext);




//reloadProfile for after user edit their displayName, update post displayName
export default function FeedItem({ id, uid, photoURL, displayName, timeStamp, content, attachmentFullPath, attachmentPreviewURL, interactions, comments }) {
    const { currentUser } = useFireBaseAuthContext();

    return (
        <Container>
            <Header>
                <Link to={`/${uid}`}>
                    <AvatarPost src={photoURL || AvatarPic} />
                </Link>
                <PostInfo>
                    <Username to={`/${uid}`}>{displayName}</Username>
                    <TimeStamp to={`/posts/${id}`}>{convertTimeStamp(timeStamp)}</TimeStamp>
                </PostInfo>
                <More ownPost={uid === currentUser.uid ? true : false} postId={id} uid={uid} content={content} attachmentFullPath={attachmentFullPath} attachmentPreviewURL={attachmentPreviewURL} />
            </Header>
            <Content>
                <TextContent>{content}</TextContent>
                {attachmentPreviewURL && <AttachmentContent src={attachmentPreviewURL} />}
            </Content>
            <InteractionContext.Provider value={{ uid, id, interactions, comments }}>
                <Interaction />
            </InteractionContext.Provider>
        </Container>
    );
}

