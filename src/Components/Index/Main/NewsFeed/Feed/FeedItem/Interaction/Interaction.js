import React, { useMemo, useRef } from 'react';
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { database } from "../../../../../../../firebase";
import styled from "styled-components";
import { colorGreySearchIcon } from "../../../../../../../Constants/Colors";
import { collectionNames, documentNames } from "../../../../../../../Constants/FireStoreNaming";
import Comments from "./Comments/Comments";
import Buttons from "./Buttons/Buttons";
import InteractionsCount from "./InteractionsCount/InteractionsCount";


const Container = styled.div`
    color: ${colorGreySearchIcon};
`;


function Interaction() {
    const newCommentInputRef = useRef();
    const notificationsCollection = useMemo(() => {
        return {
            add: async (interactedPostUid, postId, interactedUid, interactionType, timeStamp, commentContent = "") => {
                //Add notification to list
                const notificationId = `${postId}_${interactedUid}_${timeStamp}`;
                await setDoc(doc(database, collectionNames.users, interactedPostUid, collectionNames.notifications, documentNames.notificationsDetails, collectionNames.notificationsList, notificationId), {
                    id: notificationId,
                    postId: postId,
                    interactedUid: interactedUid,
                    interactionType: interactionType,
                    commentContent: commentContent,
                    timeStamp: timeStamp,
                    read: false
                });

                //Increase numbersOfNewNotifications
                const notificationsDetailsSnapshot = await getDoc(doc(database, collectionNames.users, interactedPostUid, collectionNames.notifications, documentNames.notificationsDetails));
                const notificationsDetailsDocument = notificationsDetailsSnapshot.data();
                const numbersOfNewNotifications = notificationsDetailsDocument?.numbersOfNewNotifications || 0;

                await setDoc(doc(database, collectionNames.users, interactedPostUid, collectionNames.notifications, documentNames.notificationsDetails), {
                    numbersOfNewNotifications: numbersOfNewNotifications + 1
                });
            },

            delete: async (interactedPostUid, postId, interactedUid, timeStamp) => {
                const notificationId = `${postId}_${interactedUid}_${timeStamp}`;

                await deleteDoc(doc(database, collectionNames.users, interactedPostUid, collectionNames.notifications, documentNames.notificationsDetails, collectionNames.notificationsList, notificationId));

                //Decrease numbersOfNewNotifications
                const notificationsDetailsSnapshot = await getDoc(doc(database, collectionNames.users, interactedPostUid, collectionNames.notifications, documentNames.notificationsDetails));
                const notificationsDetailsDocument = notificationsDetailsSnapshot.data();
                const numbersOfNewNotifications = notificationsDetailsDocument?.numbersOfNewNotifications || 0;

                await setDoc(doc(database, collectionNames.users, interactedPostUid, collectionNames.notifications, documentNames.notificationsDetails), {
                    numbersOfNewNotifications: numbersOfNewNotifications === 0 ? 0 : numbersOfNewNotifications - 1
                });

            },
        };
    }, []);

    return (
        <Container>
            <InteractionsCount />
            <Buttons newCommentInputRef={newCommentInputRef} notificationsCollection={notificationsCollection} />
            <Comments newCommentInputRef={newCommentInputRef} notificationsCollection={notificationsCollection} />
        </Container >
    );
}

export default Interaction;
