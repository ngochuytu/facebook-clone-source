import React, { useState } from 'react';
import { firebaseCollections } from "../../../../Constants/FireStoreNaming";
import Fields from "../Fields/Fields";
import { useAboutIconsContext } from "../Main";


function AboutDetailsAboutYou() {
    const aboutDetailsAboutYouFieldName = firebaseCollections.users.subCollections.about.documents.detailsAboutYou.documentField;
    const aboutDetailsAboutYouDocumentName = firebaseCollections.users.subCollections.about.documents.detailsAboutYou.documentName;

    const { aboutIcons } = useAboutIconsContext();

    const [fields, setFields] = useState([
        {
            fieldTitle: "About You",
            name: "Write some details about yourself",
            placeHolder: "About You",
            openInput: false,
            icon: aboutIcons[aboutDetailsAboutYouDocumentName][aboutDetailsAboutYouFieldName.aboutYou],
            fireStoreFieldName: aboutDetailsAboutYouFieldName.aboutYou
        },
        {
            fieldTitle: "Name pronunciation",
            name: "Add a name pronunciation",
            placeHolder: "Name pronunciation",
            openInput: false,
            icon: aboutIcons[aboutDetailsAboutYouDocumentName][aboutDetailsAboutYouFieldName.namePronunciation],
            fireStoreFieldName: aboutDetailsAboutYouFieldName.namePronunciation
        },
        {
            fieldTitle: "Other names",
            name: "Add a nickname",
            placeHolder: "Other names",
            openInput: false,
            icon: aboutIcons[aboutDetailsAboutYouDocumentName][aboutDetailsAboutYouFieldName.otherName],
            fireStoreFieldName: aboutDetailsAboutYouFieldName.otherName
        },
        {
            fieldTitle: "Favorite Quotes",
            name: "Add your favorite quotations",
            placeHolder: "Favorite Quotes",
            openInput: false,
            icon: aboutIcons[aboutDetailsAboutYouDocumentName][aboutDetailsAboutYouFieldName.favoriteQuotes],
            fireStoreFieldName: aboutDetailsAboutYouFieldName.favoriteQuotes
        },
    ]);

    return (
        <Fields aboutName={aboutDetailsAboutYouDocumentName} fields={fields} setFields={setFields} />
    );
}

export default AboutDetailsAboutYou;
