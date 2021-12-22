import React from 'react';
import styled from "styled-components";
import { useInteractionContext } from "../../FeedItem";
import { INTERACTION_EMOTES } from "../../../../../../../../Constants/InteractionEmotes";


const InteractionsCountContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TotalEmotesContainer = styled.div`
    display: flex;
`;

const Emote = styled.img`
    width: 17.5px;
`;

const TotalEmotesCount = styled.p`
    margin-left: 5px;
`;

const CommentsCount = styled.p`
    margin-left: auto;
`;

function InteractionsCount() {
    const { interactions, comments } = useInteractionContext();

    const getTopThreeInteractionTypes = () => {
        const interactionTypesCount = INTERACTION_EMOTES.map(interactionEmote => {
            return {
                interactionType: interactionEmote.interactionType,
                count: 0
            };
        });

        interactions.forEach(interaction => {
            interactionTypesCount.forEach(interactionTypeCount => {
                if (interaction.interactionType === interactionTypeCount.interactionType)
                    interactionTypeCount.count++;
            });
        });

        const topThreeInteractionTypes =
            interactionTypesCount
                .sort((interactionTypeCountA, interactionTypeCountB) => interactionTypeCountB.count - interactionTypeCountA.count)
                .filter(interactionTypeCount => interactionTypeCount.count !== 0)
                .slice(0, 3)
                .map(interactionTypeCount => interactionTypeCount.interactionType);

        return topThreeInteractionTypes;
    };
    return (
        <InteractionsCountContainer>
            {interactions.length ?
                <TotalEmotesContainer>
                    {
                        getTopThreeInteractionTypes().map(interactionType => <Emote key={interactionType} src={INTERACTION_EMOTES.find(interactionEmote => interactionEmote.interactionType === interactionType).emoteSrc} />)
                    }
                    <TotalEmotesCount>{interactions.length}</TotalEmotesCount>
                </TotalEmotesContainer>
                : null
            }

            {comments.length ? <CommentsCount>{comments.length === 1 ? `1 comment` : `${comments.length} comments`}</CommentsCount> : null}
        </InteractionsCountContainer>
    );
}

export default InteractionsCount;