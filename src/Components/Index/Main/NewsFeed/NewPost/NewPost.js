import React, { useState } from "react";
import styled from "styled-components";
import AvatarPic from "../../../../../Images/Avatar.png";
import { Link } from "react-router-dom";
import NewPostPopup from "./NewPostPopup";
import { colorGreyHeader, colorGreyInput, colorGreySearchIcon } from '../../../../../Constants/Colors';
import { useFireBaseAuthContext } from "../../../../../Contexts/FireBaseAuthContext";

const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: ${colorGreyHeader};
    padding: 10px 15px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;

    &:hover{
        filter: brightness(1.2);
    }
`;

const FakeInput = styled.div`
    width: 0; /*Override flex-item min-width: auto, cause input cannot shrink below default width*/
    height: 45px;
    flex: 1;
    color: ${colorGreySearchIcon};
    background-color: ${colorGreyInput};
    outline: none;
    border: none;
    border-radius: 999px;
    padding: 12px 15px;
    font-size: 1.1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        filter: brightness(1.2);
    }
`;

export default function NewPost() {
    const [post, setPost] = useState({
        content: "",
        attachmentFile: null, //Để up file lên
        attachmentPreviewURL: null
    });

    const { currentUser } = useFireBaseAuthContext();
    const { displayName, photoURL, uid } = currentUser;
    const [openNewPostPopup, setOpenNewPostPopup] = useState(false);

    const postHtml = {
        __html: post.content || `What's on your mind, ${displayName}`
    };

    if (openNewPostPopup) {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
    }
    else {
        document.body.style.position = "initial";
        document.body.style.width = "initial";
    }

    const newPostFakeInputClickHandler = () => setOpenNewPostPopup(!openNewPostPopup);


    return (
        <Container>
            <Link to={`/${uid}`}>
                <Avatar src={photoURL || AvatarPic} />
            </Link>
            <FakeInput dangerouslySetInnerHTML={postHtml} onClick={newPostFakeInputClickHandler}></FakeInput>
            {openNewPostPopup ? (
                <NewPostPopup
                    newPost={{
                        title: "Create Post",
                        post: post,
                        setPost: setPost,
                        openNewPostPopup: openNewPostPopup,
                        setOpenNewPostPopup: setOpenNewPostPopup
                    }}
                />
            ) : null}
        </Container>
    );
}
