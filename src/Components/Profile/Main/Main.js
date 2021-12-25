import React from "react";
import SideBar from "./SideBar/SideBar";
import styled from "styled-components";
import Feed from "../../Index/Main/NewsFeed/Feed/Feed";
import { colorGreyMain } from "../../../Constants/Colors";
import { breakPointMedium } from "../../../Constants/BreakPoints";

const Container = styled.div`
    flex: 1;
    display: flex;
    background: ${colorGreyMain};
    padding-top: 15px;
    padding-bottom: 15px;

    & > :last-child{
        flex: 1;
        margin-left: 20px;
    }

    @media screen and (max-width: ${breakPointMedium}){
        flex-direction: column;

        & > :last-child{
            flex: 1;
            margin-left: 0;
        }
    }
`;

function Main({ profileUser }) {
    return (
        <Container>
            <div>
                <SideBar />
                <SideBar />
                <SideBar />

            </div>
            <Feed profilePage={true} profileUser={profileUser} />
        </Container>
    );
}

export default Main;
