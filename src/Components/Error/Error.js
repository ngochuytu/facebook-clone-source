import React, { useEffect } from 'react';
import styled from "styled-components";
import { colorGreySearchIcon, colorGreyMain } from "../../Constants/Colors";
import { headerSpacing } from "../../Constants/Spacing/Header";
import BrokenLinkSvg from '../../Images/Error/broken-link.svg';



const Container = styled.div`
    min-height: calc(100vh - ${headerSpacing.height});
    background: ${colorGreyMain};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const BrokenLink = styled.img`
    width: 150px;
`;

const Wrapper = styled.div`
    color: ${colorGreySearchIcon};
    max-width: 400px;
    text-align: center;
`;

const Title = styled.h3`
    margin-bottom: 5px;
`;


function Error() {
    useEffect(() => {
        document.title = "Facebook | Page not found";
    }, []);

    return (
        <Container>
            <BrokenLink src={BrokenLinkSvg} />
            <Wrapper>
                <Title>This page isn't available</Title>
                <p>The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</p>
            </Wrapper>
        </Container>
    );
}

export default Error;
