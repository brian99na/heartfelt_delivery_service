import MailWindow from "../[userId]/components/mailbox/mail_window";
import MusicWindow from "../[userId]/components/music/music_window";
import Trash from "../[userId]/components/trash/trash";
import { Apps, User } from "./types";

export const getWindow = (app: Apps) => {
    const windowMapping = {
        [Apps.MAIL]: <MailWindow />,
        [Apps.MUSIC]: <MusicWindow />,
        [Apps.TRASH]: <Trash />,
    };
    return windowMapping[app];
};

export const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
};

export const isValidUrl = (url?: string) => {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
    );
    return url ? pattern.test(url) : false;
};

export const formatDataToUser = (data: any): User => {
    return {
        video: {
            videoLink: data?.video?.videoLink ?? undefined,
            videoTitle: data?.video?.videoTitle ?? undefined,
        },
        audio: {
            audioLink: data?.audio?.audioLink ?? undefined,
            audioTitle: data?.audio?.audioTitle ?? undefined,
            audioArtist: data?.audio?.audioArtist ?? undefined,
        },
        mailType: data.mailType,
        inbox: {
            password: data?.inbox?.password ?? undefined,
            hint: data?.inbox?.hint ?? undefined,
        },
        letter: {
            header: data?.letter?.header,
            paragraph: data?.letter?.paragraph,
            footer: data?.letter?.footer,
        },
    };
};
