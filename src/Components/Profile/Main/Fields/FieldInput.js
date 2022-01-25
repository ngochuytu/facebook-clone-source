import React, { useState } from 'react';
import styled from "styled-components";
import { colorBlueActiveButton, colorBlueHeaderCenter, colorGreyDisabledButton, colorGreyDisabledText, colorGreyIconHeaderRight, colorGreyInput } from "../../../../Constants/Colors";
import { database } from "../../../../firebase";
import { firebaseCollections } from "../../../../Constants/FireStoreNaming";
import { useFireBaseAuthContext } from "../../../../Contexts/FireBaseAuthContext";
import { setDoc, doc } from 'firebase/firestore';
import { useUserProfileContext } from "../../Index";

const FieldInputContainer = styled.div`

`;

const InputSection = styled.div`
    position: relative;
    margin-bottom: 20px;
    color: ${colorGreyDisabledText};
`;

const FieldName = styled.span`
    position: absolute; 
    left: 17px;
    transition: all 200ms linear;
    pointer-events: none;

    ${props => props.focus ?
        `
            top: 8.5px;
            font-size: 12px;
            color: ${colorBlueHeaderCenter};
        `
        :
        props.value ?
            `
                top: 8.5px;
                font-size: 12px;
                color: ${colorGreyDisabledText};
            `
            :
            `
                top: 50%;
                transform: translateY(-50%);
            `
    }
`;

const Input = styled.input`
    width: 100%;
    height: 60px;
    padding: 10px 15px 0px 15px;
    border: 1px solid ${colorGreyInput};
    border-radius: 5px;
    outline: none;
    background: transparent;
    color: ${colorGreyIconHeaderRight};
    font-size: 16px;

    &:hover{
        border-color: ${colorGreyDisabledText};
    }

    &:focus{
        border-color: ${colorBlueHeaderCenter};
    }
`;

const Buttons = styled.div`
    border-top: 1px solid ${colorGreyInput};    
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;

    & > * {
        padding: 5px 10px;
        height: 40px;
        border-radius: 5px;
        font-weight: 700;
        font-size: 15px;
        margin-left: 5px;
    }
`;

const CancelButton = styled.button`
    background: ${colorGreyInput};
    color: ${colorGreyIconHeaderRight};
    cursor: pointer;

    &:hover{
        background: ${colorGreyDisabledButton};
    }
`;

const SaveButton = styled.button`
    cursor: ${props => props.valid ? "pointer" : "no-drop"};
    background: ${props => props.valid ? colorBlueActiveButton : colorGreyDisabledButton};
    color: ${props => props.valid ? "rgb(255,255,255)" : colorGreyDisabledText};
`;


function FieldInput({ aboutName, fields, fieldInputIndex, value, toggleFieldAddHandler, fieldPlaceHolder, lastOpenedFieldInputRef }) {
    const { userProfile, setUserProfile } = useUserProfileContext();
    const [isInputSectionFocus, setIsInputSectionFocus] = useState(false);
    const [fieldInputValue, setFieldInputValue] = useState(value);

    const { currentUser } = useFireBaseAuthContext();

    const inputSectionFocusHandler = () => setIsInputSectionFocus(true);

    const inputSectionBlurHandler = () => setIsInputSectionFocus(false);

    const fieldInputChangeHandler = e => setFieldInputValue(e.target.value);

    const inputValidation = () => {
        if (value === fieldInputValue)
            return false;

        return true;
    };

    const saveButtonClickHandler = async (e) => {
        e.preventDefault();
        if (inputValidation()) {
            //Database
            const currentField = fields[fieldInputIndex];
            setDoc(doc(database, firebaseCollections.users.collectionName, currentUser.uid, firebaseCollections.users.subCollections.about.collectionName, firebaseCollections.users.subCollections.about.documents[aboutName].documentName), {
                [currentField.fireStoreFieldName]: fieldInputValue
            }, { merge: true });

            //Client
            setUserProfile({
                ...userProfile,
                about: {
                    ...userProfile.about,
                    [aboutName]: {
                        ...userProfile.about[aboutName],
                        [currentField.fireStoreFieldName]: fieldInputValue
                    }
                }
            });

            toggleFieldAddHandler();
        }
    };

    return (
        <FieldInputContainer>
            <InputSection onFocus={inputSectionFocusHandler} onBlur={inputSectionBlurHandler}>
                <FieldName focus={isInputSectionFocus} value={fieldInputValue}>{fieldPlaceHolder}</FieldName>
                <Input ref={lastOpenedFieldInputRef} value={fieldInputValue} onInput={fieldInputChangeHandler} spellCheck="false" />
            </InputSection>
            <Buttons>
                <CancelButton onClick={toggleFieldAddHandler}>Cancel</CancelButton>
                <SaveButton valid={inputValidation()} onClick={saveButtonClickHandler}>Save</SaveButton>
            </Buttons>
        </FieldInputContainer>
    );
}

export default FieldInput;
