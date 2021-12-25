import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContactItem from '../Item/Item';
import { ContactContainer as Container } from "../Main";
// import { Container } from '../SideBar/SideBar';
import { collection, getDocs } from '@firebase/firestore';
import { database } from '../../../../firebase';
import { useFireBaseAuthContext } from '../../../../Contexts/FireBaseAuthContext';
import AvatarPic from '../../../../Images/Avatar.png';
import { colorGreySearchIcon } from "../../../../Constants/Colors";
import { collectionNames } from "../../../../Constants/FireStoreNaming";

const Header = styled.div``;
const Title = styled.p`
    color: ${colorGreySearchIcon};
    font-size: 1.1rem;
    font-weight: 700;
    padding-left: 18px;
    margin-bottom: 10px;
`;
const ListContacts = styled.ul``;

export default function Contact() {
    const [users, setUsers] = useState([]);
    const { currentUser } = useFireBaseAuthContext();

    useEffect(() => {
        const getUsers = async () => {
            const users = [];
            const usersSnapshot = await getDocs(collection(database, collectionNames.users));
            usersSnapshot.forEach(user => {
                users.push(user.data());
            });
            return users;
        };

        getUsers().then(users => setUsers(users.filter(user => user.uid !== currentUser.uid)));
    }, [currentUser.uid]);

    return (
        <Container>
            <Header>
                <Title>Contacts</Title>
            </Header>
            <ListContacts>
                {users.length ? users.map(({ uid, photoURL, displayName }) => <ContactItem key={uid} img={photoURL || AvatarPic} title={displayName} url={`/${uid}`} />) : null}
            </ListContacts>
        </Container>
    );
}
