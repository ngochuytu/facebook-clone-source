import React from 'react';
import styled from "styled-components";
import { colorGreySearchIcon } from "../../../../../Constants/Colors";

const Container = styled.p`
    color: ${colorGreySearchIcon};
    font-size: 1.2rem;
    font-weight: 700;
    padding: 20px;
    text-align: center;
`;

function SideBarItemNothingToShow({ text }) {
    return (
        <Container>{text}</Container>
    );
}



export default SideBarItemNothingToShow;
