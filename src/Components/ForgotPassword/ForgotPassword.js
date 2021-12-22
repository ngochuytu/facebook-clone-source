import React, { useEffect } from 'react';
import { Container } from '../Signup/Signup';
import ForgotPasswordForm from "./ForgotPasswordForm";

function ForgotPassword() {
    useEffect(() => {
        document.title = "Facebook - Forgotten password";
    }, []);

    return (
        <Container Container >
            <ForgotPasswordForm />
        </Container >
    );
}

export default ForgotPassword;
