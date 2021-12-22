import React from 'react';
import styled from 'styled-components';
import { database, googleAuthProvider } from '../../firebase';
import { useFireBaseAuthContext } from '../../Contexts/FireBaseAuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { collectionNames } from "../../Constants/FireStoreNaming";
import { useHistory } from "react-router";



const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    background: rgb(66,133,244);
    border: 1px solid rgb(66,133,244);
    color: white;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0 2px 1px rgba(66,133,244,.5);
    }
`;

const Image = styled.img`
    width: 45px;
    height: 35px;
    background: white;
`;

const Title = styled.p` 
    flex: 1;
    text-align: center;
`;

export default function ThirdPartyLogin({ img, title, thirdPartyName, setError }) {
    const { loginThirdParty } = useFireBaseAuthContext();
    const history = useHistory();
    const thirdPartyLoginHandler = async (e) => {
        switch (thirdPartyName) {
            case "GOOGLE":
                try {
                    const { user } = await loginThirdParty(googleAuthProvider);
                    const { uid, displayName, photoURL } = user;
                    //Add user to db if not exits
                    const docExits = (await getDoc(doc(database, collectionNames.users, user.uid))).exists();
                    if (!docExits) {
                        await setDoc(doc(database, collectionNames.users, uid), {
                            uid: uid,
                            displayName: displayName,
                            photoURL: photoURL
                        });
                    }
                    history.push("/");
                } catch (error) {
                    if (error.code !== "auth/popup-closed-by-user")
                        setError("Sign in failed");
                }
                break;
            default:
                break;
        }
    };
    return (
        <Container onClick={thirdPartyLoginHandler}>
            <Image src={img} />
            <Title>{title}</Title>
        </Container>
    );
}
