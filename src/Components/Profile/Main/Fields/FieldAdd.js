import React from 'react';
import styled from 'styled-components';
import { colorBlueHeaderCenter } from "../../../../Constants/Colors";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const FieldAddContainer = styled.div`
    display: flex;
    align-items: center;
    color: ${colorBlueHeaderCenter};
    margin-bottom: 15px;
    cursor: pointer;

    & > :first-child{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    &:hover{
        & > :last-child{
            text-decoration: underline;
        }
    }
`;

const FieldName = styled.p`
    padding-top: 3px;
    font-weight: 700;
`;

function FieldAdd({ fieldName, toggleFieldAddHandler }) {
    return (
        <FieldAddContainer onClick={toggleFieldAddHandler}>
            <AddCircleOutlineIcon />
            <FieldName>{fieldName}</FieldName>
        </FieldAddContainer>
    );
}

export default FieldAdd;
