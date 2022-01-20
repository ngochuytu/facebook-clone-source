import React, { useRef, useState } from 'react';
import styled from "styled-components";
import { colorGreyHeader, colorBlueHeaderCenter, colorGreyInput } from "../../../../../../../../Constants/Colors";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpFilledIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import iconLikeSrc from '../../../../../../../../Images/Emotes/Like.svg';
import iconHeartSrc from '../../../../../../../../Images/Emotes/Heart.png';
import iconCareSrc from '../../../../../../../../Images/Emotes/Care.png';
import iconHahaSrc from '../../../../../../../../Images/Emotes/Haha.png';
import iconWowSrc from '../../../../../../../../Images/Emotes/Wow.png';
import iconSadSrc from '../../../../../../../../Images/Emotes/Sad.png';
import iconAngrySrc from '../../../../../../../../Images/Emotes/Angry.png';
import { useFireBaseAuthContext } from "../../../../../../../../Contexts/FireBaseAuthContext";
import { useInteractionContext } from "../../FeedItem";
import { deleteDoc, doc, getDoc, setDoc, updateDoc, Timestamp } from "@firebase/firestore";
import { database } from "../../../../../../../../firebase";
import { firebaseCollections } from "../../../../../../../../Constants/FireStoreNaming";
import { usePostsContext } from "../../../Feed";
import { INTERACTION_EMOTES, INTERACTION_TYPES } from '../../../../../../../../Constants/InteractionEmotes';
import { breakPointSmall, breakPointVerySmall } from "../../../../../../../../Constants/BreakPoints";

const ButtonsContainer = styled.div`
    display: flex;
    border-top: 1px solid ${colorGreyInput};
    border-bottom: 1px solid ${colorGreyInput};
    padding: 5px 0;
    margin: 10px 0;
`;

const ButtonWrapper = styled.div`
    position: relative;
    flex-basis: 50%;
`;

const Button = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 700;

    & > :first-child{
        width: 20px;
        height: 20px;
    }

    &:hover{
        background: ${colorGreyInput};
    }
`;

const InteractionsList = styled.div`
    top: 0;
    left: 0;
    transform: translateY(-100%);
    position: absolute;
    z-index: 1;
    display: flex;
    border: 1px solid ${colorGreyInput};
    border-radius: 999px;
    background: ${colorGreyHeader};
    
    @media screen and (max-width: ${breakPointSmall}){
        left: -15px;
    }

    @media screen and (max-width: ${breakPointVerySmall}){
        left: calc(-10vw);
    }

`;

const InteractionIcon = styled.img`
    width: 35px;
    margin: 5px;
    cursor: pointer;
    transition: transform 0.1s linear;
    &:hover{
        transform: scale(1.3);
    }

    @media screen and (max-width: ${breakPointSmall}){
        width: 30px;
    }
`;


const ButtonDescription = styled.p`
    margin-left: 10px;
    user-select: none;

    /* Like Btn */
    color: ${props => props.color ? props.color : 'inherit'};

    @media screen and (max-width: ${breakPointVerySmall}){
        font-size: 14px;
    }
`;

const ThumbUpIcon = styled(ThumbUpFilledIcon)`
    color : ${colorBlueHeaderCenter};
`;

const Emote = styled.img`
    width: 20px;
    height: 20px;
`;

function Buttons({ newCommentInputRef, notificationsCollection }) {
    const [openInteractionsList, setOpenInteractionsList] = useState(false);
    const openInteractionsListTimeoutRef = useRef();
    const { currentUser } = useFireBaseAuthContext();
    const { posts, setPosts } = usePostsContext();
    const { id: postId, uid: postUid, interactions } = useInteractionContext();
    const timeOutLikeButtonClick = useRef(null);

    const getCurrentUserInteractionType = () => {
        return interactions
            .filter(interaction => interaction.uid === currentUser.uid)
            .reduce((interactionType, interaction) => interactionType += interaction.interactionType, "");
    };

    const getCurrentUserInteractionColor = () => {
        const interactionType = getCurrentUserInteractionType();
        const interactionEmote = INTERACTION_EMOTES.find(interactionEmote => interactionEmote.interactionType === interactionType);
        return interactionEmote?.color;
    };

    const getCurrentUserInteractionEmoteSrc = () => {
        const interactionType = getCurrentUserInteractionType();
        //Like có icon riêng
        if (interactionType === INTERACTION_TYPES.like)
            return null;
        else
            return INTERACTION_EMOTES.find(interactionEmote => interactionEmote.interactionType === interactionType)?.emoteSrc;
    };

    //Xử lý ấn emote + ấn buttonLike bên ngoài
    //-Nếu đã đang interact r:
    // +Nếu chọn emote từ bảng popup => update interact
    // +Nếu click button like bên ngoài => Xoá interact
    //-Nếu chưa interact:
    // +Nếu chọn emote từ bảng popup => update interact
    // +Nếu click button like bên ngoài => update interact like

    const interactButtonClickHandler = async (interactionType) => {
        //Đóng bảng chọn emotes
        setOpenInteractionsList(false);

        const timeStamp = Timestamp.fromDate(new Date());

        const isCurrentUserInteracted = getCurrentUserInteractionType() ? true : false;

        const updateClientInteraction = () => {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        interactions: [
                            ...post.interactions.filter(interaction => interaction.uid !== currentUser.uid), {
                                uid: currentUser.uid,
                                timeStamp: timeStamp,
                                interactionType: interactionType,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL
                            }
                        ]
                    };
                }
                else {
                    return post;
                }
            }));
        };

        //Database
        //Update interaction + notification
        const updateDatabaseInteraction = () => {
            //Debounce khi viết vào db
            clearTimeout(timeOutLikeButtonClick.current);
            timeOutLikeButtonClick.current = setTimeout(() => {
                const addInteractionAndNotificationsToCollection = async () => {
                    try {
                        const snapshot = await getDoc(doc(database, firebaseCollections.posts.collectionName, postId, firebaseCollections.posts.subCollections.interactions.collectionName, currentUser.uid));
                        //Nếu đã interact trong db + interact trong post client
                        //Update
                        if (snapshot.exists() && isCurrentUserInteracted) {
                            //Update interact
                            await updateDoc(doc(database, firebaseCollections.posts.collectionName, postId, firebaseCollections.posts.subCollections.interactions.collectionName, currentUser.uid), {
                                interactionType: interactionType,
                                timeStamp: timeStamp
                            });
                            //Update notification
                            await notificationsCollection.delete(postUid, postId, currentUser.uid, snapshot.data().timeStamp);
                            await notificationsCollection.add(postUid, postId, currentUser.uid, interactionType, timeStamp);
                        }
                        //Nếu chưa interact trong db + chưa interact post client
                        else if (snapshot.exists() === false && isCurrentUserInteracted === false) {
                            //Add interact
                            await setDoc(doc(database, firebaseCollections.posts.collectionName, postId, firebaseCollections.posts.subCollections.interactions.collectionName, currentUser.uid), {
                                interactionType: interactionType,
                                uid: currentUser.uid,
                                timeStamp: timeStamp
                            });
                            //Add notification
                            notificationsCollection.add(postUid, postId, currentUser.uid, interactionType, timeStamp);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                };

                addInteractionAndNotificationsToCollection();
            }, 3000);
        };

        updateClientInteraction();
        updateDatabaseInteraction();
    };

    const likeButtonClickHandler = async () => {
        const interactionTypeLike = INTERACTION_TYPES.like;

        const removeClientLikeInteraction = () => {
            //Nếu đã interact => Bỏ
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        interactions: interactions.filter(interact => interact.uid !== currentUser.uid)
                    };
                }
                return post;
            }));

        };

        const databaseInteractionHandler = () => {
            const timeStamp = Timestamp.fromDate(new Date());

            const isCurrentUserInteracted = getCurrentUserInteractionType() ? true : false;

            //Debounce khi viết vào db
            clearTimeout(timeOutLikeButtonClick.current);
            timeOutLikeButtonClick.current = setTimeout(() => {
                const addInteractionAndNotificationsToCollection = async () => {
                    try {
                        const snapshot = await getDoc(doc(database, firebaseCollections.posts.collectionName, postId, firebaseCollections.posts.subCollections.interactions.collectionName, currentUser.uid));
                        //Nếu đã interact trong db
                        if (snapshot.exists() && isCurrentUserInteracted) {
                            //Remove interact
                            await deleteDoc(doc(database, firebaseCollections.posts.collectionName, postId, firebaseCollections.posts.subCollections.interactions.collectionName, currentUser.uid));
                            //Delete notification
                            notificationsCollection.delete(postUid, postId, currentUser.uid, snapshot.data().timeStamp);
                        }
                        //Nếu chưa interact trong db + chưa interact post client
                        else if (snapshot.exists() === false && isCurrentUserInteracted === false) {
                            //Add interact
                            await setDoc(doc(database, firebaseCollections.posts.collectionName, postId, firebaseCollections.posts.subCollections.interactions.collectionName, currentUser.uid), {
                                interactionType: interactionTypeLike,
                                uid: currentUser.uid,
                                timeStamp: timeStamp
                            });
                            //Add notification
                            notificationsCollection.add(postUid, postId, currentUser.uid, interactionTypeLike, timeStamp);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                };

                addInteractionAndNotificationsToCollection();
            }, 3000);
        };

        setOpenInteractionsList(false);

        if (getCurrentUserInteractionType()) {
            removeClientLikeInteraction();
            databaseInteractionHandler();
        }
        else {
            interactButtonClickHandler(interactionTypeLike);
        }

    };

    //Focus
    const commentButtonClickHandler = () => newCommentInputRef.current.focus();

    const likeButtonMouseOverHandler = () => {
        //K có setTimeout mở list nào đang chạy => set mở list
        if (!openInteractionsListTimeoutRef.current) {
            openInteractionsListTimeoutRef.current = setTimeout(() => {
                setOpenInteractionsList(true);
            }, 800);
        }
    };
    const likeButtonMouseLeaveHandler = () => {
        //Clear timeout để tránh hover ra ngoài r vẫn mở
        clearTimeout(openInteractionsListTimeoutRef.current);
        openInteractionsListTimeoutRef.current = null;
        setTimeout(() => {
            setOpenInteractionsList(false);
        }, 800);
    };

    return (
        <ButtonsContainer>
            <ButtonWrapper onMouseOver={likeButtonMouseOverHandler} onMouseLeave={likeButtonMouseLeaveHandler}>
                <Button onClick={likeButtonClickHandler}>
                    {
                        getCurrentUserInteractionType() === INTERACTION_TYPES.like ? <ThumbUpIcon /> :
                            getCurrentUserInteractionType() ? null : <ThumbUpOutlinedIcon />
                    }
                    {getCurrentUserInteractionEmoteSrc() && <Emote src={getCurrentUserInteractionEmoteSrc()} />}

                    <ButtonDescription color={getCurrentUserInteractionColor()}>{getCurrentUserInteractionType() || INTERACTION_TYPES.like}</ButtonDescription>
                </Button>
                {openInteractionsList ?
                    <InteractionsList>
                        <InteractionIcon src={iconLikeSrc} onClick={() => interactButtonClickHandler(INTERACTION_TYPES.like)} />
                        <InteractionIcon src={iconHeartSrc} onClick={() => interactButtonClickHandler(INTERACTION_TYPES.heart)} />
                        <InteractionIcon src={iconCareSrc} onClick={() => interactButtonClickHandler(INTERACTION_TYPES.care)} />
                        <InteractionIcon src={iconHahaSrc} onClick={() => interactButtonClickHandler(INTERACTION_TYPES.haha)} />
                        <InteractionIcon src={iconWowSrc} onClick={() => interactButtonClickHandler(INTERACTION_TYPES.wow)} />
                        <InteractionIcon src={iconSadSrc} onClick={() => interactButtonClickHandler(INTERACTION_TYPES.sad)} />
                        <InteractionIcon src={iconAngrySrc} onClick={() => interactButtonClickHandler(INTERACTION_TYPES.angry)} />
                    </InteractionsList>
                    : null
                }
            </ButtonWrapper>
            <ButtonWrapper>
                <Button onClick={commentButtonClickHandler}>
                    <ChatBubbleOutlineOutlinedIcon />
                    <ButtonDescription>Comment</ButtonDescription>
                </Button>
            </ButtonWrapper>
        </ButtonsContainer>
    );
}

export default Buttons;
