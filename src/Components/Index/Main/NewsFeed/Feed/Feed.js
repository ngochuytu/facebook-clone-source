import React, { useState, useEffect, createContext, useContext } from 'react';
import styled from 'styled-components';
import FeedItem from './FeedItem/FeedItem';
import { database } from '../../../../../firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, where } from '@firebase/firestore';
import NewPost from "../NewPost/NewPost";
import { useFireBaseAuthContext } from "../../../../../Contexts/FireBaseAuthContext";
import { colorGreySearchIcon } from "../../../../../Constants/Colors";
import { useRefetchPostsContext } from "../../../../../Contexts/RefetchPostsContext";
import { collectionNames } from "../../../../../Constants/FireStoreNaming";
import PostSkeleton from "../../../../Skeleton/PostSkeleton";


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

//postsPage: postId
//profilePage: profileUser

export default function Feed({ indexPage, postsPage, profilePage, postId, profileUser }) {
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [posts, setPosts] = useState([]);
    const { currentUser } = useFireBaseAuthContext();
    const refetchPostsContextValues = useRefetchPostsContext();
    if (refetchPostsContextValues)
        var { refetchPosts } = refetchPostsContextValues;

    useEffect(() => {
        const getPosts = async () => {
            setLoadingPosts(true);
            const posts = [];
            let q = null;

            //profileUserUid for profileUser post
            //Sort by timeStamp
            if (profilePage) { //Profile page
                //Cannot perform orderby on another field
                q = query(collection(database, collectionNames.posts), where("uid", "==", profileUser.uid));
            }
            else if (postsPage) { //Posts Page
                q = query(doc(database, collectionNames.posts, postId));
            }
            else { //Index page
                q = query(collection(database, collectionNames.posts), orderBy("timeStamp", "desc"));
            }

            if (postsPage) { //1 post
                const postSnapshot = await getDoc(q);
                posts.push(postSnapshot.data());
            }
            else {
                const postsSnapshot = await getDocs(q);
                postsSnapshot.forEach(doc => {
                    posts.push(doc.data());
                });
            }


            for (let i = 0; i < posts.length; ++i) {
                //Get post's user, interactions and comments, attachmentDownloadURL
                const [userSnapshot, interactionsSnapshot, commentsSnapshot] = await Promise.all([
                    getDoc(doc(database, collectionNames.users, posts[i].uid)),
                    getDocs(collection(database, collectionNames.posts, posts[i].id, collectionNames.interactions)),
                    getDocs(collection(database, collectionNames.posts, posts[i].id, collectionNames.comments))
                ]);


                //User
                const user = userSnapshot.data();

                //Post's interactions
                const interactions = [];
                interactionsSnapshot.forEach(interact => interactions.push(interact.data()));

                //Get interacted user
                for (let j = 0; j < interactions.length; ++j) {
                    const interactedUserSnapshot = await getDoc(doc(database, collectionNames.users, interactions[j].uid));
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
                    const commentedUserSnapshot = await getDoc(doc(database, collectionNames.users, comments[k].uid));
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
            if (profileUser?.uid) {
                posts.sort((postA, postB) => postB.timeStamp.seconds - postA.timeStamp.seconds);
            }
            setPosts(posts);
            setLoadingPosts(false);

        };

        getPosts();

    }, [refetchPosts, profileUser?.uid, postId, postsPage, profilePage]);

    return (
        <Container>
            <PostsContext.Provider value={{ posts, setPosts }}>
                {(indexPage || profileUser?.uid === currentUser.uid) ? <NewPost /> : null}

                {loadingPosts ?
                    (postsPage ? <PostSkeleton /> : new Array(3).fill(0).map((item, index) => <PostSkeleton key={index} />)) :
                    posts.length ? posts.map(
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
                        : <NoPostAvailable>No post available</NoPostAvailable>
                }
            </PostsContext.Provider>
        </Container>
    );
};

