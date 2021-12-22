import styled from 'styled-components';
import React, { useEffect } from 'react';
import SignupForm from './SignupForm';
import { colorGreyBackground } from "../../Constants/Colors";


export const Container = styled.div`
    background: ${colorGreyBackground};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Signup() {
    useEffect(() => {
        document.title = "Facebook - Sign up";
    }, []);

    return (
        <Container>
            <SignupForm />
        </Container>
    );
}
