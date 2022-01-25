import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { database, storage } from "../../firebase";
import Error from "../Error/Error";
import Header from "../Header/Header";
import Main from "./Main/Main";
import UserInformation from "./UserInformation/UserInformation";
import { useParams } from "react-router";
import { colorGreyMain } from "../../Constants/Colors";
import { firebaseCollections } from "../../Constants/FireStoreNaming";
import { profileSpacing } from "../../Constants/Spacing/Profile";
import { breakPointLarge } from "../../Constants/BreakPoints";
import { getDownloadURL, ref, list } from "firebase/storage";
import { createContext } from "react";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${colorGreyMain};
`;

const WidthWrapper = styled.div`
    width: ${profileSpacing.width.default};
    margin: 0 auto;

    @media screen and (max-width: ${breakPointLarge}){
        width: ${profileSpacing.width.large};
    }
`;

const UserProfileContext = createContext();

export const useUserProfileContext = () => useContext(UserProfileContext);

export default function Profile() {
    const { uid: profileUid } = useParams();
    const [validUser, setValidUser] = useState(true);
    const [userProfile, setUserProfile] = useState({});

    const aboutDocuments = firebaseCollections.users.subCollections.about.documents;
    const usersCollectionName = firebaseCollections.users.collectionName;
    const aboutCollectionName = firebaseCollections.users.subCollections.about.collectionName;


    useEffect(() => {
        userProfile.displayName ? document.title = `Facebook | ${userProfile.displayName}` : document.title = "Facebook";
    }, [userProfile]);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const [
                    userSnapshot,
                    userAboutWorkAndEducation,
                    userAboutPlacesLived,
                    userAboutContactAndBasicInfo,
                    userAboutFamilyAndRelationships,
                    userAboutDetailsAboutYou,
                    photosList
                ] = await Promise.all([
                    getDoc(doc(database, usersCollectionName, profileUid)),
                    getDoc(doc(database, usersCollectionName, profileUid, aboutCollectionName, aboutDocuments.workAndEducation.documentName)),
                    getDoc(doc(database, usersCollectionName, profileUid, aboutCollectionName, aboutDocuments.placesLived.documentName)),
                    getDoc(doc(database, usersCollectionName, profileUid, aboutCollectionName, aboutDocuments.contactAndBasicInfo.documentName)),
                    getDoc(doc(database, usersCollectionName, profileUid, aboutCollectionName, aboutDocuments.familyAndRelationships.documentName)),
                    getDoc(doc(database, usersCollectionName, profileUid, aboutCollectionName, aboutDocuments.detailsAboutYou.documentName)),
                    list(ref(storage, `${profileUid}/images`), { maxResults: 9 })
                ]);

                const photoDownloadURLs = await Promise.all(photosList.items.map(photoRef => getDownloadURL(photoRef)));

                if (userSnapshot.exists()) {
                    setUserProfile({
                        ...userSnapshot.data(),
                        photos: photoDownloadURLs,
                        about: {
                            [aboutDocuments.workAndEducation.documentName]: userAboutWorkAndEducation.data(),
                            [aboutDocuments.placesLived.documentName]: userAboutPlacesLived.data(),
                            [aboutDocuments.contactAndBasicInfo.documentName]: userAboutContactAndBasicInfo.data(),
                            [aboutDocuments.familyAndRelationships.documentName]: userAboutFamilyAndRelationships.data(),
                            [aboutDocuments.detailsAboutYou.documentName]: userAboutDetailsAboutYou.data(),
                        }
                    });
                    setValidUser(true);
                }
                else {
                    setValidUser(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUserProfile();
    }, [profileUid]);

    return (
        <Container>
            <Header />
            {
                validUser ?
                    userProfile.uid ?
                        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
                            <UserInformation />
                            <WidthWrapper>
                                <Main profilePage={true} />
                            </WidthWrapper>
                        </UserProfileContext.Provider>
                        :
                        null
                    :
                    <Error />
            }
        </Container >
    );
}