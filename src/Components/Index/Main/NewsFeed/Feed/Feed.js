import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import styled from 'styled-components';
import FeedItem from './FeedItem/FeedItem';
import { database } from '../../../../../firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, where, limit, startAfter } from '@firebase/firestore';
import NewPost from "../NewPost/NewPost";
import { useFireBaseAuthContext } from "../../../../../Contexts/FireBaseAuthContext";
import { colorGreySearchIcon } from "../../../../../Constants/Colors";
import { useRefetchPostsContext } from "../../../../../Contexts/RefetchPostsContext";
import { useUserProfileContext } from "../../../../Profile/Index";
import { firebaseCollections } from "../../../../../Constants/FireStoreNaming";
import PostSkeleton from "../../../../Skeleton/PostSkeleton";
import useScrollToBottom from "../../../../../Hooks/useScrollToBottom";

const Container = styled.div``;

const NoPostAvailable = styled.p`
    color: ${colorGreySearchIcon};
    font-size: 1.2rem;
    font-weight: 700;
    padding-top: 10px;
    text-align: center;
`;

const PostsContext = createContext();
export const usePostsContext = () => useContext(PostsContext);
const LIMIT = 5;

//postsPage: postId
//profilePage: userProfile
export default function Feed({ indexPage, postsPage, profilePage, postId }) {
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const lastDoc = useRef();
    const isOutOfPosts = useRef(false);
    const { currentUser } = useFireBaseAuthContext();
    const refetchPostsContextValues = useRefetchPostsContext();
    const userProfileContextValues = useUserProfileContext();

    if (refetchPostsContextValues)
        var { refetchPosts } = refetchPostsContextValues;

    if (profilePage)
        var { userProfile } = userProfileContextValues;

    useScrollToBottom(()=>{
        if((profilePage || indexPage) && !loadingPosts){
            setLoadMore(!loadMore)
        }
    })


    useEffect(() => {
        const getPosts = async () => {
            setLoadingPosts(true);
            const posts = [];
            let q = null;

            //userProfileUid for userProfile post
            //Sort by timeStamp
            if (profilePage) { //Profile page
                if(lastDoc.current){
                    //Cannot perform orderby on another field
                    q = query(collection(database, firebaseCollections.posts.collectionName), where("uid", "==", userProfile.uid), orderBy("timeStamp", "desc"), startAfter(lastDoc.current), limit(LIMIT));
                }
                else {
                    //Cannot perform orderby on another field
                    q = query(collection(database, firebaseCollections.posts.collectionName), where("uid", "==", userProfile.uid), orderBy("timeStamp", "desc"), limit(LIMIT));
                }
            }
            else if (postsPage) { //Posts Page
                q = query(doc(database, firebaseCollections.posts.collectionName, postId));
            }
            else { //Index page
                if(lastDoc.current){
                    q = query(collection(database, firebaseCollections.posts.collectionName), orderBy("timeStamp", "desc"), startAfter(lastDoc.current), limit(LIMIT));
                }
                else{
                    q = query(collection(database, firebaseCollections.posts.collectionName), orderBy("timeStamp", "desc"), limit(LIMIT));
                }
            }

            if (postsPage) { //1 post
                const postSnapshot = await getDoc(q);
                posts.push(postSnapshot.data());
            }
            else {
                const postsSnapshot = await getDocs(q);
                if(postsSnapshot.empty){
                    lastDoc.current = undefined
                    isOutOfPosts.current = true;
                }
                else{
                    lastDoc.current = postsSnapshot.docs[postsSnapshot.docs.length - 1]
                }
                postsSnapshot.forEach(doc => {
                    posts.push(doc.data());
                });
            }


            for (let i = 0; i < posts.length; ++i) {
                //Get post's user, interactions and comments, attachmentDownloadURL
                const [userSnapshot, interactionsSnapshot, commentsSnapshot] = await Promise.all([
                    getDoc(doc(database, firebaseCollections.users.collectionName, posts[i].uid)),
                    getDocs(collection(database, firebaseCollections.posts.collectionName, posts[i].id, firebaseCollections.posts.subCollections.interactions.collectionName)),
                    getDocs(collection(database, firebaseCollections.posts.collectionName, posts[i].id, firebaseCollections.posts.subCollections.comments.collectionName))
                ]);


                //User
                const user = userSnapshot.data();

                //Post's interactions
                const interactions = [];
                interactionsSnapshot.forEach(interact => interactions.push(interact.data()));

                //Get interacted user
                for (let j = 0; j < interactions.length; ++j) {
                    const interactedUserSnapshot = await getDoc(doc(database, firebaseCollections.users.collectionName, interactions[j].uid));
                    const interactedUser = interactedUserSnapshot.data();
                    interactions[j] = {
                        ...interactions[j],
                        displayName: interactedUser.displayName,
                        photoURL: interactedUser.photoURL
                    };
                }

                //Post's comments
                const comments = [];
                commentsSnapshot.forEach(comment => comments.push(comment.data()));

                // Get commented user
                for (let k = 0; k < comments.length; ++k) {
                    const commentedUserSnapshot = await getDoc(doc(database, firebaseCollections.users.collectionName, comments[k].uid));
                    const commentedUser = commentedUserSnapshot.data();
                    comments[k] = {
                        ...comments[k],
                        displayName: commentedUser.displayName,
                        photoURL: commentedUser.photoURL
                    };
                }

                posts[i] = {
                    ...posts[i],
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    interactions: interactions,
                    comments: comments
                };
            }
            //If it's profile page
            if (userProfile?.uid) {
                posts.sort((postA, postB) => postB.timeStamp.seconds - postA.timeStamp.seconds);
            }
            setPosts(prev => [...prev, ...posts]);
            setLoadingPosts(false);
        };

        if(!isOutOfPosts.current){
            getPosts();
        }
    }, [refetchPosts, userProfile?.uid, postId, postsPage, profilePage, loadMore]);

    return (
        <Container>
            <PostsContext.Provider value={{ posts, setPosts }}>
                {(indexPage || userProfile?.uid === currentUser.uid) ? <NewPost /> : null}
                {posts.length ? posts.map(
                        ({ id, uid, photoURL, displayName, timeStamp, content, attachmentFullPath, attachmentPreviewURL, interactions, comments }) =>
                            <FeedItem
                                key={id}
                                id={id}
                                uid={uid}
                                photoURL={photoURL}
                                displayName={displayName}
                                timeStamp={timeStamp}
                                content={content}
                                attachmentFullPath={attachmentFullPath}
                                attachmentPreviewURL={attachmentPreviewURL}
                                interactions={interactions}
                                comments={comments}
                            />) 
                : (!loadingPosts && <NoPostAvailable>No post available</NoPostAvailable>)}

                {loadingPosts && 
                    (postsPage ? <PostSkeleton /> : new Array(3).fill(0).map((_, index) => <PostSkeleton key={index} />))
                    
                }
            </PostsContext.Provider>
        </Container>
    );
};

