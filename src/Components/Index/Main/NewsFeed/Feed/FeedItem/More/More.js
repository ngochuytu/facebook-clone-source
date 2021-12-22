import React, { useState } from 'react';
import styled from 'styled-components';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MoreItem from './MoreItem';
import { backgroundColorGreyHeader, colorGreyInput, colorGreySearchIcon } from '../../../../../../../Constants/Colors';




const Container = styled.div`
    position: relative;
`;

const iconSize = `35px`;

const MoreHorizontalIcon = styled(MoreHorizIcon)`
    border-radius: 50%;
    color: ${colorGreySearchIcon};
    cursor: pointer;
    width: ${iconSize} !important;
    height: ${iconSize} !important;
    padding: 5px;

    &:hover{
        background: ${colorGreyInput};
    }
`;

const ListMore = styled.ul`
    background: ${backgroundColorGreyHeader};
    border: 1px solid ${colorGreyInput};
    border-radius: 5px;
    /* display: none; */
    position: absolute;
    top: ${iconSize};
    right: 0;
`;


const More = ({ ownPost, postId, uid, content, attachmentFullPath, attachmentPreviewURL }) => {
    const [menuMoreOpen, setMenuMoreOpen] = useState(false);
    const listMoreOwnPost = [
        {
            title: 'Delete Post',
            icon: <DeleteOutlinedIcon />
        },
        {
            title: 'Edit Post',
            icon: <EditOutlinedIcon />
        }
    ];

    const openMenuHandler = () => {
        setMenuMoreOpen(!menuMoreOpen);
    };

    return (
        <Container>
            <MoreHorizontalIcon onClick={openMenuHandler} />
            {menuMoreOpen ?
                <ListMore>
                    {ownPost ? listMoreOwnPost.map(moreItem =>
                        <MoreItem key={moreItem.title} postId={postId} uid={uid} content={content} attachmentFullPath={attachmentFullPath} attachmentPreviewURL={attachmentPreviewURL} title={moreItem.title} icon={moreItem.icon} setMenuMoreOpen={setMenuMoreOpen} menuMoreOpen={menuMoreOpen} />
                    ) : null}
                </ListMore>
                : null
            }
        </Container>
    );
};

export default More;