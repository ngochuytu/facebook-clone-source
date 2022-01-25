import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorBlueHeaderCenter, colorGreyInput, colorGreyIconHeaderRight } from "../../../../../Constants/Colors";

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    margin-bottom: 10px;
`;

const TitleLink = styled(Link)`
    color: ${colorGreyIconHeaderRight};
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    &:hover {
        text-decoration: underline;
    }
`;

const ButtonLink = styled(Link)`
    color: ${colorBlueHeaderCenter};
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1rem;

    &:hover {
        background: ${colorGreyInput};
    }
`;

function SideBarTitle({ title, linkName, path }) {
    const { url } = useRouteMatch();
    return (
        <Header>
            <TitleLink to={`${url}/${path}`}>{title}</TitleLink>
            {linkName ? <ButtonLink to={`${url}/${path}`}>{linkName}</ButtonLink> : null}
        </Header>
    );
}

export default SideBarTitle;
