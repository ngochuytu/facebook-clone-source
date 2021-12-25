import React from 'react';
import Friends from '../../Images/Index/Main/SideBar/Friends.png';
import Groups from '../../Images/Index/Main/SideBar/Groups.png';
import Memories from '../../Images/Index/Main/SideBar/Memories.png';
import Marketplace from '../../Images/Index/Main/SideBar/Marketplace.png';
import Pages from '../../Images/Index/Main/SideBar/Pages.png';
import AdCenter from '../../Images/Index/Main/SideBar/AdCenter.png';
import AdManager from '../../Images/Index/Main/SideBar/AdManager.png';
import CrisisResponse from '../../Images/Index/Main/SideBar/CrisisResponse.png';
import EmotionalHealth from '../../Images/Index/Main/SideBar/EmotionalHealth.png';
import Events from '../../Images/Index/Main/SideBar/Events.png';
import FacebookPay from '../../Images/Index/Main/SideBar/FacebookPay.png';
import Favorites from '../../Images/Index/Main/SideBar/Favorites.png';
import Fundraisers from '../../Images/Index/Main/SideBar/Fundraisers.png';
import GamingVideos from '../../Images/Index/Main/SideBar/GamingVideos.png';
import Jobs from '../../Images/Index/Main/SideBar/Jobs.png';
import LiveVideos from '../../Images/Index/Main/SideBar/LiveVideos.png';
import AvatarPic from '../../Images/Avatar.png';
import { useFireBaseAuthContext } from "../../Contexts/FireBaseAuthContext";
import styled from "styled-components";
import { colorGreyMain } from "../../Constants/Colors";
import ListItem from "../ListItem/ListItem";

const Container = styled.div`
    background: ${colorGreyMain};
    padding: 10px 0;
`;

const ListBookmarks = styled.ul``;


function Bookmarks() {
    const { currentUser } = useFireBaseAuthContext();

    const BOOKMARKS_GALLERY = [
        {
            id: 1,
            img: currentUser.photoURL || AvatarPic,
            title: currentUser.displayName,
            url: `/${currentUser.uid}`
        },
        {
            id: 2,
            img: Friends,
            title: 'Friends'
        },
        {
            id: 3,
            img: Groups,
            title: 'Groups'
        },
        {
            id: 4,
            img: Memories,
            title: 'Memories'
        },
        {
            id: 5,
            img: Marketplace,
            title: 'Marketplace'
        },
        {
            id: 6,
            img: Pages,
            title: 'Pages'
        },
        {
            id: 7,
            img: AdCenter,
            title: 'AdCenter'
        },
        {
            id: 8,
            img: AdManager,
            title: 'AdManager'
        },
        {
            id: 9,
            img: CrisisResponse,
            title: 'CrisisResponse'
        },
        {
            id: 10,
            img: EmotionalHealth,
            title: 'EmotionalHealth'
        },
        {
            id: 11,
            img: Events,
            title: 'Events'
        },
        {
            id: 12,
            img: FacebookPay,
            title: 'FacebookPay'
        },
        {
            id: 13,
            img: Favorites,
            title: 'Favorites'
        },
        {
            id: 14,
            img: Fundraisers,
            title: 'Fundraisers'
        },
        {
            id: 15,
            img: GamingVideos,
            title: 'GamingVideos'
        },
        {
            id: 16,
            img: Jobs,
            title: 'Jobs'
        },
        {
            id: 17,
            img: LiveVideos,
            title: 'LiveVideos'
        }
    ];

    return (
        <Container>
            <ListBookmarks>
                {BOOKMARKS_GALLERY.map(
                    ({ id, img, title, url }) => <ListItem key={id} img={img} title={title} url={url || '/'} />
                )}
            </ListBookmarks>
        </Container>
    );
}

export default Bookmarks;
