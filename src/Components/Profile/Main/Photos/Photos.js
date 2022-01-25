import { getDownloadURL, listAll, ref } from "firebase/storage";
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { useBreakPointContext } from "../../../../Contexts/BreakPointContext";
import { storage } from "../../../../firebase";
import { useUserProfileContext } from "../../Index";
import SideBarItem from "../Default/SideBars/SideBarItem";
import SideBarItemNothingToShow from "../Default/SideBars/SideBarItemNothingToShow";
import SideBarItemGridImages from "../Default/SideBars/SideBarItemGridImages";

function Photos() {
    const { userProfile } = useUserProfileContext();
    const [isGettingImages, setIsGettingImages] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [imagesPerRow, setImagesPerRow] = useState(5); //Default cho màn hình >700px
    const { breakPoint } = useBreakPointContext();

    useEffect(() => {
        const getImagesPerRow = () => {
            if (breakPoint.desktop)
                return setImagesPerRow(5);
            else if (breakPoint.large)
                return setImagesPerRow(4);
            else if (breakPoint.medium)
                return setImagesPerRow(3);
            else if (breakPoint.small)
                return setImagesPerRow(2);
            else if (breakPoint.verySmall)
                return setImagesPerRow(1);
        };
        getImagesPerRow();

    }, [breakPoint.desktop, breakPoint.large, breakPoint.medium, breakPoint.small, breakPoint.verySmall]);

    useEffect(() => {
        const getPhotos = async () => {
            const photosList = await listAll(ref(storage, `${userProfile.uid}/images`));

            const photoDownloadURLs = await Promise.all(photosList.items.map(photoRef => getDownloadURL(photoRef)));

            setPhotos(photoDownloadURLs);
            setIsGettingImages(false);
        };
        getPhotos();
    }, [userProfile.uid]);

    return (
        <>
            {
                isGettingImages ?
                    <SideBarItem title="Photos" content={<SideBarItemGridImages photos={photos} imagesPerRow={imagesPerRow} />} />
                    :
                    photos.length ?
                        <SideBarItem title="Photos" content={<SideBarItemGridImages photos={photos} imagesPerRow={imagesPerRow} />} />
                        :
                        <SideBarItem title="Photos" content={<SideBarItemGridImages photos={photos} imagesPerRow={imagesPerRow} />}>
                            <SideBarItemNothingToShow text="No photos to show" />
                        </SideBarItem>
            }
        </>
    );
}

export default Photos;
