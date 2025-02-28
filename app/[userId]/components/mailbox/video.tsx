import clsx from "clsx";
import React from "react";
import styles from "./mail_window.module.css";
import { WindowContext } from "../windowContext/WindowContext";

interface VideoProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    playVideo: boolean;
    handleVideoEnd: () => void;
    showLetter: boolean;
}

const Video = ({
    videoRef,
    playVideo,
    handleVideoEnd,
    showLetter,
}: VideoProps) => {
    const {user: {video: {videoLink}}} = React.useContext(WindowContext);
    return (
        <div
            className={clsx(
                "h-[475px] w-full absolute top-[25px] left-0 flex justify-center items-center pointer-events-none bg-black opacity-0",
                {
                    [styles.fadeIn]: playVideo && !showLetter,
                    [styles.fadeOut]: showLetter,
                }
            )}
        >
            <video
                className={styles.videoElement}
                src={videoLink}
                ref={videoRef}
                onEnded={handleVideoEnd}
            />
        </div>
    );
};

export default Video;
