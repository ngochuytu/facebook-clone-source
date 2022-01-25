import React from 'react';
import styled from "styled-components";
import FieldItem from "./FieldItem";
import EditIcon from '@material-ui/icons/Edit';
import { colorGreyIconHeaderRight, colorGreyInput } from "../../../../Constants/Colors";

const FieldEditContainer = styled.div`
    display: flex;
    align-items: flex-start;
    color: ${colorGreyIconHeaderRight};

    & > :first-child{
        flex: 1;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 999px;
    cursor: pointer;

    &:hover{
        background: ${colorGreyInput};
    }
`;

function FieldEdit({ icon, fieldValue, toggleFieldAddHandler }) {
    return (
        <FieldEditContainer>
            <FieldItem icon={icon} fieldValue={fieldValue} />
            <IconWrapper onClick={toggleFieldAddHandler}>
                <EditIcon />
            </IconWrapper>
        </FieldEditContainer>
    );
}

export default FieldEdit;
