import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useFireBaseAuthContext } from '../../Contexts/FireBaseAuthContext';
import google from '../../Images/Login/google.png';
import ThirdPartyLogin from './ThirdPartyLogin';
import { colorBlue } from "../../Constants/Colors";
import { loginFormSpacing } from "../../Constants/Spacing/LoginForm";
import { breakPointMedium, breakPointVerySmall } from "../../Constants/BreakPoints";


const colorGreyBorder = `#dddfe2`;
const borderRadius = `5px`;

export const Form = styled.form`
    width: ${loginFormSpacing.width.large};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 15px 25px 15px;
    background: #fff;
    border: none;
    border-radius: ${borderRadius};
    box-shadow: 0 0 3px -0.5px #000;

    @media screen and (max-width: ${breakPointMedium}){
        & > *{
            font-size: 16px !important;
        }
    }

    @media screen and (max-width: ${breakPointVerySmall}){
        width: ${loginFormSpacing.width.verySmall};
    }
`;

export const Input = styled.input`
    width: 100%;
    height: 50px;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid ${colorGreyBorder};
    border-radius: ${borderRadius};
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder{
        font-size: 1rem;
        color: #8e8e8e;
    }
`;

export const Message = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: ${props => props.type === "error" ? 'rgba(255,0,0,.7)' : "#42b72a"};
    padding: 5px 25px;
    min-height: 40px;
    border-radius: ${borderRadius};
    margin-bottom: 10px;
`;

export const Button = styled.button`
    width: 100%;
    height: 45px;
    margin-bottom: 15px;
    background: ${colorBlue};
    color: white;
    font-size: 1.25rem;
    font-weight: 700;
    border-radius: ${borderRadius};
    cursor: pointer;
    &:hover{
        filter: brightness(.95);
    }
`;

export const ForgotPassword = styled(Link)`
    color: ${colorBlue};
    font-size: .9rem;
`;

export const HorizontalLine = styled.div`
    width: 100%;
    height: 1px;
    background: ${colorGreyBorder};
    margin: 20px 0 25px 0;
`;

export const SignUp = styled(Link)`
    width: 200px;
    height: 45px;
    padding: 0 10px;
    background: #42b72a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${borderRadius};
    font-weight: 700;
    color: #fff;
    &:hover{
        filter: brightness(.95);
    }
`;

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useFireBaseAuthContext();
    const history = useHistory();

    const handleInput = e => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
        }
    };

    const logInHandler = async e => {
        e.preventDefault();
        setError("");

        if (email === "")
            return setError("Email can not be empty!");
        if (password === "")
            return setError("Password can not be empty!");

        try {
            await login(email, password);
            history.push("/");
        }
        catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    setError("Wrong password!");
                    break;
                case "auth/user-not-found":
                    setError("Wrong email!");
                    break;
                default:
                    setError("Login failed! Please try again!");
                    console.error(error);
                    break;
            }
        }
    };


    return (
        <Form method="post">
            <Input type="text" name="email" placeholder="Email address or phone number" value={email} onInput={handleInput} />
            <Input type="password" name="password" placeholder="Password" value={password} onInput={handleInput} />
            {error ? <Message type="error">{error}</Message> : null}
            <Button onClick={logInHandler}>Log In</Button>
            <ForgotPassword to='/reset-password'>Forgotten Password?</ForgotPassword>
            <HorizontalLine />
            <ThirdPartyLogin img={google} title="Log in with Google" thirdPartyName="GOOGLE" setError={setError} />
            <SignUp to="/signup">Create New Account</SignUp>
        </Form>
    );
}

export default LoginForm;
