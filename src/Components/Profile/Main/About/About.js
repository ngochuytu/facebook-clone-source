import React from "react";
import { Link, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { colorGreyHeader, colorBlueHeaderCenter, colorGreyDisabledText, colorGreyIconHeaderRight, colorGreyInput, colorBlueHeaderRightActiveIcon } from "../../../../Constants/Colors";
import AboutContactAndBasicInfo from "./AboutContactAndBasicInfo";
import AboutDetailsAboutYou from "./AboutDetailsAboutYou";
import AboutFamilyAndRelationships from "./AboutFamilyAndRelationships";
import AboutOverView from "./AboutOverView";
import AboutPlacesLived from "./AboutPlacesLived";
import AboutWorkAndEducation from "./AboutWorkAndEducation";
import { breakPointMedium } from "../../../../Constants/BreakPoints";

const Container = styled.div`
    display: flex;
    background: ${colorGreyHeader};
    border-radius: 10px;

    @media screen and (max-width: ${breakPointMedium}){
        flex-direction: column;
    }
`;

const Navigation = styled.div`
    padding: 5px;
    border-right: 1px solid ${colorGreyInput};
    flex-basis: 30%;
    
    & > * {
        padding: 10px 10px;
    }

    @media screen and (max-width: ${breakPointMedium}){
        border-bottom: 1px solid ${colorGreyInput};
        border-right: none;
    }
`;

const Title = styled(Link)`
    color: ${colorGreyIconHeaderRight};
    font-size: 1.5rem;
    font-weight: 700;
`;

const TabItem = styled(Link)`
    border-radius: 7.5px;
    cursor: pointer;
    margin: 5px 0;
`;

const TabItemNonActive = styled(TabItem)`  
    color: ${colorGreyDisabledText};
        
    &:hover{
        background-color: ${colorGreyInput};
    }    
`;

const TabItemActive = styled(TabItem)`  
    color: ${colorBlueHeaderCenter};
    background-color: ${colorBlueHeaderRightActiveIcon};
`;

const AboutContent = styled.div`
    flex: 1;
    padding: 15px;
`;

const TAB_ITEMS = [
    {
        title: "Overview",
        path: "overview"
    },
    {
        title: "Work and education",
        path: "work_and_education"
    },
    {
        title: "Places lived",
        path: "places_lived"
    },
    {
        title: "Contact and basic info",
        path: "contact_and_basic_info"
    },
    {
        title: "Family and relationships",
        path: "family_and_relationships"
    },
    {
        title: "Details about you",
        path: "details_about_you"
    }
];


function About() {
    const { path, url } = useRouteMatch();
    const location = useLocation();
    return (
        <Container>
            <Navigation>
                <Title to={`${url}`}>About</Title>
                {
                    TAB_ITEMS.map((tabItem, index) => {
                        //Active theo path

                        //Trường hợp default overview
                        if (location.pathname.endsWith("about") && index === 0) {
                            return (
                                <TabItemActive
                                    key={tabItem.title}
                                    to={`${url}/${tabItem.path}`}
                                >
                                    {tabItem.title}
                                </TabItemActive>
                            );
                        }

                        if (location.pathname.includes(tabItem.path)) {
                            return (
                                <TabItemActive
                                    key={tabItem.title}
                                    to={`${url}/${tabItem.path}`}
                                >
                                    {tabItem.title}
                                </TabItemActive>
                            );
                        }
                        else {
                            return (
                                <TabItemNonActive
                                    key={tabItem.title}
                                    to={`${url}/${tabItem.path}`}
                                >
                                    {tabItem.title}
                                </TabItemNonActive>
                            );
                        }
                    })
                }
            </Navigation>
            <AboutContent>
                <Switch>
                    <Route exact path={`${path}/work_and_education`}>
                        <AboutWorkAndEducation />
                    </Route>
                    <Route exact path={`${path}/places_lived`}>
                        <AboutPlacesLived />
                    </Route>
                    <Route exact path={`${path}/contact_and_basic_info`}>
                        <AboutContactAndBasicInfo />
                    </Route>
                    <Route exact path={`${path}/family_and_relationships`}>
                        <AboutFamilyAndRelationships />
                    </Route>
                    <Route exact path={`${path}/details_about_you`}>
                        <AboutDetailsAboutYou />
                    </Route>
                    <Route path={`${path}`}>
                        <AboutOverView />
                    </Route>
                </Switch>
            </AboutContent>
        </Container>
    );
}

export default About;