import React, { createContext, useContext } from "react";
import styled from "styled-components";
import { colorGreyMain } from "../../../Constants/Colors";
import Default from "./Default/Default";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import Photos from "./Photos/Photos";
import About from "./About/About";
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GroupIcon from '@material-ui/icons/Group';
import { firebaseCollections } from "../../../Constants/FireStoreNaming";

const Container = styled.div`
    flex: 1;
    background: ${colorGreyMain};
    padding-top: 15px;
    padding-bottom: 15px;
`;

const AboutIconsContext = createContext();

export const useAboutIconsContext = () => useContext(AboutIconsContext);

function Main() {
    const { path } = useRouteMatch();
    const aboutDocuments = firebaseCollections.users.subCollections.about.documents;
    const workAndEducationFieldName = firebaseCollections.users.subCollections.about.documents.workAndEducation.documentField;
    const placesLivedFieldName = firebaseCollections.users.subCollections.about.documents.placesLived.documentField;
    const contactAndBasicInfoFieldName = firebaseCollections.users.subCollections.about.documents.contactAndBasicInfo.documentField;
    const familyAndRelationshipsFieldName = firebaseCollections.users.subCollections.about.documents.familyAndRelationships.documentField;
    const detailsAboutYouFieldName = firebaseCollections.users.subCollections.about.documents.detailsAboutYou.documentField;


    const aboutIcons = {
        [aboutDocuments.workAndEducation.documentName]: {
            [workAndEducationFieldName.workplace]: <WorkIcon />,
            [workAndEducationFieldName.highSchool]: <SchoolIcon />,
            [workAndEducationFieldName.university]: <SchoolIcon />,
        },
        [aboutDocuments.placesLived.documentName]: {
            [placesLivedFieldName.currentCity]: <HomeIcon />,
            [placesLivedFieldName.hometown]: <LocationOnIcon />,
        },
        [aboutDocuments.contactAndBasicInfo.documentName]: {
            [contactAndBasicInfoFieldName.email]: <EmailIcon />,
            [contactAndBasicInfoFieldName.mobile]: <PhoneIcon />,
            [contactAndBasicInfoFieldName.website]: <LinkIcon />,
        },
        [aboutDocuments.familyAndRelationships.documentName]: {
            [familyAndRelationshipsFieldName.relationship]: <FavoriteIcon />,
            [familyAndRelationshipsFieldName.familyMembers]: <GroupIcon />,
        },
        [aboutDocuments.detailsAboutYou.documentName]: {
            [detailsAboutYouFieldName.aboutYou]: <PersonIcon />,
            [detailsAboutYouFieldName.namePronunciation]: <RecordVoiceOverIcon />,
            [detailsAboutYouFieldName.otherName]: <BorderColorIcon />,
            [detailsAboutYouFieldName.favoriteQuotes]: <FormatQuoteIcon />,
        }
    };


    return (
        <Container>
            <Switch>
                <AboutIconsContext.Provider value={{ aboutIcons }}>
                    <Route exact path={path}>
                        <Default />
                    </Route>
                    <Route exact path={`${path}/photos`}>
                        <Photos />
                    </Route>
                    <Route path={`${path}/about`}>
                        <About />
                    </Route>
                </AboutIconsContext.Provider>
            </Switch>
        </Container>
    );
}

export default Main;
