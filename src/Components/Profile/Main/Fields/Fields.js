import React, { useEffect, useRef } from 'react';
import { useFireBaseAuthContext } from "../../../../Contexts/FireBaseAuthContext";
import { useUserProfileContext } from "../../Index";
import FieldAdd from "./FieldAdd";
import FieldEdit from "./FieldEdit";
import FieldInput from "./FieldInput";
import FieldItem from "./FieldItem";
import FieldTitle from "./FieldTitle";

function Fields({ aboutName, fields, setFields }) {
    const { userProfile } = useUserProfileContext();
    const { currentUser } = useFireBaseAuthContext();
    const lastOpenedFieldInputRef = useRef();
    //State fields pattern
    // [{
    //  fieldTitle: string, Optional, page overview k có    
    //  name: string, 
    //  placeHolder: string, 
    //  openInput: true/false, 
    //  value: string,
    //  fireStoreFieldName: string, 
    //  icon: Icon
    //}]

    const toggleFieldAddHandler = clickedFieldEditIndex => {
        setFields(fields.map((field, index) => {
            if (index === clickedFieldEditIndex)
                return {
                    ...field,
                    openInput: !field.openInput
                };

            return field;
        }));
    };

    useEffect(() => {
        const focusNewOpenFieldInput = () => {
            //Tránh lúc ấn cancel cũng gọi
            if (lastOpenedFieldInputRef.current)
                lastOpenedFieldInputRef.current.focus();
        };

        focusNewOpenFieldInput();
    }, fields.map(field => field.openInput));


    return (
        <>
            {currentUser.uid === userProfile.uid ?
                fields.map((field, index) => {
                    if (userProfile?.about?.[aboutName]?.[field.fireStoreFieldName]) {
                        if (field.openInput) {
                            return (
                                <FieldInput
                                    fields={fields}
                                    setFields={setFields}
                                    fieldPlaceHolder={field.placeHolder}
                                    fieldInputIndex={index}
                                    value={userProfile?.about?.[aboutName]?.[field.fireStoreFieldName]}
                                    toggleFieldAddHandler={() => toggleFieldAddHandler(index)}
                                    lastOpenedFieldInputRef={lastOpenedFieldInputRef}
                                    aboutName={aboutName}
                                />
                            );
                        }
                        else {
                            return (
                                <>
                                    {field.fieldTitle && <FieldTitle fieldTitle={field.fieldTitle} />}
                                    <FieldEdit
                                        icon={field.icon}
                                        fieldValue={userProfile?.about?.[aboutName]?.[field.fireStoreFieldName]}
                                        toggleFieldAddHandler={() => toggleFieldAddHandler(index)}
                                    />
                                </>
                            );
                        }
                    }
                    else {
                        if (field.openInput) {
                            return (
                                <FieldInput
                                    fields={fields}
                                    setFields={setFields}
                                    fieldPlaceHolder={field.placeHolder}
                                    fieldInputIndex={index}
                                    value={userProfile?.about?.[aboutName]?.[field.fireStoreFieldName]}
                                    toggleFieldAddHandler={() => toggleFieldAddHandler(index)}
                                    lastOpenedFieldInputRef={lastOpenedFieldInputRef}
                                    aboutName={aboutName}
                                />
                            );
                        }
                        else {
                            return (
                                <>
                                    {field.fieldTitle && <FieldTitle fieldTitle={field.fieldTitle} />}
                                    <FieldAdd
                                        fieldName={field.name}
                                        toggleFieldAddHandler={() => toggleFieldAddHandler(index)}
                                    />
                                </>
                            );
                        }
                    }
                })
                :

                fields.map(field =>
                    <>
                        {field.fieldTitle && <FieldTitle fieldTitle={field.fieldTitle} />}
                        <FieldItem
                            icon={field.icon}
                            fieldValue={userProfile?.about?.[aboutName]?.[field.fireStoreFieldName]}
                        />
                    </>
                )

            }
        </>
    );
}

export default Fields;
