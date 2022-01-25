import React, { useState } from 'react';
import { firebaseCollections } from "../../../../Constants/FireStoreNaming";
import Fields from "../Fields/Fields";
import { useAboutIconsContext } from "../Main";

function AboutWorkAndEducation() {
    const aboutWorkAndEducationFieldName = firebaseCollections.users.subCollections.about.documents.workAndEducation.documentField;
    const aboutWorkAndEducationDocumentName = firebaseCollections.users.subCollections.about.documents.workAndEducation.documentName;

    const { aboutIcons } = useAboutIconsContext();

    const [fields, setFields] = useState([
        {
            name: "Add a workplace",
            placeHolder: "Workplace",
            openInput: false,
            icon: aboutIcons[aboutWorkAndEducationDocumentName][aboutWorkAndEducationFieldName.workplace],
            fireStoreFieldName: aboutWorkAndEducationFieldName.workplace
        },
        {
            name: "Add a high school",
            placeHolder: "High school",
            openInput: false,
            icon: aboutIcons[aboutWorkAndEducationDocumentName][aboutWorkAndEducationFieldName.highSchool],
            fireStoreFieldName: aboutWorkAndEducationFieldName.highSchool
        },
        {
            name: "Add a university",
            placeHolder: "University",
            openInput: false,
            icon: aboutIcons[aboutWorkAndEducationDocumentName][aboutWorkAndEducationFieldName.university],
            fireStoreFieldName: aboutWorkAndEducationFieldName.university
        }
    ]);

    return (
        <Fields aboutName={aboutWorkAndEducationDocumentName} fields={fields} setFields={setFields} />
    );
}



export default AboutWorkAndEducation;
