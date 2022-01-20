import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import GroupCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { colorBlueHeaderCenter, colorGreyInput } from "../../Constants/Colors";
import { headerCenterSpacing } from "../../Constants/Spacing/Header";
import { useRefetchPostsContext } from "../../Contexts/RefetchPostsContext";
import { breakPointLarge, breakPointMedium } from "../../Constants/BreakPoints";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 ${headerCenterSpacing.paddingHorizontal.default};
    height: 90%;

    & > :nth-child(${props => props.activeNavigationItem}) > *{
        color: ${colorBlueHeaderCenter};
    }

    & > :nth-child(${props => props.activeNavigationItem}){
        border-bottom: 2px solid ${colorBlueHeaderCenter};
        border-radius: 5px 5px 0 0;
        &:hover{
            background: initial;
        }
        height: 110%; /*10% thừa bên trên */
    }

    & > :last-child{
        display: none;
    }

    @media screen and (max-width: ${breakPointLarge}){
        padding: 0 ${headerCenterSpacing.paddingHorizontal.large};

        & > :last-child{
            display: inherit;
        }   
    }

    @media screen and (max-width: ${breakPointMedium}){
        justify-content: flex-start;
        padding: 0 ${headerCenterSpacing.paddingHorizontal.medium};
        

        & > *:not(:last-child){
            display: none;
        }

    }
`;

const NavigationWrapper = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 4); /* 100% chia tổng số icon*/
    height: 45px;
    border-radius: 5px;
    cursor: pointer;
    /* height: 100%; */
    
    & > *{
        font-size: 30px !important;
        color: #b0b3b4;
    }

    &:not(:first-of-type, :last-of-type){
        margin: 0 5px;
    }

    &:hover{
        background: ${colorGreyInput};
    }

    @media screen and (max-width: ${breakPointLarge}){
        /* width: calc(100% / 5); */
    }

    @media screen and (max-width: ${breakPointMedium}){
        width: initial;
        padding: 0 5px;
    }

`;

function HeaderCenter() {
    const location = useLocation();
    const history = useHistory();
    const [activeNavigationItem, setActiveNavigationItem] = useState(0);
    const refetchPostsContextValues = useRefetchPostsContext();
    if (refetchPostsContextValues)
        var { refetchPostsHandler } = refetchPostsContextValues;

    useEffect(() => {
        const setActiveItemNavigationBar = () => {
            switch (location.pathname) {
                case '/':
                    setActiveNavigationItem(1);
                    break;
                case '/bookmarks':
                    setActiveNavigationItem(5);
                    break;
                default:
                    break;
            }
        };

        setActiveItemNavigationBar();

        return () => {
            setActiveItemNavigationBar();
        };
    }, [activeNavigationItem, location.pathname]);

    const returnToPreviousPage = (e) => {
        if (location.pathname.includes("/bookmarks")) {
            e.preventDefault();
            history.goBack();
        }
    };

    return (
        <Container activeNavigationItem={activeNavigationItem}>
            <NavigationWrapper to='/' >
                <HomeOutlinedIcon onClick={refetchPostsHandler && (() => refetchPostsHandler(location))} />
            </NavigationWrapper >
            <NavigationWrapper to='/'>
                <PeopleAltOutlinedIcon />
            </NavigationWrapper>
            <NavigationWrapper to='/'>
                <FlagOutlinedIcon />
            </NavigationWrapper>
            <NavigationWrapper to='/'>
                <GroupCircleOutlinedIcon />
            </NavigationWrapper>
            <NavigationWrapper to='/bookmarks' onClick={returnToPreviousPage}>
                <MenuIcon />
            </NavigationWrapper>
        </Container>
    );
}

export default HeaderCenter;
