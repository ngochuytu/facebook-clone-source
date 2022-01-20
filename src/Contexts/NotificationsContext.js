import { collection, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import NotificationItem from "../Components/Notifications/NotificationItem/NotificationItem";
import { breakPointVerySmall } from "../Constants/BreakPoints";
import { firebaseCollections } from "../Constants/FireStoreNaming";
import { notificationSpacing } from "../Constants/Spacing/Notifications";
import { database } from "../firebase";
import { useFireBaseAuthContext } from "./FireBaseAuthContext";

const Notifications = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 3;

    & > *{
        width: ${notificationSpacing.width.small};
    }
    
    @media screen and (max-width: ${breakPointVerySmall}){
        left: 5px;

        & > *{
            width: ${notificationSpacing.width.verySmall};
        }        
    }
`;

const NotificationsContext = createContext();

export const useNotificationsContext = () => useContext(NotificationsContext);

export function NotificationsProvider({ children }) {
    //Ref to get the current value in onSnapshot callback
    const [numbersOfNewNotifications, setNumbersOfNewNotifications] = useState(0);
    const numbersOfNewNotificationsRef = useRef();
    numbersOfNewNotificationsRef.current = numbersOfNewNotifications;
    //unsubscribes listening collection
    const [unsubscribes, setUnsubscribes] = useState([]);
    const unsubscribesRef = useRef();
    unsubscribesRef.current = unsubscribes;

    const [notifications, setNotifications] = useState([]);
    const notificationsRef = useRef();
    notificationsRef.current = notifications;

    const { currentUser } = useFireBaseAuthContext();

    //Get numbersOfNewNotifications
    useEffect(() => {
        const getNumbersOfNewNotifications = async () => {
            if (currentUser) {
                const notificationsDetailsSnapshot = await getDoc(doc(database, firebaseCollections.users.collectionName, currentUser.uid, firebaseCollections.users.subCollections.notifications.collectionName, firebaseCollections.users.subCollections.notifications.documents.notificationsDetails.documentName));
                const notificationsDetailsDoc = notificationsDetailsSnapshot.data();
                const numbersOfNewNotifications = notificationsDetailsDoc?.numbersOfNewNotifications;
                numbersOfNewNotifications && setNumbersOfNewNotifications(numbersOfNewNotifications);
            }
        };

        getNumbersOfNewNotifications();
    }, [currentUser]);



    //Listening to notifications realtime update
    useEffect(() => {
        const listeningToNotificationsListCollection = () => {
            //onSnapshot always called the first time => show notification even if there's not changing in collection
            let firstOnSnapshotCall = false;
            //Listening for notificationsListCollection changes
            const unsubscribe = onSnapshot(collection(database, firebaseCollections.users.collectionName, currentUser.uid, firebaseCollections.users.subCollections.notifications.collectionName, firebaseCollections.users.subCollections.notifications.documents.notificationsDetails.documentName, firebaseCollections.users.subCollections.notifications.subCollections.notificationsList.collectionName), notificationsListSnapshot => {
                //If not first load
                if (firstOnSnapshotCall) {
                    const notificationsListDocChange = notificationsListSnapshot.docChanges()[0];
                    if (notificationsListDocChange.type === "added") {
                        const newNotificationDoc = notificationsListDocChange.doc.data();
                        //Get interacted user
                        getDoc(doc(database, firebaseCollections.users.collectionName, newNotificationDoc.interactedUid)).then(userDocSnapshot => {
                            //Client
                            const interactedUser = userDocSnapshot.data();
                            //Add notification popup
                            setNotifications([...notificationsRef.current, {
                                id: newNotificationDoc.id,
                                postId: newNotificationDoc.postId,
                                interactionType: newNotificationDoc.interactionType,
                                displayName: interactedUser.displayName,
                                photoURL: interactedUser.photoURL,
                                commentContent: newNotificationDoc.commentContent,
                                timeStamp: newNotificationDoc.timeStamp,
                                read: newNotificationDoc.read
                            }]);


                            // Del notification popup
                            setTimeout(() => {
                                setNotifications(notificationsRef.current.filter(notification => notification.id !== newNotificationDoc.id));
                            }, 5000);
                        });
                    }
                }
                else {
                    firstOnSnapshotCall = true;
                }
            });

            return unsubscribe;
        };


        if (currentUser) {
            const notificationsListenerUnsubscribe = listeningToNotificationsListCollection();
            setUnsubscribes([...unsubscribesRef.current, notificationsListenerUnsubscribe]);
        }

        const cleanUpNotificationsCollectionListener = () => {
            unsubscribesRef.current.forEach(unsubscribe => unsubscribe());
        };

        return () => {
            cleanUpNotificationsCollectionListener();
        };
    }, [currentUser]);

    useEffect(() => {
        const clearNotificationsPopupWhenLogout = () => setNotifications([]);

        clearNotificationsPopupWhenLogout();
    }, [currentUser]);


    useEffect(() => {
        const listeningToNotificationsDetailsDocument = () => {
            const unsubscribe = onSnapshot(doc(database, firebaseCollections.users.collectionName, currentUser.uid, firebaseCollections.users.subCollections.notifications.collectionName, firebaseCollections.users.subCollections.notifications.documents.notificationsDetails.documentName), notificationsDetailsSnapshot => {
                const notificationsDetailsDocumentChange = notificationsDetailsSnapshot.data();
                const newNumbersOfNewNotifications = notificationsDetailsDocumentChange?.numbersOfNewNotifications || 0;
                setNumbersOfNewNotifications(newNumbersOfNewNotifications);
            });

            return unsubscribe;
        };

        let notificationsDetailsDocumentListenerUnsubscribe = () => { };

        if (currentUser) {
            notificationsDetailsDocumentListenerUnsubscribe = listeningToNotificationsDetailsDocument();
        }

        return () => {
            notificationsDetailsDocumentListenerUnsubscribe();
        };
    }, [currentUser]);


    const updateCurrentUserNumbersOfNewNotification = (newNumbersOfNewNotifications = 0) => {
        setDoc(doc(database, firebaseCollections.users.collectionName, currentUser.uid, firebaseCollections.users.subCollections.notifications.collectionName, firebaseCollections.users.subCollections.notifications.documents.notificationsDetails.documentName), {
            numbersOfNewNotifications: newNumbersOfNewNotifications > 0 ? newNumbersOfNewNotifications : 0
        });
    };

    const contextValues = { numbersOfNewNotifications, setNumbersOfNewNotifications, updateCurrentUserNumbersOfNewNotification };

    return (
        <NotificationsContext.Provider value={contextValues}>
            {children}
            {notifications.length ?
                <Notifications>
                    {notifications.map(
                        ({ id, postId, interactionType, displayName, photoURL, commentContent, timeStamp, read }) =>
                            <NotificationItem key={id} id={id} postId={postId} interactionType={interactionType} displayName={displayName} photoURL={photoURL} commentContent={commentContent} timeStamp={timeStamp} read={read} />
                    )}
                </Notifications> : null
            }
        </NotificationsContext.Provider>
    );
};
