import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import facebookIconSvg from '../../Images/Header/facebook-icon.svg';
import SearchIconFilled from '@material-ui/icons/Search';
import { Link, useLocation } from 'react-router-dom';
import { colorGreyHeader, colorGreyInput, colorGreySearchIcon } from "../../Constants/Colors";
import { headerLeftSpacing, headerSpacing } from "../../Constants/Spacing/Header";
import { useRefetchPostsContext } from "../../Contexts/RefetchPostsContext";
import { useBreakPointContext } from "../../Contexts/BreakPointContext";
import { breakPointLarge, breakPointSmall, breakPointVerySmall } from "../../Constants/BreakPoints";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconWrapper } from "./HeaderRight";

const Container = styled.div`
    width: 100%;
    max-width: ${headerLeftSpacing.maxWidth};
    display: flex;
    align-items: center;
    position: relative;
`;

const FacebookIcon = styled.img`
    width: 45px;
    height: 45px;
    margin-right: 5px;

    @media screen and (max-width: ${breakPointVerySmall}){
        width: 40px;
        height: 40px;
    }
`;

const SearchBar = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    position: relative;
    color: #a8abaf;
`;

const Input = styled.input`
    width: 90%;
    height: 40px;
    background: ${colorGreyInput};
    border-radius: 999px;
    border: none;
    outline: none;
    padding: 0 20px 0 35px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder{
        color: ${colorGreySearchIcon};
        
    }
`;

const SearchIcon = styled(SearchIconFilled)`
    position: ${props => props.breakPointDesktop ? "absolute" : "initial"};
    left: ${props => props.breakPointDesktop ? "7.5px" : null};
`;

const SearchSection = styled(Container)`
    position: absolute;
    top: 2px;
    left: -${headerSpacing.paddingHorizontal};
    z-index: 3;
    display: flex;
    flex-direction: column;
    background: ${colorGreyHeader};

    @media screen and (max-width: ${breakPointLarge}){
        width: 50vw;
    }
    @media screen and (max-width: ${breakPointSmall}){
        width: 60vw;
    }
    @media screen and (max-width: ${breakPointVerySmall}){
        width: 70vw;
    }
`;

const Overlay = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    & > :first-child{
        width: 25px;
        height: 25px;
        margin: 0 15px;
        color: ${colorGreySearchIcon};
    }

    ${Input}{
        padding-left: 20px;
    }
`;

const PointerCursorArrowBackIcon = styled(ArrowBackIcon)`
    cursor: pointer;
`;

const SearchResult = styled.div`
    height: 300px;
    width: 100%;
`;


function HeaderLeft() {
    const location = useLocation();
    const refetchPostsContextValues = useRefetchPostsContext();
    const { breakPoint } = useBreakPointContext();
    const [responsiveToggleSearchBar, setResponsiveToggleSearchBar] = useState(false);
    const [openSearchSection, setOpenSearchSection] = useState(false);

    useEffect(() => {
        if (breakPoint.desktop)
            setResponsiveToggleSearchBar(true);
        else
            setResponsiveToggleSearchBar(false);
    }, [breakPoint.desktop]);

    if (refetchPostsContextValues)
        var { refetchPostsHandler } = refetchPostsContextValues;

    return (
        <Container openSearchSection={openSearchSection}>
            <Link to='/'>
                <FacebookIcon src={facebookIconSvg} onClick={refetchPostsHandler && (() => refetchPostsHandler(location))} />
            </Link>

            <SearchBar onClick={() => setOpenSearchSection(!openSearchSection)}>
                {
                    (breakPoint.desktop || (!breakPoint.desktop && responsiveToggleSearchBar)) ?
                        <>
                            <Input type="text" placeholder="Search Facebook" />
                            <SearchIcon breakPointDesktop={breakPoint.desktop} />
                        </> :
                        <IconWrapper>
                            <SearchIcon breakPointDesktop={breakPoint.desktop} />
                        </IconWrapper>
                }
            </SearchBar>

            {
                openSearchSection &&
                <SearchSection>
                    <Overlay>
                        <PointerCursorArrowBackIcon onClick={() => setOpenSearchSection(!openSearchSection)} />
                        <SearchBar>
                            <Input type="text" placeholder="Search Facebook" />
                        </SearchBar>
                    </Overlay>
                    <SearchResult></SearchResult>
                </SearchSection>
            }
        </Container>

    );
}

export default HeaderLeft;
