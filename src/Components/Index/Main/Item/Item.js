import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { colorGreyIconHeaderRight, colorGreyInput } from "../../../../Constants/Colors";

const Container = styled.li`
    width: 95%;
    padding: 7.5px 8.5px;
    margin-left: 9.5px;
    border-radius: 10px;
    cursor: pointer;
     //For hover 

    &:hover{
        background: ${colorGreyInput};
    }
`;

const Image = styled.img`
    margin-right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
`;

const Title = styled.p`
    color: ${colorGreyIconHeaderRight};
    font-weight: 700;

`;

const LinkTo = styled(Link)`
    display: flex;
    align-items: center;
`;

function Item({ img, title, url }) {
    return (
        <Container>
            <LinkTo to={url}>
                <Image src={img} />
                <Title>{title}</Title>
            </LinkTo>
        </Container>
    );
}

export default Item;
