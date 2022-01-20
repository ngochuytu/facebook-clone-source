import { addDoc, collection, doc, setDoc, Timestamp } from "@firebase/firestore";
import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorGreyInput, colorGreySearchIcon } from "../../../../../../../../Constants/Colors";
import { firebaseCollections } from "../../../../../../../../Constants/FireStoreNaming";
import { INTERACTION_TYPES } from "../../../../../../../../Constants/InteractionEmotes";
import { useFireBaseAuthContext } from "../../../../../../../../Contexts/FireBaseAuthContext";
import { database } from "../../../../../../../../firebase";
import { convertTimeStamp } from "../../../../../../../../Functions/ConvertTimeStamp";
import AvatarPic from '../../../../../../../../Images/Avatar.png';
import { usePostsContext } from "../../../Feed";
import { useInteractionContext } from "../../FeedItem";
import CommentItem from "./CommentItem";

const NewComment = styled.div`
    display: flex;
`;

const Form = styled.form`
    flex: 1;
`;

export const AvatarComment = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;

    &:hover{
        filter: brightness(1.2);
    }
`;

const ParagraphEdit = styled.p`
    padding: 8.5px 10px 7.5px 10px;
    color: white;
    word-break: break-word ;
    width: 100%;
    min-height: 35px;
    background: ${colorGreyInput};
    border-radius: 20px;
    outline: none;
    cursor: text;

    &:empty:before{
        content: attr(data-placeholder);
        color: ${colorGreySearchIcon};
    }
`;

const CommentsList = styled.div``;

function Comments({ newCommentInputRef, notificationsCollection }) {
    const { currentUser } = useFireBaseAuthContext();
    const { uid: postUid, id: postId, comments } = useInteractionContext();
    const { posts, setPosts } = usePostsContext();
    const postingCommentRef = useRef(false);

    const newCommentHandler = async e => {
        //Comment cần id vì có thể 1 người nhiều cmt
        const commentContent = e.target.innerText.trim();
        if (!postingCommentRef.current) {
            if (e.keyCode === 13 && commentContent !== "") {
                e.preventDefault();
                postingCommentRef.current = true;

                let docRef = null;
                try {
                    const timeStamp = Timestamp.fromDate(new Date());
                    //Server
                    //Lấy id để update vào trong doc
                    docRef = await addDoc(collection(database, firebaseCollections.posts.collectionName, postId, firebaseCollections.posts.subCollections.comments.collectionName), {
                        uid: currentUser.uid,
                        content: commentContent,
                        timeStamp: timeStamp
                    });

                    await setDoc(doc(database, firebaseCollections.posts.collectionName, postId, firebaseCollections.posts.subCollections.comments.collectionName, docRef.id), {
                        id: docRef.id
                    }, { merge: true });

                    //Add Notification
                    notificationsCollection.add(postUid, postId, currentUser.uid, INTERACTION_TYPES.comment, timeStamp, commentContent);

                    //Client
                    setPosts(posts.map(post => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                comments: [{
                                    id: docRef.id,
                                    content: e.target.innerText,
                                    uid: currentUser.uid,
                                    timeStamp: timeStamp,
                                    displayName: currentUser.displayName,
                                    photoURL: currentUser.photoURL
                                }, ...post.comments]
                            };
                        }
                        else {
                            return post;
                        }
                    }));

                    e.target.innerHTML = '';

                } catch (error) {
                    console.error(error);
                }
                postingCommentRef.current = false;
            }
        }
    };

    return (
        <>
            <NewComment>
                <Link to={`/${currentUser.uid}`}>
                    <AvatarComment src={currentUser.photoURL || AvatarPic} />
                </Link>
                <Form method="POST">
                    <ParagraphEdit contentEditable="true" data-placeholder="Write a comment..." onKeyDown={newCommentHandler} ref={newCommentInputRef}></ParagraphEdit>
                </Form>
            </NewComment>
            <CommentsList>
                {comments.map(comment =>
                    <CommentItem
                        key={comment.id}
                        uid={comment.uid}
                        displayName={comment.displayName}
                        photoURL={comment.photoURL}
                        content={comment.content}
                        timeStamp={convertTimeStamp(comment.timeStamp)}
                    />
                )}
            </CommentsList>
        </>
    );
}

export default Comments;
