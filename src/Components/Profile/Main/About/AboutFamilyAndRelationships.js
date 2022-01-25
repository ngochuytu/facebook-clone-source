import React, { useState } from 'react';
import { firebaseCollections } from "../../../../Constants/FireStoreNaming";
import Fields from "../Fields/Fields";
import { useAboutIconsContext } from "../Main";

function AboutFamilyAndRelationships() {
    const aboutFamilyAndRelationshipsFieldName = firebaseCollections.users.subCollections.about.documents.familyAndRelationships.documentField;
    const aboutFamilyAndRelationshipsDocumentName = firebaseCollections.users.subCollections.about.documents.familyAndRelationships.documentName;

    const { aboutIcons } = useAboutIconsContext();

    const [fields, setFields] = useState([
        {
            name: "Add a relationship status",
            placeHolder: "Relationship status",
            openInput: false,
            icon: aboutIcons[aboutFamilyAndRelationshipsDocumentName][aboutFamilyAndRelationshipsFieldName.relationship],
            fireStoreFieldName: aboutFamilyAndRelationshipsFieldName.relationship
        },
        {
            name: "Add a family member",
            placeHolder: "Family members",
            openInput: false,
            icon: aboutIcons[aboutFamilyAndRelationshipsDocumentName][aboutFamilyAndRelationshipsFieldName.familyMembers],
            fireStoreFieldName: aboutFamilyAndRelationshipsFieldName.familyMembers
        }
    ]);

    return (
        <Fields aboutName={aboutFamilyAndRelationshipsDocumentName} fields={fields} setFields={setFields} />
    );
}

export default AboutFamilyAndRelationships;
