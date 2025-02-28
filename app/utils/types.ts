export const enum Apps {
    MAIL = 'mail',
    MUSIC = 'music',
    TRASH = 'trash',
}

export enum MailTypes {
    HEART = 'heart',
    GIFT = 'giftbox',
    BALLOON = 'balloon'
}

export const enum PlayPause {
    PLAY = 'play',
    PAUSE = 'pause'
}

export interface User {
    video: {
        videoLink?: string,
        videoTitle?: string,
    },
    audio: {
        audioLink?: string,
        audioTitle?: string,
        audioArtist?: string,
    },
    mailType: MailTypes,
    inbox: {
        password?: string,
        hint?: string
    },
    letter: {
        header: string,
        paragraph: string,
        footer: string
    }
}

export enum BuildStatus {
    SKIPPED = 'skipped',
    COMPLETE = 'complete',
    INCOMPLETE = 'incomplete'
}