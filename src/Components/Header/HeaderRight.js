import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import ChatIconFilled from '@material-ui/icons/Chat';
import NotificationsIconFilled from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useFireBaseAuthContext } from '../../Contexts/FireBaseAuthContext';
import AvatarPic from '../../Images/Avatar.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Notifications from "../Notifications/Notifications";
import { colorBlueHeaderCenter, colorGreyIconHeaderRight, colorGreyInput, colorRed } from "../../Constants/Colors";
import { headerLeftSpacing } from "../../Constants/Spacing/Header";
import { useNotificationsContext } from "../../Contexts/NotificationsContext";
import { breakPointLarge, breakPointMedium, breakPointVerySmall } from "../../Constants/BreakPoints";

const Container = styled.div`
    max-width: ${headerLeftSpacing.maxWidth};
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & > *:not(:first-of-type){
        margin-left: 10px;
    }
`;

const UserWrapper = styled(Link)`
    display: flex;
    align-items: center;
    padding: 3.5px 9px 3.5px 4px;
    border-radius: 999px;
    cursor: pointer;
    background: ${props => props.isSelfProfile ? 'rgb(38, 57, 81)' : null};
    margin-right: 12px;

    &:hover{
        background: ${props => props.isSelfProfile ? 'rgb(60,77,99)' : colorGreyInput};
    }
    @media screen and (max-width: ${breakPointLarge}){
        display: none;
    }
`;

const Avatar = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 50%;
`;

const Username = styled.p`
    max-width: 75px;
    color: ${props => props.isSelfProfile ? colorBlueHeaderCenter : colorGreyIconHeaderRight};
    font-weight: 700;
    margin: 0 0 0 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-top: 1px;
`;


export const IconWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background: ${colorGreyInput};
    cursor: pointer;
    
    & > :first-child{ /*icon*/
        font-size: 22px;
        color: ${colorGreyIconHeaderRight};
    }

    &:hover{
        filter: brightness(1.2);
    }
    
    &:nth-of-type(${props => props.activeIcon}){
        background: rgb(38,56,81);
    }
    
    &:nth-of-type(${props => props.activeIcon}) > *{
        color: ${colorBlueHeaderCenter};
    }

    /* Red circle */
    &::before{
        ${props => props.numbersOfNewNotifications ? `content: '${props.numbersOfNewNotifications}';` : null}
        font-size: 12px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(40%, -15%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${colorRed};
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    @media screen and (max-width: ${breakPointVerySmall}){
        width: 30px;
        height: 30px;
        
        &::before{
            width: 20px;
            height: 20px;
            transform: translate(40%, -30%);
            
        }
    }
`;


const ICONS_INDEX = {
    NOT_ACTIVE: 0,
    MESSAGE: 1,
    NOTIFICATIONS: 2
};

const ACTION_TYPES = {
    IS_SELF_PROFILE: "isSelfProfile",
    MESSAGES: "messages",
    NOTIFICATIONS: "notifications"
};

const initialState = {
    isSelfProfile: false,
    activeIcon: ICONS_INDEX.NOT_ACTIVE
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.IS_SELF_PROFILE:
            return { ...state, isSelfProfile: true };
        case ACTION_TYPES.MESSAGES:
            return { ...state, activeIcon: state.activeIcon === ICONS_INDEX.MESSAGE ? 0 : ICONS_INDEX.MESSAGE };
        case ACTION_TYPES.NOTIFICATIONS:
            return { ...state, activeIcon: state.activeIcon === ICONS_INDEX.NOTIFICATIONS ? 0 : ICONS_INDEX.NOTIFICATIONS };
        default:
            return state;
    }
};

function HeaderRight() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentUser, logout } = useFireBaseAuthContext();
    const { numbersOfNewNotifications, updateCurrentUserNumbersOfNewNotification } = useNotificationsContext();
    const { photoURL, displayName, uid } = currentUser;
    const location = useLocation();
    useEffect(() => {
        const checkSelfProfile = () => {
            if (location.pathname === `/${uid}`)
                dispatch({ type: ACTION_TYPES.IS_SELF_PROFILE });
        };

        checkSelfProfile();

        return () => {
            checkSelfProfile();
        };
    }, [location, uid]);


    const notificationsIconClickHandler = () => {
        //Update new noti = 0
        //Chỉ update khi click mở, đóng k update
        if (state.activeIcon !== ICONS_INDEX.NOTIFICATIONS) {
            updateCurrentUserNumbersOfNewNotification(0);
        }

        dispatch({ type: ACTION_TYPES.NOTIFICATIONS });
    };

    const logOutClickHandler = () => {
        logout();
    };

    return (
        <Container>
            <UserWrapper to={`/${uid}`} isSelfProfile={state.isSelfProfile}>
                <Avatar src={photoURL || AvatarPic} />
                <Username isSelfProfile={state.isSelfProfile}>{displayName}</Username>
            </UserWrapper>
            <IconWrapper activeIcon={state.activeIcon} onClick={() => dispatch({ type: ACTION_TYPES.MESSAGES })}>
                <ChatIconFilled />
            </IconWrapper>
            <IconWrapper activeIcon={state.activeIcon} numbersOfNewNotifications={numbersOfNewNotifications} onClick={notificationsIconClickHandler}>
                <NotificationsIconFilled />
            </IconWrapper>
            <IconWrapper onClick={logOutClickHandler}>
                <ExitToAppIcon />
            </IconWrapper>
            {state.activeIcon === ICONS_INDEX.NOTIFICATIONS ? <Notifications /> : null}
        </Container>
    );
}

export default HeaderRight;
