import React from "react";
import styles from "../../[userId]/components/mailbox/mail_window.module.css";
import { BuilderContext } from "../builder_context/BuilderContext";

const VideoPreview = () => {
    const [videoError, setVideoError] = React.useState<boolean>(false);
    const {
        finalData: {
            video: { videoLink },
        },
    } = React.useContext(BuilderContext);

    const handleError = () => {
        setVideoError(true);
    };

    return (
        <div className="h-[475px] w-full absolute top-[25px] left-0 flex justify-center items-center pointer-events-all bg-black">
            <video
                className={styles.videoElement}
                src={videoLink}
                loop
                autoPlay
                muted
                controls
                onError={handleError}
            />
            {videoError && (
                <div className="absolute bg-black text-white p-2">
                    Video not available, retry with another link in the previous
                    window.
                </div>
            )}
        </div>
    );
};

export default VideoPreview;
