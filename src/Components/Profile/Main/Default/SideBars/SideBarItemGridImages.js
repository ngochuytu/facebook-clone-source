import React from 'react';
import styled from "styled-components";

const ImageGallery = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Image = styled.img`
    width: ${props => props.imagesPerRow && `calc(100% / ${props.imagesPerRow} - 5px)`};
    aspect-ratio: 1 / 1;
    margin: 2.5px;
`;

function SideBarItemGridImages({ photos, imagesPerRow }) {

    return (
        <ImageGallery>
            {
                photos.map(photo => <Image imagesPerRow={imagesPerRow} key={photo} src={photo} />)
            }
        </ImageGallery>
    );
}

export default SideBarItemGridImages;
