import { Apps, FlapLocations, MailTypes, User } from "./types";

export const iconMapping = {
    [Apps.MAIL]: {
        src: "/icons/dithered-mailbox.png",
        alt: "mailbox icon",
        text: "Mail",
    },
    [Apps.MUSIC]: {
        src: "/icons/dithered-recordplayer.png",
        alt: "record player icon",
        text: "Music",
    },
    [Apps.TRASH]: {
        src: "/icons/dithered-trash.png",
        alt: "trashcan icon",
        text: "Trash",
    },
    [MailTypes.HEART]: {
        src: "/icons/heart.png",
        alt: "heart icon",
    },
    [MailTypes.GIFT]: {
        src: "/icons/gift-box.png",
        alt: "gift box icon",
    },
    [MailTypes.BALLOON]: {
        src: "/icons/balloon.png",
        alt: "baloon icon",
    },
};

export const windowDetailMapping = {
    [Apps.MAIL]: "top-[10%] left-[150px] w-[500px] h-[500px]",
    [Apps.MUSIC]: "top-[15%] left-[670px] w-[500px] h-[300px]",
    [Apps.TRASH]:
        "top-[50%] left-[50%] w-[500px] h-[200px] translate-x-[-50%] translate-y-[-50%]",
};

export const defaultUser: User = {
    video: {
        videoLink: "video",
        videoTitle: "testing",
    },
    audio: {
        audioLink: "audio",
        audioTitle: "testing",
        audioArtist: "testing",
    },
    mailType: MailTypes.HEART,
    inbox: {
        password: "testing passed",
        hint: "testing hint",
    },
    letter: {
        header: "testing header",
        paragraph: "testing para",
        footer: "testing footer",
    },
};

export const flapGifPlacementMapping: Record<FlapLocations, string> = {
    [FlapLocations.TOPLEFT]: 'top-0 left-0',
    [FlapLocations.TOPRIGHT]: 'top-0 right-0',
    [FlapLocations.BOTTOMLEFT]: 'bottom-0 left-0',
    [FlapLocations.BOTTOMRIGHT]: 'bottom-0 right-0',
}