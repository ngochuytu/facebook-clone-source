import React from "react";
import styled from "styled-components";
import { backgroundColorGreyHeader, colorBlueHeaderCenter, colorGreyInput, colorGreyIconHeaderRight } from "../../../../Constants/Colors";

const Container = styled.div`
    background: ${backgroundColorGreyHeader};
    border-radius: 5px;
    padding: 10px 10px 10px 20px; //10px padding-right link
    min-height: 40px;
    margin-bottom: 10px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h3`
    color: ${colorGreyIconHeaderRight};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const Link = styled.a`
    color: ${colorBlueHeaderCenter};
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1.1rem;

    &:hover {
        background: ${colorGreyInput};
    }
`;

function SideBarItem({ title, linkName }) {
    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                {linkName ? <Link href="#">{linkName}</Link> : null}
            </Header>
        </Container>
    );
}

export default SideBarItem;
