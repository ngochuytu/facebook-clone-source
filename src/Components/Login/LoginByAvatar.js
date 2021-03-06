import React from 'react';
import styled from 'styled-components';
import { loginFormSpacing } from "../../Constants/Spacing/LoginForm";
import facebookSvg from '../../Images/Login/facebook-logo.svg';
import { breakPointLarge, breakPointVerySmall } from "../../Constants/BreakPoints";


export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 40px;

    @media screen and (max-width: ${breakPointLarge}){
        align-items: center;
        margin: 0 0 40px 0;
        width: ${loginFormSpacing.width.large};
        text-align: center;
    }

    @media screen and (max-width: ${breakPointVerySmall}){
        width: ${loginFormSpacing.width.verySmall};
    }
`;

const Header = styled.div``;

export const Facebook = styled.img`
    width: 200px;
    margin-left: -20px;


    @media screen and (max-width: ${breakPointLarge}){
        width: 250px;
        margin: 0 auto;
    }
`;

const RecentLogins = styled.p`
    font-size: 1.75rem;
`;

const Description = styled.p`
    color: rgba(0,0,0,.5);
`;

const Avatars = styled.div``;

function LoginByAvatar() {
    return (
        <Container>
            <Header>
                <Facebook src={facebookSvg} />
                <RecentLogins>Recent logins</RecentLogins>
                <Description>Click your picture or add an account.</Description>
            </Header>
            <Avatars>
                {/* Avatars */}
            </Avatars>
        </Container>
    );
}

export default LoginByAvatar;
