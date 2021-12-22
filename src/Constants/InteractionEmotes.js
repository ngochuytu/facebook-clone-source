import EmoteCommentSrc from "../Images/Emotes/Comment.png";
import EmoteLikeSrc from "../Images/Emotes/Like.png";
import EmoteHeartSrc from "../Images/Emotes/Heart.png";
import EmoteCareSrc from "../Images/Emotes/Care.png";
import EmoteHahaSrc from "../Images/Emotes/Haha.png";
import EmoteWowSrc from "../Images/Emotes/Wow.png";
import EmoteSadSrc from "../Images/Emotes/Sad.png";
import EmoteAngrySrc from "../Images/Emotes/Angry.png";
import { colorBlueHeaderCenter } from "./Colors";

const heartEmoteColor = `rgb(244,30,66)`;
const angryEmoteColor = `rgb(233,113,15)`;
const yellowEmoteColor = `rgb(247,177,37)`;


export const INTERACTION_TYPES = {
    comment: "Comment",
    like: "Like",
    heart: "Heart",
    care: "Care",
    haha: "Haha",
    wow: "Wow",
    sad: "Sad",
    angry: "Angry"
};


export const INTERACTION_EMOTES = [
    {
        interactionType: INTERACTION_TYPES.comment,
        emoteSrc: EmoteCommentSrc
    },
    {
        interactionType: INTERACTION_TYPES.like,
        emoteSrc: EmoteLikeSrc,
        color: colorBlueHeaderCenter
    },
    {
        interactionType: INTERACTION_TYPES.heart,
        emoteSrc: EmoteHeartSrc,
        color: heartEmoteColor
    },
    {
        interactionType: INTERACTION_TYPES.care,
        emoteSrc: EmoteCareSrc,
        color: yellowEmoteColor
    },
    {
        interactionType: INTERACTION_TYPES.haha,
        emoteSrc: EmoteHahaSrc,
        color: yellowEmoteColor
    },
    {
        interactionType: INTERACTION_TYPES.wow,
        emoteSrc: EmoteWowSrc,
        color: yellowEmoteColor
    },
    {
        interactionType: INTERACTION_TYPES.sad,
        emoteSrc: EmoteSadSrc,
        color: yellowEmoteColor
    },
    {
        interactionType: INTERACTION_TYPES.angry,
        emoteSrc: EmoteAngrySrc,
        color: angryEmoteColor
    }
];