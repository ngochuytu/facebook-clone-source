import React, { useState } from 'react';
import { firebaseCollections } from "../../../../Constants/FireStoreNaming";
import Fields from "../Fields/Fields";
import { useAboutIconsContext } from "../Main";



function AboutContactAndBasicInfo() {
    const aboutContactAndBasicInfoFieldName = firebaseCollections.users.subCollections.about.documents.contactAndBasicInfo.documentField;
    const aboutContactAndBasicInfoDocumentName = firebaseCollections.users.subCollections.about.documents.contactAndBasicInfo.documentName;

    const { aboutIcons } = useAboutIconsContext();

    const [fields, setFields] = useState([
        {
            name: "Add phone number",
            placeHolder: "Mobile",
            openInput: false,
            icon: aboutIcons[aboutContactAndBasicInfoDocumentName][aboutContactAndBasicInfoFieldName.mobile],
            fireStoreFieldName: aboutContactAndBasicInfoFieldName.mobile
        },
        {
            name: "Add email address",
            placeHolder: "Email address",
            openInput: false,
            icon: aboutIcons[aboutContactAndBasicInfoDocumentName][aboutContactAndBasicInfoFieldName.email],
            fireStoreFieldName: aboutContactAndBasicInfoFieldName.email
        },
        {
            name: "Add a website",
            placeHolder: "Website",
            openInput: false,
            icon: aboutIcons[aboutContactAndBasicInfoDocumentName][aboutContactAndBasicInfoFieldName.website],
            fireStoreFieldName: aboutContactAndBasicInfoFieldName.website
        },
    ]);

    return (
        <Fields aboutName={aboutContactAndBasicInfoDocumentName} fields={fields} setFields={setFields} />
    );
}

export default AboutContactAndBasicInfo;
