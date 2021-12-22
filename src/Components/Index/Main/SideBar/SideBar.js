import React from 'react';
import styled from 'styled-components';
import FeatureItem from '../Item/Item';
import Friends from '../../../../Images/Index/Main/SideBar/Friends.png';
import Groups from '../../../../Images/Index/Main/SideBar/Groups.png';
import Memories from '../../../../Images/Index/Main/SideBar/Memories.png';
import Marketplace from '../../../../Images/Index/Main/SideBar/Marketplace.png';
import Pages from '../../../../Images/Index/Main/SideBar/Pages.png';
import AdCenter from '../../../../Images/Index/Main/SideBar/AdCenter.png';
import AdManager from '../../../../Images/Index/Main/SideBar/AdManager.png';
import CrisisResponse from '../../../../Images/Index/Main/SideBar/CrisisResponse.png';
import EmotionalHealth from '../../../../Images/Index/Main/SideBar/EmotionalHealth.png';
import Events from '../../../../Images/Index/Main/SideBar/Events.png';
import FacebookPay from '../../../../Images/Index/Main/SideBar/FacebookPay.png';
import Favorites from '../../../../Images/Index/Main/SideBar/Favorites.png';
import Fundraisers from '../../../../Images/Index/Main/SideBar/Fundraisers.png';
import GamingVideos from '../../../../Images/Index/Main/SideBar/GamingVideos.png';
import Jobs from '../../../../Images/Index/Main/SideBar/Jobs.png';
import LiveVideos from '../../../../Images/Index/Main/SideBar/LiveVideos.png';
import AvatarPic from '../../../../Images/Avatar.png';
import { useFireBaseAuthContext } from '../../../../Contexts/FireBaseAuthContext';
import { colorGreyInput } from "../../../../Constants/Colors";
import { headerSpacing, headerLeftSpacing } from "../../../../Constants/Spacing/Header";

export const Container = styled.div`
    max-width: ${headerLeftSpacing.maxWidth};
    flex: 1;
    height: calc(100vh - ${headerSpacing.height});
    overflow-y: scroll;
    position: sticky;
    top: ${headerSpacing.height};

    &::-webkit-scrollbar {
        width: 0px;
    }

    &:hover{
        ::-webkit-scrollbar{
            width: 10px;
        }
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${colorGreyInput};
        border-radius: 10px;
    }
`;

const ListFeatures = styled.ul``;

function SideBar() {
    const { currentUser } = useFireBaseAuthContext();
    const { photoURL, displayName, uid } = currentUser;

    const featureGallery = [
        {
            id: 1,
            img: Friends,
            title: 'Friends'
        },
        {
            id: 2,
            img: Groups,
            title: 'Groups'
        },
        {
            id: 3,
            img: Memories,
            title: 'Memories'
        },
        {
            id: 4,
            img: Marketplace,
            title: 'Marketplace'
        },
        {
            id: 5,
            img: Pages,
            title: 'Pages'
        },
        {
            id: 6,
            img: AdCenter,
            title: 'AdCenter'
        },
        {
            id: 7,
            img: AdManager,
            title: 'AdManager'
        },
        {
            id: 8,
            img: CrisisResponse,
            title: 'CrisisResponse'
        },
        {
            id: 9,
            img: EmotionalHealth,
            title: 'EmotionalHealth'
        },
        {
            id: 10,
            img: Events,
            title: 'Events'
        },
        {
            id: 11,
            img: FacebookPay,
            title: 'FacebookPay'
        },
        {
            id: 12,
            img: Favorites,
            title: 'Favorites'
        },
        {
            id: 13,
            img: Fundraisers,
            title: 'Fundraisers'
        },
        {
            id: 14,
            img: GamingVideos,
            title: 'GamingVideos'
        },
        {
            id: 15,
            img: Jobs,
            title: 'Jobs'
        },
        {
            id: 16,
            img: LiveVideos,
            title: 'LiveVideos'
        }
    ];


    return (
        <Container>
            <ListFeatures>
                <FeatureItem img={photoURL || AvatarPic} title={displayName} url={`/${uid}`}></FeatureItem>
                {featureGallery.map(
                    ({ id, img, title, url }) => <FeatureItem key={id} img={img} title={title} url={url || '/'} />
                )}
            </ListFeatures>
        </Container>
    );
}

export default SideBar;
