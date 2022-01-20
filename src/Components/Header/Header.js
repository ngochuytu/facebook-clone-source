import React from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";
import styled from "styled-components";
import { colorGreyHeader, colorGreyInput } from "../../Constants/Colors";
import { headerSpacing } from "../../Constants/Spacing/Header";
import { breakPointLarge, breakPointMedium } from "../../Constants/BreakPoints";

const Container = styled.div`
    display: flex;
    align-items: center;
    height: ${headerSpacing.height};
    background: ${colorGreyHeader};
    padding: 0 ${headerSpacing.paddingHorizontal};
    border-bottom: 1px solid ${colorGreyInput};
    position: sticky;
    top: 0;
    z-index: 2;

    & > *{
        flex: 1;
    }

    @media screen and (max-width: ${breakPointLarge}){        
        & > :first-child{
            flex: 0;
        }

        & > :nth-child(2){
            flex: 2;
        }
    }

    @media screen and (max-width: ${breakPointMedium}){
        & > :first-child{
            flex: 0;
        }

        & > :last-child{
            flex: 1
        }
    }
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
