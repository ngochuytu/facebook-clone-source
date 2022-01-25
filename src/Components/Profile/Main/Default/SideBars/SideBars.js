import React from 'react';
import styled from "styled-components";
import { breakPointMedium } from "../../../../../Constants/BreakPoints";
import { useUserProfileContext } from "../../../Index";
import SideBarItem from "./SideBarItem";
import SideBarItemGridImages from "./SideBarItemGridImages";
import SideBarItemIntro from "./SideBarItemIntro";


const Container = styled.div`
    margin-right: 20px;

    @media screen and (max-width: ${breakPointMedium}){
        margin-right: 0;
    }
`;

function SideBars() {
    const { userProfile } = useUserProfileContext();

    return (
        <Container>
            <SideBarItem title="Intro" path="about" content={<SideBarItemIntro />} />
            <SideBarItem title="Photos" linkName="See All Photos" path="photos" content={<SideBarItemGridImages photos={userProfile.photos} imagesPerRow={3} />} />
        </Container>
    );
}

export default SideBars;
