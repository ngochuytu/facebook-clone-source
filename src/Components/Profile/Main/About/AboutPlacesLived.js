import React from 'react';
import { useState } from "react";
import { firebaseCollections } from "../../../../Constants/FireStoreNaming";
import Fields from "../Fields/Fields";
import { useAboutIconsContext } from "../Main";

function AboutPlacesLived() {
    const aboutPlacesLivedFieldName = firebaseCollections.users.subCollections.about.documents.placesLived.documentField;
    const aboutPlacesLivedDocumentName = firebaseCollections.users.subCollections.about.documents.placesLived.documentName;

    const { aboutIcons } = useAboutIconsContext();

    const [fields, setFields] = useState([
        {
            name: "Add current city",
            placeHolder: "Current city",
            openInput: false,
            icon: aboutIcons[aboutPlacesLivedDocumentName][aboutPlacesLivedFieldName.currentCity],
            fireStoreFieldName: aboutPlacesLivedFieldName.currentCity
        },
        {
            name: "Add hometown",
            placeHolder: "Hometown",
            openInput: false,
            icon: aboutIcons[aboutPlacesLivedDocumentName][aboutPlacesLivedFieldName.hometown],
            fireStoreFieldName: aboutPlacesLivedFieldName.hometown
        }
    ]);

    return (
        <Fields aboutName={aboutPlacesLivedDocumentName} fields={fields} setFields={setFields} />
    );
}

export default AboutPlacesLived;
