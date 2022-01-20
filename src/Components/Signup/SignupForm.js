import React, { useState, useReducer } from 'react';
import { Form, Input, Message, Button, HorizontalLine, SignUp as Login } from '../Login/LoginForm';
import { useFireBaseAuthContext } from '../../Contexts/FireBaseAuthContext';
import styled from 'styled-components';
import { setDoc, doc } from 'firebase/firestore';
import { database } from '../../firebase';
import { firebaseCollections } from "../../Constants/FireStoreNaming";

const DisplayNameGroup = styled.div`
    display: flex;
    column-gap: 20px;
    width: 100%;
`;

const initialSignupState = {
    email: '',
    password: '',
    rePassword: '',
    firstName: '',
    lastName: ''
};

const reducer = (state, action) => {
    switch (action.name) {
        case "email":
            return { ...state, email: action.value };
        case "password":
            return { ...state, password: action.value };
        case "re-password":
            return { ...state, rePassword: action.value };
        case "first-name":
            return { ...state, firstName: action.value };
        case "last-name":
            return { ...state, lastName: action.value };
        default:
            return state;
    }
};


export default function SignupForm() {
    const [signUpState, dispatch] = useReducer(reducer, initialSignupState);
    const { email, password, rePassword, firstName, lastName } = signUpState;
    const [error, setError] = useState('');
    const { signup } = useFireBaseAuthContext();


    const inputHandler = e => {
        dispatch({ name: e.target.name, value: e.target.value });
    };

    const signUpHandler = async e => {
        e.preventDefault();
        setError("");

        if (email === "")
            return setError("Email can not be empty!");
        if (password === "")
            return setError("Password can not be empty!");
        if (password !== rePassword)
            return setError("Confirm Password incorrect!");
        if (firstName === "")
            return setError("First name can not be empty!");
        if (lastName === "")
            return setError("Last name can not be empty!");

        try {
            const { user } = await signup(email, password);
            const { uid, displayName, photoURL } = user;
            const { firstName, lastName } = signUpState;
            //Write user

            setDoc(doc(database, firebaseCollections.users.collectionName, uid), {
                uid: uid,
                displayName: `${firstName.trim()} ${lastName.trim()}` || displayName,
                photoURL: photoURL
            });
        }
        catch (error) {
            console.error(error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    return setError("This email is already in use!");
                case "auth/invalid-email":
                    return setError("This email is invalid!");
                case "auth/weak-password":
                    return setError("Password is too weak!");
                default:
                    return setError("Signup failed! Please try again");
            }
        }
    };

    return (
        <Form method="post">
            <Input type="text" name="email" placeholder="Email address or phone number" value={email} onInput={inputHandler} />
            <Input type="password" name="password" placeholder="Password" value={password} onInput={inputHandler} />
            <Input type="password" name="re-password" placeholder="Confirm Password" value={rePassword} onInput={inputHandler} />
            <DisplayNameGroup>
                <Input type="text" name="first-name" placeholder="First Name" value={firstName} onInput={inputHandler} />
                <Input type="text" name="last-name" placeholder="Last Name" value={lastName} onInput={inputHandler} />
            </DisplayNameGroup>
            {error ? <Message type="error">{error}</Message> : null}
            <Button onClick={signUpHandler}>Sign Up</Button>
            <HorizontalLine />
            <Login to="/login">Log in</Login>
        </Form>
    );
}
