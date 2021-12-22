import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import GroupCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import { Link, useLocation } from 'react-router-dom';
import { colorBlueHeaderCenter, colorGreyInput } from "../../Constants/Colors";
import { headerCenterSpacing } from "../../Constants/Spacing/Header";
import { useRefetchPostsContext } from "../../Contexts/RefetchPostsContext";

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 ${headerCenterSpacing.paddingHorizontal};
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
        height: 110%; //10% left from above
    }

`;

const NavigationWrapper = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 5);
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
`;

function HeaderCenter() {
    const location = useLocation();
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

                default:
                    break;
            }
        };

        setActiveItemNavigationBar();

        return () => {
            setActiveItemNavigationBar();
        };
    }, [activeNavigationItem, location.pathname]);

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
            <NavigationWrapper to='/'>
                <SportsEsportsOutlinedIcon />
            </NavigationWrapper>
        </Container>
    );
}

export default HeaderCenter;
