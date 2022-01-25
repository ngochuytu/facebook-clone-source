import React, { useState } from 'react';
import Fields from "../Fields/Fields";
import { firebaseCollections } from "../../../../Constants/FireStoreNaming";
import { useAboutIconsContext } from "../Main";


function AboutOverView() {
    const { aboutIcons } = useAboutIconsContext();

    const aboutWorkAndEducationFieldName = firebaseCollections.users.subCollections.about.documents.workAndEducation.documentField;
    const aboutWorkAndEducationDocumentName = firebaseCollections.users.subCollections.about.documents.workAndEducation.documentName;

    const aboutPlacesLivedFieldName = firebaseCollections.users.subCollections.about.documents.placesLived.documentField;
    const aboutPlacesLivedDocumentName = firebaseCollections.users.subCollections.about.documents.placesLived.documentName;

    const aboutContactAndBasicInfoFieldName = firebaseCollections.users.subCollections.about.documents.contactAndBasicInfo.documentField;
    const aboutContactAndBasicInfoDocumentName = firebaseCollections.users.subCollections.about.documents.contactAndBasicInfo.documentName;

    const aboutFamilyAndRelationshipsFieldName = firebaseCollections.users.subCollections.about.documents.familyAndRelationships.documentField;
    const aboutFamilyAndRelationshipsDocumentName = firebaseCollections.users.subCollections.about.documents.familyAndRelationships.documentName;



    const [aboutWorkAndEducationFields, setAboutWorkAndEducationFields] = useState([
        {
            name: "Add a workplace",
            placeHolder: "Workplace",
            openInput: false,
            icon: aboutIcons[aboutWorkAndEducationDocumentName][aboutWorkAndEducationFieldName.workplace],
            fireStoreFieldName: aboutWorkAndEducationFieldName.workplace,
        },
        {
            name: "Add a high school",
            placeHolder: "High school",
            openInput: false,
            icon: aboutIcons[aboutWorkAndEducationDocumentName][aboutWorkAndEducationFieldName.highSchool],
            fireStoreFieldName: aboutWorkAndEducationFieldName.highSchool,
        }
    ]);

    const [aboutPlacesLivedFields, setAboutPlacesLivedFields] = useState([
        {
            name: "Add current city",
            placeHolder: "City",
            openInput: false,
            icon: aboutIcons[aboutPlacesLivedDocumentName][aboutPlacesLivedFieldName.currentCity],
            fireStoreFieldName: aboutPlacesLivedFieldName.currentCity,
            documentName: aboutPlacesLivedDocumentName,
        }
    ]);

    const [aboutContactAndBasicInfoFields, setAboutContactAndBasicInfoFields] = useState([
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
    ]);

    const [aboutFamilyAndRelationshipsFields, setAboutFamilyAndRelationshipsFields] = useState([
        {
            name: "Add a relationship status",
            placeHolder: "Relationship status",
            openInput: false,
            icon: aboutIcons[aboutFamilyAndRelationshipsDocumentName][aboutFamilyAndRelationshipsFieldName.relationship],
            fireStoreFieldName: aboutFamilyAndRelationshipsFieldName.relationship
        }
    ]);




    return (
        <>
            {
                <>
                    <Fields aboutName={aboutWorkAndEducationDocumentName} fields={aboutWorkAndEducationFields} setFields={setAboutWorkAndEducationFields} />
                    <Fields aboutName={aboutPlacesLivedDocumentName} fields={aboutPlacesLivedFields} setFields={setAboutPlacesLivedFields} />
                    <Fields aboutName={aboutContactAndBasicInfoDocumentName} fields={aboutContactAndBasicInfoFields} setFields={setAboutContactAndBasicInfoFields} />
                    <Fields aboutName={aboutFamilyAndRelationshipsDocumentName} fields={aboutFamilyAndRelationshipsFields} setFields={setAboutFamilyAndRelationshipsFields} />
                </>
            }
        </>
    );
}

export default AboutOverView;
