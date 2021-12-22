import React from "react";
import styled from "styled-components";
import SideBarItem from "./SideBarItem";

const Container = styled.div`
    flex-basis: 35%;
`;

function SideBar() {
    return (
        <Container>
            <SideBarItem title="Friends" linkName="See all" />
        </Container>
    );
}

export default SideBar;
