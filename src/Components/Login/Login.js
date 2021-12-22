import React, { useEffect } from 'react';
import styled from 'styled-components';
import { colorGreyBackground } from "../../Constants/Colors";
import Introduce from './Introduce';
import LoginByAvatar from './LoginByAvatar';
import LoginForm from './LoginForm';

const recentLogins = null;


export const Wrapper = styled.div`
    min-height: 100vh;
    padding: 150px 100px 100px 100px;
    background: ${colorGreyBackground};

    @media screen and (max-width: 900px){
        padding: 30px;
    }
`;

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;

    @media screen and (max-width: 900px){
        flex-direction: column;
        align-items: center;
    }
`;

function Login() {
    useEffect(() => {
        document.title = "Facebook - Log in";
    }, []);

    return (
        <Wrapper>
            <Container>
                {recentLogins ? <LoginByAvatar /> : <Introduce />}
                <LoginForm />
            </Container>
        </Wrapper>
    );
}

export default Login;
