import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { database } from "../../firebase";
import Error from "../Error/Error";
import Header from "../Header/Header";
import Main from "./Main/Main";
import UserInformation from "./UserInformation/UserInformation";
import { Route, useParams } from "react-router";
import { colorGreyMain } from "../../Constants/Colors";
import { collectionNames } from "../../Constants/FireStoreNaming";
import { profileSpacing } from "../../Constants/Spacing/Profile";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${colorGreyMain};
`;

const WidthWrapper = styled.div`
    width: ${profileSpacing.width};
    margin: 0 auto;
`;

export default function Profile() {
    const location = useLocation();
    const profileUid = location.pathname.substring(1);

    const [validUser, setValidUser] = useState(true);
    const [profileUser, setProfileUser] = useState({});
    const params = useParams();


    useEffect(() => {
        profileUser.displayName ? document.title = `Facebook | ${profileUser.displayName}` : document.title = "Facebook";
    }, [profileUser]);

    useEffect(() => {
        const getProfileUser = async () => {
            try {
                const snapshot = await getDoc(doc(database, collectionNames.users, profileUid));
                if (snapshot.exists()) {
                    setProfileUser(snapshot.data());
                    setValidUser(true);
                }
                else {
                    setValidUser(false);

                }
            } catch (error) {
                console.error(error);
            }
        };

        getProfileUser();
    }, [profileUid]);

    return (
        <Container>
            <Header />
            {
                validUser ?
                    profileUser.uid ?
                        <>
                            <UserInformation profileUid={profileUid} profileUser={profileUser} setProfileUser={setProfileUser} />
                            <WidthWrapper>
                                <Route exact path={`/${params.uid}`}>
                                    <Main profilePage={true} profileUser={profileUser} />
                                </Route>
                            </WidthWrapper>
                        </>
                        :
                        null
                    :
                    <Error />
            }
        </Container>
    );
}