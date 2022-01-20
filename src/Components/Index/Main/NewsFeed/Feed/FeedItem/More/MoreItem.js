import { doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from 'react';
import styled from 'styled-components';
import { colorGreyInput } from "../../../../../../../Constants/Colors";
import { firebaseCollections } from "../../../../../../../Constants/FireStoreNaming";
import { useNotificationsContext } from "../../../../../../../Contexts/NotificationsContext";
import { database, storage } from '../../../../../../../firebase';
import NewPostPopup from "../../../NewPost/NewPostPopup";
import { usePostsContext } from "../../Feed";

const Container = styled.li`
    display: flex;
    align-items: center;
    color: #fff;
    padding: 5px 10px 5px 5px;
    cursor: pointer;
    &:hover{
        background-color: ${colorGreyInput};
    }
`;

const Title = styled.strong`
    white-space: nowrap;
    padding-left: 10px;
`;

const MoreItem = ({ postId, uid, content, attachmentFullPath, attachmentPreviewURL, title, icon, menuMoreOpen, setMenuMoreOpen }) => {
    const [openNewPostPopup, setOpenNewPostPopup] = useState(false);
    const { posts, setPosts } = usePostsContext();
    const { numbersOfNewNotifications, updateCurrentUserNumbersOfNewNotification } = useNotificationsContext();

    const deletePost = async () => {
        try {
            //Server
            await deleteDoc(doc(database, firebaseCollections.posts.collectionName, postId));
            if (attachmentFullPath)
                deleteObject(ref(storage, attachmentFullPath));

            //Client
            setPosts(posts.filter(post => post.id !== postId));

            //Delete comments and interactions notifications attached to that post
            const q = query(collection(database, firebaseCollections.users.collectionName, uid, firebaseCollections.users.subCollections.notifications.collectionName, firebaseCollections.users.subCollections.notifications.documents.notificationsDetails.documentName, firebaseCollections.users.subCollections.notifications.subCollections.notificationsList.collectionName), where("postId", "==", postId));
            const notificationsListCollectionSnapshot = await getDocs(q);
            notificationsListCollectionSnapshot.forEach(notificationDoc => deleteDoc(notificationDoc.ref));

            //Update numbersOfNewNotifications 
            //Chỉ user hiện tại xoá đc bài bản thân => update sl notifications của currentUser
            const newNumbersOfNotifications = numbersOfNewNotifications - notificationsListCollectionSnapshot.size;
            updateCurrentUserNumbersOfNewNotification(newNumbersOfNotifications);
        }
        catch (error) {
            console.error(error);
        }
    };

    const itemClickHandler = () => {
        switch (title) {
            case "Delete Post":
                deletePost();
                setMenuMoreOpen(!menuMoreOpen);
                break;
            case "Edit Post":
                //Edit handler in Popup Component
                setOpenNewPostPopup(!openNewPostPopup);
                break;
            default:
        }

    };
    return (
        <>
            <Container onClick={itemClickHandler}>
                {icon}
                <Title>{title}</Title>
            </Container>
            {openNewPostPopup ?
                <NewPostPopup
                    editPost={{
                        title: title,
                        openNewPostPopup: openNewPostPopup,
                        setOpenNewPostPopup: setOpenNewPostPopup,
                        menuMoreOpen: menuMoreOpen,
                        setMenuMoreOpen: setMenuMoreOpen,
                        postId: postId,
                        content: content,
                        attachmentFullPath: attachmentFullPath,
                        attachmentPreviewURL: attachmentPreviewURL
                    }}
                />
                : null}
        </>
    );
};

export default MoreItem;