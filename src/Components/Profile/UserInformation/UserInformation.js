import React, { useState } from "react";
import styled from "styled-components";
import AvatarPic from "../../../Images/Avatar.png";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../../../firebase";
import { useFireBaseAuthContext } from "../../../Contexts/FireBaseAuthContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { backgroundColorGreyHeader, colorBlueHeaderCenter, colorGreyInput, colorGreySearchIcon, colorGreyIconHeaderRight, colorGreyDisabledButton, colorGreyDisabledText, colorBlueActiveButton } from "../../../Constants/Colors";
import { collectionNames } from "../../../Constants/FireStoreNaming";
import { profileSpacing } from "../../../Constants/Spacing/Profile";
import { breakPointLarge, breakPointMedium, breakPointVerySmall } from "../../../Constants/BreakPoints";


const Container = styled.div`
    background: ${backgroundColorGreyHeader};

    & > *{
        width: ${profileSpacing.width.default};
        margin: 0 auto;
    }

    @media screen and (max-width: ${breakPointLarge}){
        & > *{
            width: ${profileSpacing.width.large};
            margin: 0 auto;
        }    
    }
`;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const AvatarWrapper = styled.div`
    position: relative;
    margin-bottom: 10px;
`;
const Avatar = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;

    @media screen and (max-width: ${breakPointVerySmall}){
        width: 100px;
        height: 100px;
    }
`;

const EditAvatarWrapper = styled.div`
    position: absolute;
    right: 0px;
    bottom: 5px;
    height: 35px;
    width: 35px;

    &:hover {
        filter: brightness(1.2);
    }
`;

const CameraIcon = styled(CameraAltIcon)`
    width: 35px !important;
    height: 35px !important;
    border: 1px solid white;
    border-radius: 50%;
    padding: 5px;
    color: white;
    background: ${backgroundColorGreyHeader};
`;

const AvatarInput = styled.input`
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 35px;
    height: 35px;

    &::-webkit-file-upload-button{   
        width: 35px;
        height: 35px; 
        border-radius: 50%;
        cursor: pointer; 
    }
`;
const DisplayName = styled.h1`
    color: ${colorGreyIconHeaderRight};
    margin-bottom: 5px;
`;

const BioWrapper = styled.div`
    color: white;
    text-align: center;
`;

const Bio = styled.p`
    color: ${colorGreySearchIcon};
    margin-bottom: 5px;
`;

const EditBio = styled.p`
    color: ${colorBlueHeaderCenter};
    cursor: pointer;
    font-weight: 700;
    &:hover {
        text-decoration: underline;
    }
`;

const EditBioForm = styled.form``;

const TextArea = styled.textarea`
    outline: none;
    border: none;
    height: 60px;
    width: 100%;
    font-size: 17px;
    resize: none;
    background: ${colorGreyInput};
    border-radius: 10px;
    padding: 5px 10px;
    color: ${colorGreyIconHeaderRight};
    text-align: center;

    &:hover{
        background: ${colorGreyDisabledButton};
    }

    &:focus{
        border: 1px solid ${colorBlueHeaderCenter};
    }
`;

const CharactersRemaining = styled.small`
    display: block;
    text-align: right;
    color: ${colorGreySearchIcon};
    margin-bottom: 5px;
`;

const ButtonsContainer = styled.div`
    text-align: right;
`;

const Button = styled.button`
    padding: 7.5px;
    margin-left: 5px;
    background: ${colorGreyInput};
    color: ${colorGreyIconHeaderRight};
    font-size: 16px;
    font-weight: 700;
    border-radius: 5px;
    cursor: pointer;
    

    ${props => props.type === "submit" ? `
        ${props.disable ?
            `
                background: ${colorGreyDisabledButton};
                color: ${colorGreyDisabledText};
                cursor: no-drop;
            `
            :
            `
                background: ${colorBlueActiveButton};
                color: 'rgb(255,255,255)';

                &:hover{
                    filter: brightness(1.2);
                }
            `}
    `
        :
        `
            &:hover{
                background: ${colorGreyDisabledButton};
            }    
        `};
`;

const Bar = styled.div`
    display: flex;
    align-items: center;
    border-top: 1px solid ${colorGreyInput};
`;

const NavigationBar = styled.div`
    display: flex;
    padding: 5px 0px;
    height: 55px;

    & > :nth-child(${props => props.activeNavigationItem}){
        color: ${colorBlueHeaderCenter};
        border-bottom: 2px solid ${colorBlueHeaderCenter};
        border-radius: 5px 5px 0 0;
        height: 47.5px;

        &:hover{
            background: initial;
        }
    }

    @media screen and (max-width: ${breakPointMedium}){
        flex: 1;
    }
`;

const NavigationWrapper = styled(Link)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b0b3b4;
    font-weight: 700;
    cursor: pointer;
    padding: 20px;
    border-radius: 5px;
    height: 45px;
    
    &:hover{
        background: ${colorGreyInput};
    }

    @media screen and (max-width: ${breakPointVerySmall}){
        font-size: 14px;
    }
`;

const ACTIVE_NAVIGATION_ITEM = {
    POSTS: 1,
    FRIENDS: 2,
    PHOTOS: 3,
};

function UserInformation({ profileUser, setProfileUser }) {
    const [editBio, setEditBio] = useState(profileUser.bio);
    const [openEditBioForm, setOpenEditBioForm] = useState(false);
    const { currentUser } = useFireBaseAuthContext();
    const [activeNavigationItem, setActiveNavigationItem] = useState(ACTIVE_NAVIGATION_ITEM.POSTS);
    const openAndCloseEditBioFormHandler = () => setOpenEditBioForm(!openEditBioForm);
    const params = useParams();

    const editBioInputHandler = e => setEditBio(e.target.value);

    const editBioSaveButtonHandler = e => {
        e.preventDefault();
        if (editBio.length <= 50 && editBio !== profileUser.bio) {
            setDoc(doc(database, collectionNames.users, profileUser.uid), {
                bio: editBio
            }, { merge: true }).then(() => {
                setOpenEditBioForm(!openEditBioForm);
                setProfileUser({ ...profileUser, bio: editBio });
            });
        }
    };

    return (
        <Container>
            <Profile>
                <AvatarWrapper>
                    <Avatar src={profileUser.photoURL || AvatarPic} />
                    {profileUser.uid === currentUser.uid ?
                        <EditAvatarWrapper>
                            <AvatarInput type="file" name="avatar" title=" " />
                            <CameraIcon />
                        </EditAvatarWrapper>
                        : null}
                </AvatarWrapper>
                <DisplayName>{profileUser.displayName}</DisplayName>
                <BioWrapper>
                    {profileUser.bio && <Bio>{profileUser.bio}</Bio>}
                    {profileUser.uid === currentUser.uid ?
                        !openEditBioForm ?
                            <EditBio onClick={openAndCloseEditBioFormHandler}>Edit Your Bio</EditBio>
                            : null
                        : null}

                    {openEditBioForm ?
                        <EditBioForm method='POST'>
                            <TextArea maxLength='50' spellCheck='false' value={editBio} onInput={editBioInputHandler} />
                            <CharactersRemaining>{50 - (editBio?.length || 0)} characters remaining</CharactersRemaining>
                            <ButtonsContainer>
                                <Button type="button" onClick={openAndCloseEditBioFormHandler}>Cancel</Button>
                                <Button type="submit" disable={profileUser.bio === editBio} onClick={editBioSaveButtonHandler}>Save</Button>
                            </ButtonsContainer>
                        </EditBioForm>
                        : null
                    }
                </BioWrapper>
            </Profile>
            <Bar>
                <NavigationBar activeNavigationItem={activeNavigationItem}>
                    <NavigationWrapper to={`/${params.uid}`} onClick={() => setActiveNavigationItem(ACTIVE_NAVIGATION_ITEM.POSTS)}>Posts</NavigationWrapper>
                    <NavigationWrapper to={`/${params.uid}/friends`} onClick={() => setActiveNavigationItem(ACTIVE_NAVIGATION_ITEM.FRIENDS)}>Friends</NavigationWrapper>
                    <NavigationWrapper to={`/${params.uid}/photos`} onClick={() => setActiveNavigationItem(ACTIVE_NAVIGATION_ITEM.PHOTOS)}>Photos</NavigationWrapper>
                </NavigationBar>
                {/* <Buttons>
                    <Button></Button>
                </Buttons> */}
            </Bar>
        </Container>
    );
}

export default UserInformation;

