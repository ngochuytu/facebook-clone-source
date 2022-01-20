import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { colorGreyHeader, colorGreyIconHeaderRight, colorGreyInput } from "../../Constants/Colors";
import { firebaseCollections } from "../../Constants/FireStoreNaming";
import { headerSpacing } from "../../Constants/Spacing/Header";
import { notificationSpacing } from "../../Constants/Spacing/Notifications";
import { useFireBaseAuthContext } from "../../Contexts/FireBaseAuthContext";
import { database } from "../../firebase";
import NotificationItem from "./NotificationItem/NotificationItem";
import NotificationsIconFilled from '@material-ui/icons/Notifications';
import NotificationSkeleton from "../Skeleton/NotificationSkeleton";
import { breakPointMedium, breakPointSmall, breakPointVerySmall } from "../../Constants/BreakPoints";


const Container = styled.div`
    width: ${notificationSpacing.width.large};
    max-height: calc(100vh - ${headerSpacing.height});
    overflow-x: hidden;
    position: fixed;
    top: ${headerSpacing.height};
    right: 15px;
    background: ${colorGreyHeader};
    border-radius: 5px;
    margin: 0 !important;
    box-shadow: 0 0 3px -1px #000000;

    & > *{
        margin: 0;
    }

    &::-webkit-scrollbar {
        width: 0px;
    }

    &:hover{
        ::-webkit-scrollbar{
            width: 10px;
        }
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${colorGreyInput};
        border-radius: 10px;
    }

    
    @media screen and (max-width: ${breakPointSmall}){
        width: ${notificationSpacing.width.small};
    }

    @media screen and (max-width: ${breakPointVerySmall}){
        width: ${notificationSpacing.width.verySmall};
    }

`;

const Title = styled.h2`
    color: ${colorGreyIconHeaderRight};
    padding: 10px 15px;
`;

const NotificationItems = styled.div`
    & > *{
        width: ${notificationSpacing.width.large};
        margin-bottom: 0;
    }

    @media screen and (max-width: ${breakPointSmall}){
        & > *{
            width: ${notificationSpacing.width.small};
        }
    }
    
    @media screen and (max-width: ${breakPointVerySmall}){
        & > *{
            width: ${notificationSpacing.width.verySmall};
        }
    }
`;

const NoNotifications = styled.div`
    color: ${colorGreyIconHeaderRight};
    font-size: 1.5rem;
    text-align: center;
    padding: 20px;
    & > :first-child{
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
    }
`;

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [fetchingNotifications, setFetchingNotifications] = useState(true);
    const { currentUser } = useFireBaseAuthContext();

    const notificationsRef = useRef();

    useEffect(() => {
        const getNotifications = async () => {
            const notificationsListCollectionSnapshot = await getDocs(collection(database, firebaseCollections.users.collectionName, currentUser.uid, firebaseCollections.users.subCollections.notifications.collectionName, firebaseCollections.users.subCollections.notifications.documents.notificationsDetails.documentName, firebaseCollections.users.subCollections.notifications.subCollections.notificationsList.collectionName));
            const notifications = [];

            notificationsListCollectionSnapshot.forEach(notificationDoc => notifications.push(notificationDoc.data()));

            //Get user information of each notification based on interactionUid
            for (let i = 0; i < notifications.length; i++) {
                const interactedUserSnapshot = await getDoc(doc(database, firebaseCollections.users.collectionName, notifications[i].interactedUid));
                const interactedUser = interactedUserSnapshot.data();
                notifications[i] = {
                    ...notifications[i],
                    displayName: interactedUser.displayName,
                    photoURL: interactedUser.photoURL
                };
            }

            //Sort by timeStamp (asc)
            notifications.sort((notificationA, notificationB) => notificationB.timeStamp.seconds - notificationA.timeStamp.seconds);

            setNotifications(notifications);
            setFetchingNotifications(false);
        };

        getNotifications();
    }, [currentUser.uid]);

    return (
        <Container ref={notificationsRef}>
            <Title>Notifications</Title>
            <NotificationItems>
                {!fetchingNotifications ?
                    notifications.length ?
                        notifications.map(
                            ({ commentContent, id, postId, displayName, photoURL, interactionType, timeStamp, read }) =>
                                <NotificationItem
                                    key={id}
                                    id={id}
                                    postId={postId}
                                    commentContent={commentContent}
                                    interactionType={interactionType}
                                    displayName={displayName}
                                    photoURL={photoURL}
                                    timeStamp={timeStamp}
                                    read={read}
                                />
                        )
                        :
                        <NoNotifications>
                            <NotificationsIconFilled />
                            <p>You have no notifications</p>
                        </NoNotifications>

                    :
                    new Array(3).fill(<NotificationSkeleton />)
                }
            </NotificationItems>
        </Container>
    );
}
export default Notifications;
