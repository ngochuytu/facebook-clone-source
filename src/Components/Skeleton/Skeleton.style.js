import { css, keyframes } from "styled-components";
import { colorGreyHeader } from "../../Constants/Colors";

const keyFrameBrightness = keyframes`
    from{
        filter: brightness(1); 
    }
    to{
        filter: brightness(1.5);
    }
`;

export const skeletonContainerBackgroundColor = colorGreyHeader;

export const skeletonBackgroundColor = '#2a2c2d';

export const animationSkeletonBrightness = css`
    animation-name: ${keyFrameBrightness};
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
`;

export const skeletonLinesBorderRadiusAndBackground = `
    height: 10px;
    border-radius: 5px;
    background: ${skeletonBackgroundColor};
`;