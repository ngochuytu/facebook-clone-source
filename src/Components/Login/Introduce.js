import React from 'react'
import facebookSvg from '../../Images/Login/facebook-logo.svg'
import styled from 'styled-components'
import { Container, Facebook } from './LoginByAvatar'

const Content = styled.p`
    font-size: 1.5rem;
`

function Introduce() {
    return (
        <Container>
            <Facebook src={facebookSvg} />
            <Content>Facebook helps you connect and share with the people in your life.</Content>
        </Container>
    )
}

export default Introduce
