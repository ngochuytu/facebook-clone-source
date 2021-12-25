import React, { useEffect } from 'react';
import styled from 'styled-components';
import { breakPointLarge } from "../../Constants/BreakPoints";
import { colorGreyBackground } from "../../Constants/Colors";
import Introduce from './Introduce';
import LoginByAvatar from './LoginByAvatar';
import LoginForm from './LoginForm';


const recentLogins = null;


export const Wrapper = styled.div`
    min-height: 100vh;
    background: ${colorGreyBackground};
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: ${breakPointLarge}){
        padding: 0px;
    }
`;

const Container = styled.div`
    max-width: 1000px;
    display: flex;
    align-items: flex-start;
    padding: 0 30px;

    @media screen and (max-width: ${breakPointLarge}){
        flex-direction: column;
        align-items: center;
        padding: 0;
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
