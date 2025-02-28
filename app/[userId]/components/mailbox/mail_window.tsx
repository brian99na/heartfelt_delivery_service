import React from "react";
import clsx from "clsx";
import Inbox from "./inbox";
import Video from "./video";
import AudioBar from "./audio_bar";
import Letter from "./letter";
import { usePageLeave } from "@/app/hooks/pageLeave";
import styles from "./mail_window.module.css";
import { WindowContext } from "../windowContext/WindowContext";

const MailWindow = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [mailClicked, setMailedClicked] = React.useState<boolean>(false);
    const [playVideo, setPlayVideo] = React.useState<boolean>(false);
    const [showLetter, setShowLetter] = React.useState<boolean>(false);
    const exitInbox = usePageLeave({ isLeaving: mailClicked });
    const enterLetter = usePageLeave({ isLeaving: showLetter });
    const { user } = React.useContext(WindowContext);

    const handleMailClick = () => {
        setMailedClicked(true);
        if (user.video.videoLink) {
            setPlayVideo(true);
            if (videoRef.current) {
                const video = videoRef as React.RefObject<HTMLVideoElement>;
                video.current.play();
            }
        } else {
            setShowLetter(true);
        }
    };

    const handleVideoEnd = () => {
        setShowLetter(true);
    };

    return (
        <div
            className={clsx("h-[475px] w-full overflow-x-hidden", {
                [styles.mailWindowContainer]: enterLetter,
            })}
        >
            {!exitInbox && (
                <Inbox
                    handleMailClick={handleMailClick}
                    mailClicked={mailClicked}
                />
            )}
            {!enterLetter && (
                <>
                    <Video
                        videoRef={videoRef}
                        playVideo={playVideo}
                        handleVideoEnd={handleVideoEnd}
                        showLetter={showLetter}
                    />
                    {playVideo && (
                        <div className="absolute bottom-[12px] left-[12px]">
                            <AudioBar
                                contentRef={videoRef}
                                showLetter={showLetter}
                            />
                        </div>
                    )}
                </>
            )}
            {enterLetter && <Letter showLetter={showLetter} />}
        </div>
    );
};

export default MailWindow;
