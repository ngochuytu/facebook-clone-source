import React from 'react';
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { colorGreyInput } from "../../../../../Constants/Colors";
import { firebaseCollections } from "../../../../../Constants/FireStoreNaming";
import FieldItem from "../../Fields/FieldItem";
import { useAboutIconsContext } from "../../Main";
import { useUserProfileContext } from "../../../Index";

const IntroButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 35px;
    border-radius: 5px;
    background: ${colorGreyInput};
    color: inherit;
    font-size: .9rem;
    font-weight: 700;
    cursor: pointer;

    &:hover{
        filter: brightness(1.1);
    }
`;

function SideBarItemIntro() {
    const { aboutIcons } = useAboutIconsContext();
    const { userProfile } = useUserProfileContext();

    const aboutCollectionName = firebaseCollections.users.subCollections.about.collectionName;
    const aboutDocuments = firebaseCollections.users.subCollections.about.documents;

    const aboutWorkAndEducationFieldName = aboutDocuments.workAndEducation.documentField;
    const aboutWorkAndEducationDocumentName = aboutDocuments.workAndEducation.documentName;

    const aboutPlacesLivedFieldName = aboutDocuments.placesLived.documentField;
    const aboutPlacesLivedDocumentName = aboutDocuments.placesLived.documentName;

    const aboutContactAndBasicInfoFieldName = aboutDocuments.contactAndBasicInfo.documentField;
    const aboutContactAndBasicInfoDocumentName = aboutDocuments.contactAndBasicInfo.documentName;

    const aboutFamilyAndRelationshipsFieldName = aboutDocuments.familyAndRelationships.documentField;
    const aboutFamilyAndRelationshipsDocumentName = aboutDocuments.familyAndRelationships.documentName;

    const { url } = useRouteMatch();

    return (
        <>
            {
                <>
                    <FieldItem icon={aboutIcons[aboutWorkAndEducationDocumentName][aboutWorkAndEducationFieldName.workplace]} fieldValue={userProfile?.[aboutCollectionName]?.[aboutWorkAndEducationDocumentName]?.[aboutWorkAndEducationFieldName.workplace]} />
                    <FieldItem icon={aboutIcons[aboutWorkAndEducationDocumentName][aboutWorkAndEducationFieldName.highSchool]} fieldValue={userProfile?.[aboutCollectionName]?.[aboutWorkAndEducationDocumentName]?.[aboutWorkAndEducationFieldName.highSchool]} />
                    <FieldItem icon={aboutIcons[aboutPlacesLivedDocumentName][aboutPlacesLivedFieldName.currentCity]} fieldValue={userProfile?.[aboutCollectionName]?.[aboutPlacesLivedDocumentName]?.[aboutPlacesLivedFieldName.currentCity]} />
                    <FieldItem icon={aboutIcons[aboutContactAndBasicInfoDocumentName][aboutContactAndBasicInfoFieldName.mobile]} fieldValue={userProfile?.[aboutCollectionName]?.[aboutContactAndBasicInfoDocumentName]?.[aboutContactAndBasicInfoFieldName.mobile]} />
                    <FieldItem icon={aboutIcons[aboutContactAndBasicInfoDocumentName][aboutContactAndBasicInfoFieldName.email]} fieldValue={userProfile?.[aboutCollectionName]?.[aboutContactAndBasicInfoDocumentName]?.[aboutContactAndBasicInfoFieldName.email]} />
                    <FieldItem icon={aboutIcons[aboutFamilyAndRelationshipsDocumentName][aboutFamilyAndRelationshipsFieldName.relationship]} fieldValue={userProfile?.[aboutCollectionName]?.[aboutFamilyAndRelationshipsDocumentName]?.[aboutFamilyAndRelationshipsFieldName.relationship]} />
                </>
            }
            <IntroButton to={`${url}/about`}>Edit details</IntroButton>
        </>
    );
}

export default SideBarItemIntro;
