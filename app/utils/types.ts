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

export interface MongoResponse {
    _id: string,
    __v: number,
}

export interface VideoResponse extends MongoResponse {
    videoLink?: string,
    videoTitle?: string,
}

export interface AudioResponse extends MongoResponse{
    audioLink?: string,
    audioTitle?: string,
    audioArtist?: string,
}

export interface InboxResponse extends MongoResponse {
    password?: string,
    hint?: string
}

export interface LetterResponse extends MongoResponse {
    header: string,
    paragraph: string,
    footer: string
}

export interface UserResponse extends MongoResponse {
    video: VideoResponse,
    audio: AudioResponse,
    mailType: MailTypes,
    inbox: InboxResponse,
    letter: LetterResponse
}