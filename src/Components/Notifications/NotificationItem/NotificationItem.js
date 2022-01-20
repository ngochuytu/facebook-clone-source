import React from 'react';
import styled from "styled-components";
import AvatarPic from '../../../Images/Avatar.png';
import { colorGreyHeader, colorBlueHeaderCenter } from "../../../Constants/Colors";
import { doc, updateDoc } from "@firebase/firestore";
import { database } from "../../../firebase";
import { firebaseCollections } from "../../../Constants/FireStoreNaming";
import { useFireBaseAuthContext } from "../../../Contexts/FireBaseAuthContext";
import { convertTimeStamp } from "../../../Functions/ConvertTimeStamp";
import { Link } from "react-router-dom";
import { INTERACTION_EMOTES } from '../../../Constants/InteractionEmotes';

const Container = styled(Link)`
    background: ${colorGreyHeader};
    display: flex;
    align-items: flex-start;
    max-height: 100px;
    padding: 15px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:hover{
        filter: brightness(1.2);
    }
`;

const AvatarWrapper = styled.div`
    margin-right: 12.5px;
    position: relative;

    &::after{
        content: '';
        width: 22.5px;
        height: 22.5px;
        background-image: ${props => `url(${props.emoteSrc})`};
        background-size: cover;
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translate(25%, 25%);
    }
`;

const Avatar = styled.img`
    height: 35px;
    width: 35px;
    border-radius: 50%;
`;

const NotificationInfo = styled.div`
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Content = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
`;
const TimeStamp = styled.small`
    color: ${colorBlueHeaderCenter};
`;


const Unread = styled.div`
    width: 12.5px;
    height: 12.5px;
    border-radius: 50%;
    background: ${colorBlueHeaderCenter};
    align-self: center;
`;

function NotificationItem({ id, postId, interactionType, displayName, photoURL, commentContent, timeStamp, read }) {
    const { currentUser } = useFireBaseAuthContext();


    const notificationItemClickHandler = async () => {
        //Mark as read
        if (!read) {
            await updateDoc(doc(database, firebaseCollections.users.collectionName, currentUser.uid, firebaseCollections.users.subCollections.notifications.collectionName, firebaseCollections.users.subCollections.notifications.documents.notificationsDetails.documentName, firebaseCollections.users.subCollections.notifications.subCollections.notificationsList.collectionName, id), {
                read: true
            });
        }
    };

    return (
        <Container onClick={notificationItemClickHandler} to={`/posts/${postId}`}>
            <AvatarWrapper
                emoteSrc={INTERACTION_EMOTES
                    .filter(interactionIcon => interactionIcon.interactionType === interactionType)
                    .reduce((emoteSrc, interactionIcon) => emoteSrc += interactionIcon.emoteSrc, "")
                }>
                <Avatar src={photoURL || AvatarPic} />
            </AvatarWrapper>
            <NotificationInfo>
                {interactionType === "Comment" ?
                    <Content><strong>{displayName}</strong> commented on your post: "{commentContent}".</Content> :
                    interactionType === "Like" ?
                        <Content><strong>{displayName}</strong> liked your post.</Content> :
                        <Content><strong>{displayName}</strong> reacted your post.</Content>
                }
                <TimeStamp>{convertTimeStamp(timeStamp)}</TimeStamp>
            </NotificationInfo>
            {!read ? <Unread /> : null}
        </Container>
    );
}

export default NotificationItem;
