import Image from "next/image";
import React from "react";
import mailStyles from "./mail_window.module.css";
import mainStyles from "../../main.module.css";
import clsx from "clsx";
import musicStyles from "../music/music_window.module.css";

interface AudioBar {
    contentRef: React.RefObject<HTMLVideoElement | HTMLAudioElement | null>;
    playContent: boolean;
    showLetter: boolean;
    rounded?: boolean;
}

const AudioBar = ({
    contentRef,
    playContent,
    showLetter,
    rounded,
}: AudioBar) => {
    const [volumeSliderVisible, setVolumeSliderVisible] =
        React.useState<boolean>(false);
    const [volume, setVolume] = React.useState<number>(0.5);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        if (contentRef.current) {
            const content = contentRef as React.RefObject<
                HTMLVideoElement | HTMLAudioElement
            >;
            content.current.volume = volume;
            setVolume(volume);
        }
    };

    const handleVolumeClick = () => {
        setVolumeSliderVisible(
            (prevVolumeSliderVisible) => !prevVolumeSliderVisible
        );
    };

    return (
        <div
            className={clsx(
                "bg-btnBackground flex justify-between items-center border-black border-[1px] h-[40px]",
                {
                    [mailStyles.fadeOut]: showLetter,
                    [musicStyles.roundedRight]: rounded,
                }
            )}
        >
            <div
                onClick={handleVolumeClick}
                className={clsx(
                    "h-[40px] w-[41px] border-black flex justify-start items-center p-1 aspect-square  cursor-pointer",
                    ".disableHighlighting",
                    {
                        "border-r-[1px]": volumeSliderVisible,
                    }
                )}
            >
                <Image
                    src="/icons/audio.png"
                    alt="speaker icon"
                    height={20}
                    width={20}
                />
                <div
                    style={{ display: volume >= 0.01 ? "block" : "none" }}
                    className="w-[1.5px] h-[4px] bg-black mr-[2px]"
                />
                <div
                    style={{ display: volume >= 0.35 ? "block" : "none" }}
                    className="w-[1.5px] h-[6px] bg-black mr-[2px]"
                />
                <div
                    style={{ display: volume >= 0.75 ? "block" : "none" }}
                    className="w-[1.5px] h-[8px] bg-black mr-[2px]"
                />
            </div>
            <input
                style={{ display: volumeSliderVisible ? "block" : "none" }}
                onChange={handleVolumeChange}
                className={mainStyles.slider}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
            />
        </div>
    );
};

export default AudioBar;
