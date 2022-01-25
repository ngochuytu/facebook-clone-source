import React from 'react';
import styled from "styled-components";
import { colorGreyIconHeaderRight, colorGreySearchIcon } from "../../../../Constants/Colors";

const FieldItemContainer = styled.div`
    margin-bottom: 20px;
    display: flex;

    & > :first-child{
        color: ${colorGreySearchIcon};
    }
`;

const FieldValue = styled.p`
    margin: 0 10px 0 15px;
    position: relative;
    top: 5px;
    color: ${colorGreyIconHeaderRight};
    word-break: break-all;
`;

function FieldItem({ icon, fieldValue }) {
    return (
        <FieldItemContainer>
            {icon}
            <FieldValue>{fieldValue || "No information"}</FieldValue>
        </FieldItemContainer>
    );
}

export default FieldItem;
