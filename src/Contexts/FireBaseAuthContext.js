import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from '@firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { collectionNames } from "../Constants/FireStoreNaming";

const FireBaseAuthContext = createContext();

export const useFireBaseAuthContext = () => {
    return useContext(FireBaseAuthContext);
};

export function FireBaseAuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const loginThirdParty = provider => signInWithPopup(auth, provider);
    const logout = () => signOut(auth);
    const resetPassword = email => sendPasswordResetEmail(auth, email);
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            //Update profile in authentication for the first time login/signup
            if (user?.displayName === null) {
                getDoc(doc(database, collectionNames.users, user?.uid))
                    .then(snapshot => {
                        const userFromDoc = snapshot.data();
                        updateProfile(user, {
                            photoURL: userFromDoc?.photoURL,
                            displayName: userFromDoc?.displayName
                        })
                            .then(() => setCurrentUser(user));
                    });
            }
            else {
                setCurrentUser(user);
            }
            setLoading(false);
        });
    }, []);

    const contextValue = { currentUser, signup, login, loginThirdParty, logout, resetPassword };
    return (
        <FireBaseAuthContext.Provider value={contextValue}>
            {!loading && children}
        </FireBaseAuthContext.Provider>
    );
}

