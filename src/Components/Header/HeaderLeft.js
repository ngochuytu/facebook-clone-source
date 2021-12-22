import React from 'react';
import styled from 'styled-components';
import facebookIconSvg from '../../Images/Header/facebook-icon.svg';
import SearchIconFilled from '@material-ui/icons/Search';
import { Link, useLocation } from 'react-router-dom';
import { colorGreyInput, colorGreySearchIcon } from "../../Constants/Colors";
import { headerLeftSpacing } from "../../Constants/Spacing/Header";
import { useRefetchPostsContext } from "../../Contexts/RefetchPostsContext";

const Container = styled.div`
    flex: 1;
    max-width: ${headerLeftSpacing.maxWidth};
    display: flex;
`;

const FacebookIcon = styled.img`
    margin-right: 5px;
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
    text-overflow: ellipsis;

    &::placeholder{
        color: ${colorGreySearchIcon};
    }
`;

const SearchIcon = styled(SearchIconFilled)`
    position: absolute;
    left: 7.5px;
`;

function HeaderLeft() {
    const location = useLocation();
    const refetchPostsContextValues = useRefetchPostsContext();
    if (refetchPostsContextValues)
        var { refetchPostsHandler } = refetchPostsContextValues;

    return (
        <Container>
            <Link to='/'>
                <FacebookIcon src={facebookIconSvg} onClick={refetchPostsHandler && (() => refetchPostsHandler(location))} />
            </Link>
            <SearchBar>
                <Input type="text" placeholder="Search Facebook" />
                <SearchIcon />
            </SearchBar>

        </Container>
    );
}

export default HeaderLeft;
