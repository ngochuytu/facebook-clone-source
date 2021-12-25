import React, { useState, useRef, useEffect } from 'react';
import reactDom from "react-dom";
import styled from 'styled-components';
import AvatarPic from '../../../../../Images/Avatar.png';
import { backgroundColorGreyHeader, colorGreyInput, colorGreySearchIcon, colorGreyIconHeaderRight, colorGreyDisabledText, colorGreyDisabledButton, colorBlueActiveButton, colorRed } from '../../../../../Constants/Colors';
import { Avatar } from './NewPost';
import ClearIcon from '@material-ui/icons/Clear';
import ImageIcon from '@material-ui/icons/Image';
import { addDoc, collection, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { database, storage } from '../../../../../firebase';
import { usePostsContext } from "../Feed/Feed";
import { useFireBaseAuthContext } from "../../../../../Contexts/FireBaseAuthContext";
import { collectionNames } from "../../../../../Constants/FireStoreNaming";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { breakPointMedium, breakPointSmall } from "../../../../../Constants/BreakPoints";
import { Link } from "react-router-dom";

const titlePaddingY = `15px`;
const AddToPostAttachmentMinHeight = '150px';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,.5);
    position: fixed;
    inset: 0;
    z-index: 4;
    padding-bottom: 10px;
`;

const Form = styled.form`
    background: ${backgroundColorGreyHeader};
    border-radius: 10px;
    width: clamp(400px, 50%, 500px);

    @media screen and (max-width: ${breakPointMedium}){
        width: 75%;
    }

    @media screen and (max-width: ${breakPointSmall}){
        width: 85%;
    
        & > :first-child{
            font-size: 18px;
        }
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${colorGreyInput};
    padding: ${titlePaddingY} 0;
    position: relative;
    color: ${colorGreyIconHeaderRight};
    font-size: 20px;
    font-weight: 700;

    @media screen and (max-width: ${breakPointSmall}){
        /* Cancel icon */
        & > :last-child{
            width: 25px !important;
            height: 25px !important;
            top: 12.5px;
        }
    }
`;

const Main = styled.div`
    padding: 15px;
`;

const Cancel = styled(ClearIcon)`
    position: absolute;
    top: 9.5px;
    color: ${colorGreySearchIcon};
    right: ${props => props.right};
    width: ${props => props.size} !important;
    height: ${props => props.size} !important;
    padding: 5px;
    border-radius: 50%;
    background: ${colorGreyInput};
    cursor: pointer;


    &:hover{
        filter: brightness(1.2);
    }
`;

const UserInformation = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Username = styled.p`
    color: ${colorGreyIconHeaderRight};
    font-weight: 700;
`;

const PostContent = styled.div`
    width: 100%;
    height: ${props => props.selectedStyle ? '200px' : '150px'};
    overflow-y: overlay;
    

    ::-webkit-scrollbar{
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    &:hover{
        ::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,.1);
            border-radius: 10px;
        }
    }
`;

const TextContent = styled.p`
    /* display: inline-block;  */
    width: 100%;
    min-height: ${props => props.selectedStyle ? `calc(100% - 10px - ${AddToPostAttachmentMinHeight})` : 'calc(100% - 10px)'}; /* -10px margin */
    font-size: 20px;
    outline: none;
    background: none;
    border: none;
    color: white;
    margin-bottom: 10px;
    user-modify: read-write-plaintext-only; /*Tránh khi copy text vào copy cả style*/

    &:empty:before{
        content: attr(data-placeholder);
        color: ${colorGreySearchIcon};
    }

    @media screen and (max-width: ${breakPointSmall}){
        font-size: 16px;
    }
`;

const AddToPostAttachment = styled.div`
    position: relative;
    min-height: ${AddToPostAttachmentMinHeight};
    border: 1px solid ${colorGreyInput};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: background 100ms ease-in-out;

    &:hover{
        background: ${colorGreyInput};

        ${Cancel}{
            background: ${backgroundColorGreyHeader};
        }
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const AttachmentPlaceHolder = styled.div`
    color: ${props => props.error ? colorRed : colorGreyIconHeaderRight};
    font-weight: 700;
`;

const AttachmentContentPreview = styled.img`
    /* display: ${props => props.display}; */
    width: 100%;
`;

const AddToPostOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${colorGreyInput};
    border-radius: 10px;
    padding: 0 15px;
    margin: 15px 0;

    & > ${Title}{
        font-size: 16px;
    }

    @media screen and (max-width: ${breakPointSmall}){
        & > ${Title}{
            font-size: 14px;
        }
    }
`;

const AddToPostIcons = styled.div`
    display: flex;
`;

const AddToPostIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 50%;
    color: ${colorGreyIconHeaderRight};
    background: ${props => props.selectedStyle && 'black'};
    cursor: pointer;

    &:hover{
        background: ${props => props.selectedStyle || colorGreyInput};
    }
`;

const Button = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    cursor: ${props => props.valid ? "pointer" : "no-drop"};
    background: ${props => props.valid ? colorBlueActiveButton : colorGreyDisabledButton};
    color: ${props => props.valid ? "rgb(255,255,255)" : colorGreyDisabledText};
    font-weight: 700;
    font-size: 15px;
`;

//2 cases
// + post new without postId postId, menuMoreOpen, setMenuMoreOpen, and have outerPost
// + edit without outerPost and have postId, menuMoreOpen, setMenuMoreOpen
// export default function NewPostPopup({ newPost, title, openPopup, setOpenPopup, outerPost, setOuterPost, postId, menuMoreOpen, setMenuMoreOpen }) {
export default function NewPostPopup({ newPost, editPost }) {
    if (newPost)
        var { title, setPost, openNewPostPopup, setOpenNewPostPopup } = newPost;
    if (editPost)
        var { title, openNewPostPopup, setOpenNewPostPopup, menuMoreOpen, setMenuMoreOpen, postId } = editPost;

    const [popupPost, setPopupPost] = useState({
        content: newPost ? newPost.post.content : editPost.content,
        attachmentFile: newPost ? newPost.post.attachmentFile : null,
        attachmentPreviewURL: newPost ? newPost.post.attachmentPreviewURL : editPost.attachmentPreviewURL, //Chỉ dùng để preview client, khi ghi vào db dùng url download của google 
        attachmentError: null,
    });

    const [openAddAttachment, setOpenAddAttachment] = useState(Boolean(popupPost.attachmentPreviewURL));
    const formRef = useRef();
    const cancelCreatePostRef = useRef();
    const textContentRef = useRef();
    const fileInputRef = useRef();
    const postingRef = useRef(false);
    const { posts, setPosts } = usePostsContext();
    const { currentUser } = useFireBaseAuthContext();

    const moveCursorToEnd = () => {
        textContentRef.current.focus();
        const range = document.createRange();
        const selection = window.getSelection();
        if (textContentRef.current.childNodes.length) {
            range.setStart(textContentRef.current.childNodes[textContentRef.current.childNodes.length - 1], textContentRef.current.childNodes[textContentRef.current.childNodes.length - 1].textContent.length);
            range.collapse = true;

            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    useEffect(() => {
        const pushPostToPopup = () => textContentRef.current.innerHTML = popupPost.content;
        pushPostToPopup();
    }, []);

    useEffect(() => {
        moveCursorToEnd();
    }, []);

    const postInputHandler = e => setPopupPost({
        ...popupPost,
        content: e.target.innerHTML,
    });


    const closePopupHandler = e => {
        if (formRef.current.contains(e.target) === false || cancelCreatePostRef.current.contains(e.target)) {
            if (newPost) {
                setPost({
                    ...popupPost
                });

                setOpenNewPostPopup(!openNewPostPopup);
            }

            if (editPost) {
                setMenuMoreOpen(!menuMoreOpen);
            }
        }
    };

    const toggleNewPostMode = () => setOpenAddAttachment(!openAddAttachment);

    const closeAddToPostAttachment = e => {
        e.stopPropagation();
        toggleNewPostMode();
        setPopupPost({
            ...popupPost,
            attachmentFile: null,
            attachmentPreviewURL: null,
            attachmentError: null
        });
    };


    const isPopupPostValidToSubmit = () => {
        //Check rỗng và check post edit cũ có giống mới k
        const trimmedPopupPostContent = popupPost.content.trim();

        if (editPost) {
            if (editPost.content.trim() === trimmedPopupPostContent &&
                editPost.attachmentPreviewURL === popupPost.attachmentPreviewURL)
                return false;
        }

        if (popupPost.attachmentPreviewURL || trimmedPopupPostContent)
            return true;

        return false;
    };

    const addAttachmentHandler = () => fileInputRef.current.click();

    const attachmentChangeHandler = e => {
        if (e.target.files.length) {
            const attachmentFile = e.target.files[0];
            if (attachmentFile.type.startsWith("image/")) {
                setPopupPost({
                    ...popupPost,
                    attachmentFile: attachmentFile,
                    attachmentPreviewURL: URL.createObjectURL(attachmentFile),
                    attachmentError: null
                });
            }
            else {
                setPopupPost({
                    ...popupPost,
                    attachmentError: "Not an image file",
                });
            }
        }
    };

    const postSubmitHandler = async e => {
        e.preventDefault();
        if (!postingRef.current) {
            postingRef.current = true;
            if (isPopupPostValidToSubmit()) {
                const trimmedPopupPostContent = popupPost.content.trim();
                const timeStamp = Timestamp.fromDate(new Date());

                try {
                    //Xử lý attachment để lưu vào db
                    let attachmentFileFullPath = null;
                    let attachmentFileDownloadURL = null;

                    //Nếu có file mới (Khi up mới hoặc khi edit user up file mới)
                    //Up mới chắc chắn chạy vào đây, edit nếu bỏ ảnh sẽ k chạy vào 
                    //Nên đoạn editPost bên dưới phải đặt lại default value cho fullPath và download url
                    if (popupPost.attachmentFile) {
                        const attachmentFileName = popupPost.attachmentFile.name;
                        const attachmentFileID = `${timeStamp}_${attachmentFileName}`;
                        attachmentFileFullPath = `${currentUser.uid}/images/${attachmentFileID}`; //Để sau xóa sửa 

                        const attachmentFileRef = ref(storage, attachmentFileFullPath);
                        const attachmentFileSnapshot = await uploadBytes(attachmentFileRef, popupPost.attachmentFile);
                        attachmentFileDownloadURL = await getDownloadURL(attachmentFileSnapshot.ref); //Để hiện ảnh
                    }

                    if (newPost) {
                        //Server
                        const postRef = await addDoc(collection(database, collectionNames.posts), {
                            uid: currentUser.uid,
                            content: trimmedPopupPostContent,
                            attachmentFullPath: attachmentFileFullPath,
                            attachmentPreviewURL: attachmentFileDownloadURL,
                            timeStamp: timeStamp
                        });

                        //Set post id 
                        await setDoc(doc(database, collectionNames.posts, postRef.id), {
                            id: postRef.id
                        }, { merge: true });


                        //Client
                        setPosts([{
                            uid: currentUser.uid,
                            content: trimmedPopupPostContent,
                            attachmentFullPath: attachmentFileFullPath,
                            attachmentPreviewURL: attachmentFileDownloadURL,
                            timeStamp: timeStamp,
                            id: postRef.id,
                            photoURL: currentUser.photoURL,
                            displayName: currentUser.displayName,
                            interactions: [],
                            comments: []
                        }, ...posts]);

                        //Reset post and close popup
                        setPost({
                            content: "",
                            attachmentFile: null,
                            attachmentPreviewURL: null
                        });

                        setOpenNewPostPopup(!openNewPostPopup);
                    }


                    //Edit
                    if (editPost) {
                        //Server
                        //Xóa file cũ khi có file mới
                        if (editPost.attachmentPreviewURL !== popupPost.attachmentPreviewURL && editPost.attachmentFullPath)
                            deleteObject(ref(storage, editPost.attachmentFullPath));

                        await updateDoc(doc(database, collectionNames.posts, postId), {
                            content: trimmedPopupPostContent,
                            attachmentFullPath: attachmentFileFullPath,
                            attachmentPreviewURL: attachmentFileDownloadURL
                        });
                        //Client
                        setPosts(posts.map(post => post.id === postId ?
                            {
                                ...post,
                                content: trimmedPopupPostContent,
                                attachmentFullPath: attachmentFileFullPath,
                                attachmentPreviewURL: attachmentFileDownloadURL
                            }
                            : post)
                        );
                        //Close menu more
                        setMenuMoreOpen(!menuMoreOpen);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            postingRef.current = false;
        };
    };



    return (
        reactDom.createPortal(
            <Container onMouseDown={closePopupHandler}>
                <Form method="POST" ref={formRef}>
                    <Title>
                        {title}
                        <Cancel ref={cancelCreatePostRef} size="35px" right={titlePaddingY} />
                    </Title>
                    <Main>
                        <UserInformation>
                            <Link to={`/${currentUser.uid}`}>
                                <Avatar src={currentUser.photoURL || AvatarPic} />
                            </Link>
                            <Username>{currentUser.displayName}</Username>
                        </UserInformation>
                        <PostContent selectedStyle={openAddAttachment}>
                            <TextContent ref={textContentRef} selectedStyle={openAddAttachment} contentEditable="true" data-placeholder={`What's on your mind, ${currentUser.displayName}`} onInput={postInputHandler} />
                            {
                                openAddAttachment &&
                                <AddToPostAttachment onClick={addAttachmentHandler}>
                                    <Cancel size="25px" right="10px" onClick={closeAddToPostAttachment} />
                                    <HiddenInput type="file" ref={fileInputRef} accept="image/*" onChange={attachmentChangeHandler} />
                                    {popupPost.attachmentPreviewURL ? null : <AttachmentPlaceHolder error={popupPost.attachmentError}>{popupPost.attachmentError || "Add Photo"}</AttachmentPlaceHolder>}
                                    {popupPost.attachmentPreviewURL && <AttachmentContentPreview src={popupPost.attachmentPreviewURL} />}
                                </AddToPostAttachment>
                            }
                        </PostContent>
                        <AddToPostOptions>
                            <Title>Add to your post</Title>
                            <AddToPostIcons>
                                <AddToPostIconWrapper onClick={toggleNewPostMode} selectedStyle={openAddAttachment} >
                                    <ImageIcon />
                                </AddToPostIconWrapper>
                            </AddToPostIcons>
                        </AddToPostOptions>
                        <Button valid={isPopupPostValidToSubmit()} onClick={postSubmitHandler}>{newPost ? "Post" : "Save"}</Button>
                    </Main>
                </Form>
            </Container >
            , document.getElementById("portal")
        )
    );
};
