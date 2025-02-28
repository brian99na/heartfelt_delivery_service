import { PlayPause } from "@/app/utils/types";
import React, { SyntheticEvent } from "react";
import mainStyles from "../../main.module.css";
import musicStyles from "./music_window.module.css";
import clsx from "clsx";
import { formatTime } from "@/app/utils/utils";
import Record from "./record";
import AudioBar from "../mailbox/audio_bar";
import { WindowContext } from "../windowContext/WindowContext";

const MusicWindow = () => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    // PAUSE === It is paused, PLAY === It is playing
    const [playPause, setPlayPause] = React.useState<PlayPause>(
        PlayPause.PAUSE
    );
    const [currentTime, setCurrentTime] = React.useState(0);
    const { allowAudio, user: { audio: { audioLink, audioTitle, audioArtist }} } = React.useContext(WindowContext);

    const handlePlayPause = () => {
        if (playPause === PlayPause.PAUSE) {
            if (audioRef.current) {
                audioRef.current.play();
                setPlayPause(PlayPause.PLAY);
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                setPlayPause(PlayPause.PAUSE);
            }
        }
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        setCurrentTime((e.target as HTMLAudioElement).currentTime);
    };

    const handleEnded = () => {
        setPlayPause(PlayPause.PAUSE);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
        }
    };

    React.useEffect(() => {
        if (allowAudio) {
            handlePlayPause();
        }
    }, [allowAudio]);

    return (
        <div className="w-full h-[275px] flex justify-center items-center">
            <div className="w-[50%] flex justify-center items-center border-r-[1px] border-black">
                <Record playPause={playPause} />
            </div>
            <div className="w-[50%] flex justify-center items-center">
                <audio
                    ref={audioRef}
                    src={audioLink}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                />
                <div className="flex flex-col justify-between items-start w-[80%]">
                    <h1 className="font-Silkscreen text-base">{audioTitle}</h1>
                    <p className="pb-2 pl-[2]">{audioArtist}</p>
                    <div className="w-[100%] flex justify-center items-center h-[40px] border-[1px] border-black bg-btnBackground rounded-lg">
                        <input
                            className={clsx(
                                mainStyles.slider,
                                musicStyles.slider
                            )}
                            onChange={handleSeek}
                            type="range"
                            min="0"
                            max={
                                audioRef.current ? audioRef.current.duration : 1
                            }
                            step="1"
                            value={currentTime}
                        />
                    </div>
                    <p className="p-2">
                        {formatTime(currentTime)} /{" "}
                        {audioRef.current
                            ? formatTime(audioRef.current.duration)
                            : "--"}
                    </p>
                    <div className="relative flex justify-start items-center">
                        <button
                            disabled={!allowAudio}
                            onClick={handlePlayPause}
                            className={clsx(
                                "w-[40px] pt-[11px] pb-[11px] pr-[15px] pl-[14px] border-black border-[1px] border-r-0 bg-btnBackground",
                                musicStyles.roundedLeft
                            )}
                        >
                            {playPause === PlayPause.PAUSE ? "▶" : "⏸︎"}
                        </button>
                        <div className={clsx("h-[100%]", musicStyles.roundedRight)}>
                            <AudioBar
                                contentRef={audioRef}
                                playContent={playPause === PlayPause.PLAY}
                                showLetter={false}
                                rounded={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicWindow;
