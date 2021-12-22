import React from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";
import styled from "styled-components";
import { backgroundColorGreyHeader, colorGreyInput } from "../../Constants/Colors";
import { headerSpacing } from "../../Constants/Spacing/Header";



const Container = styled.div`
    display: flex;
    align-items: center;
    height: ${headerSpacing.height};
    background: ${backgroundColorGreyHeader};
    padding: 0 ${headerSpacing.paddingHorizontal};
    border-bottom: 1px solid ${colorGreyInput};
    position: sticky;
    top: 0;
    z-index: 100;
`;

function Header() {
    return (
        <Container>
            <HeaderLeft />
            <HeaderCenter />
            <HeaderRight />
        </Container>
    );
}

export default Header;
