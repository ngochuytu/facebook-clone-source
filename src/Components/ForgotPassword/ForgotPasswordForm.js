import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorBlue } from "../../Constants/Colors";
import { useFireBaseAuthContext } from "../../Contexts/FireBaseAuthContext";
import { Button, Message, Form, HorizontalLine, Input } from "../Login/LoginForm";

const Buttons = styled.div`
    width: 100%;
`;

const Cancel = styled(Link)`
    color: ${colorBlue};
`;
function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState({ error: '', success: '' });
    const { resetPassword } = useFireBaseAuthContext();

    const emailInputHandler = e => setEmail(e.target.value);

    const searchButtonClickHandler = async e => {
        e.preventDefault();
        setMessages({ error: "", success: "" });

        if (!email)
            return setMessages({ ...messages, error: "Email can not be empty!" });


        try {
            await resetPassword(email);
            setMessages({ ...messages, success: "Please check your mailbox for instruction, it might be in spam folder." });
        }
        catch (error) {
            switch (error.code) {
                case "auth/invalid-email":
                    return setMessages({ ...messages, error: "This email is invalid!" });
                case "auth/user-not-found":
                    return setMessages({ ...messages, error: "Email not found!" });
                default:
                    break;
            }
        }

    };

    return (
        <Form method="POST">
            <h2>Find Your Account</h2>
            <HorizontalLine />
            <p style={{ 'margin-bottom': "15px" }}>Please enter your email address or mobile number to search for your account.</p>
            <Input placeholder='Email' type='text' name='email' value={email} onInput={emailInputHandler} />
            {messages.error ? <Message type="error">{messages.error}</Message> : null}
            {messages.success ? <Message type="success">{messages.success}</Message> : null}
            <HorizontalLine />
            <Buttons>
                <Button onClick={searchButtonClickHandler}>Search</Button>
            </Buttons>
            <Cancel to='/login'>Cancel</Cancel>
        </Form >
    );
}

export default ForgotPasswordForm;
