import React from 'react';
import styled from "styled-components";
import { colorGreyIconHeaderRight } from "../../../../Constants/Colors";

const Title = styled.p`
    color: ${colorGreyIconHeaderRight};
    font-size: 18px;
    margin-bottom: 12.5px;
`;


function FieldTitle({ fieldTitle }) {
    return <Title>{fieldTitle}</Title>;
}

export default FieldTitle;
