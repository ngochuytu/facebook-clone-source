import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { headerSpacing } from "../../Constants/Spacing/Header";
import { colorGreyIconHeaderRight, colorGreyInput } from "../../Constants/Colors";


const Container = styled.li`
    width: calc(100% - 10px); /*-10px margin*/
    padding: 7.5px calc(${headerSpacing.paddingHorizontal});
    margin: 0 5px;
    border-radius: 10px;
    cursor: pointer;

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

function ListItem({ img, title, url }) {
    return (
        <Container>
            <LinkTo to={url}>
                <Image src={img} />
                <Title>{title}</Title>
            </LinkTo>
        </Container>
    );
}

export default ListItem;
