import Record from "@/app/[userId]/components/music/record";
import { PlayPause } from "@/app/utils/types";
import React from "react";
import mainStyles from "../../[userId]/main.module.css";
import musicStyles from "../../[userId]/components/music/music_window.module.css";
import { formatTime } from "@/app/utils/utils";
import clsx from "clsx";
import AudioBar from "@/app/[userId]/components/mailbox/audio_bar";
import { BuilderContext } from "../builder_context/BuilderContext";

const AudioPreview = () => {
    const {
        finalData: {
            audio: { audioLink, audioTitle, audioArtist },
        },
    } = React.useContext(BuilderContext);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    // PAUSE === It is paused, PLAY === It is playing
    const [playPause, setPlayPause] = React.useState<PlayPause>(
        PlayPause.PAUSE
    );
    const [currentTime, setCurrentTime] = React.useState(0);
    const [audioError, setAudioError] = React.useState<boolean>(false);

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
            audioRef.current.currentTime = parseFloat(e.target.value);
        }
    };

    const handleAudioError = () => {
        setAudioError(true);
        handlePlayPause();
    };

    React.useEffect(() => {
        if (audioLink) {
            handlePlayPause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioLink]);

    return (
        <div className="w-full h-[275px] flex justify-center items-center">
            {audioError && (
                <div className="absolute bg-black text-white p-2 z-20">
                    Audio not available, retry with another link in the previous
                    window.
                </div>
            )}
            <div className="w-[50%] flex justify-center items-center border-r-[1px] border-black">
                <Record playPause={playPause} currentTime={currentTime} />
                <div className="w-[360px] h-[259px] origin-left rotate-[135deg] right-[-96%] bottom-[-14%] aspect-square z-[-1] flex justify-center items-center bg-[#dbe5ef] absolute" />
            </div>
            <div className="w-[50%] flex justify-center items-center">
                <audio
                    ref={audioRef}
                    src={audioLink}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onError={handleAudioError}
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
                            onClick={handlePlayPause}
                            className={clsx(
                                "w-[40px] pt-[11px] pb-[11px] pr-[15px] pl-[14px] border-black border-[1px] border-r-0 bg-btnBackground",
                                musicStyles.roundedLeft
                            )}
                        >
                            {playPause === PlayPause.PAUSE ? "▶" : "⏸︎"}
                        </button>
                        <div
                            className={clsx(
                                "h-[100%]",
                                musicStyles.roundedRight
                            )}
                        >
                            <AudioBar
                                contentRef={audioRef}
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

export default AudioPreview;
