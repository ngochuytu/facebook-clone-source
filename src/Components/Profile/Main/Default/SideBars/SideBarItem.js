import React from "react";
import SideBarTitle from "./SideBarTitle";
import styled from "styled-components";
import { colorGreyHeader, colorGreyIconHeaderRight } from "../../../../../Constants/Colors";


const Container = styled.div`
    background: ${colorGreyHeader};
    border-radius: 5px;
    padding: 15px 10px 10px 15px; /*Tổng = nhau */
    min-height: 40px;
    margin-bottom: 10px;
`;

const SideBarContent = styled.div`
    padding: 0px 5px 5px 0; /*Tổng = nhau */
    color: ${colorGreyIconHeaderRight};
`;


function SideBarItem({ title, linkName, path, content, children: nothingToShowComponent }) {
    return (
        <Container>
            <SideBarTitle title={title} linkName={linkName} path={path} />
            {nothingToShowComponent || <SideBarContent>{content}</SideBarContent>}
        </Container>
    );
}

export default SideBarItem;
