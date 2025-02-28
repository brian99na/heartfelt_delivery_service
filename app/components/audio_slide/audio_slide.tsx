import { isValidUrl } from "@/app/utils/utils";
import React from "react";
import { BuilderContext } from "../builder_context/BuilderContext";
import { Apps, BuildStatus } from "@/app/utils/types";

const AudioBuilder = () => {
    const [audioEnabled, setAudioEnabled] = React.useState<boolean>(false);
    const {
        finalData: {
            audio: { audioLink, audioTitle, audioArtist },
        },
        setFinalData,
        setOpenWindows,
        setBuildStatus,
    } = React.useContext(BuilderContext);
    const titleRef = React.useRef<HTMLInputElement>(null);
    const artistRef = React.useRef<HTMLInputElement>(null);
    const linkRef = React.useRef<HTMLInputElement>(null);

    const handleUseAudio = () => {
        setFinalData((prev) => {
            return {
                ...prev,
                audio: {
                    ...prev.audio,
                    audioLink: audioEnabled ? "" : linkRef.current?.value,
                    audioTitle: audioEnabled ? "" : titleRef.current?.value,
                    audioArtist: audioEnabled ? "" : artistRef.current?.value,
                },
            };
        });
        setAudioEnabled((prev) => !prev);
    };

    const handleOpenPreview = () => {
        setOpenWindows((prev) => {
            return prev.includes(Apps.MUSIC) ? prev : [...prev, Apps.MUSIC];
        });
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                audio: {
                    ...prev.audio,
                    audioLink: e.target.value,
                },
            };
        });
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                audio: {
                    ...prev.audio,
                    audioTitle: e.target.value,
                },
            };
        });
    };

    const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                audio: {
                    ...prev.audio,
                    audioArtist: e.target.value,
                },
            };
        });
    };

    const evaluateComplete = () => {
        if (audioEnabled) {
            if (isValidUrl(audioLink) && audioArtist && audioTitle) {
                setBuildStatus((prev) => {
                    return {
                        ...prev,
                        audio: BuildStatus.COMPLETE,
                    };
                });
            } else {
                setBuildStatus((prev) => {
                    return {
                        ...prev,
                        audio: BuildStatus.INCOMPLETE,
                    };
                });
            }
        } else {
            setBuildStatus((prev) => {
                return {
                    ...prev,
                    audio: BuildStatus.SKIPPED,
                };
            });
        }
    };

    React.useEffect(() => {
        evaluateComplete();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioEnabled, audioLink, audioArtist, audioTitle]);

    return (
        <div className="flex justify-start flex-col gap-4 items-start h-[466px] p-8">
            <h1 className="text-center font-Silkscreen text-2xl">
                Audio Settings
            </h1>
            <div className="flex justify-start items-center w-full gap-2">
                <input onChange={handleUseAudio} type="checkbox" />
                <p className="text-center">Attach a song?</p>
            </div>
            <div className="flex justify-center items-center w-full gap-2 relative">
                <input
                    ref={titleRef}
                    onChange={handleTitleChange}
                    type="text"
                    maxLength={20}
                    disabled={!audioEnabled}
                    placeholder="Song title"
                    className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none"
                />
                <input
                    ref={artistRef}
                    onChange={handleArtistChange}
                    maxLength={20}
                    type="text"
                    disabled={!audioEnabled}
                    placeholder="Song artist"
                    className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none"
                />
            </div>
            {audioEnabled && (
                <div className="flex justify-start items-center w-full gap-2 bg-white p-2 rounded-lg border-[1px] border-gray-200">
                    <h1 className="p-2">ⓘ</h1>
                    <h1>
                        Enter a link to your song in an mp3 format. <br />
                        Free recommended site for uploading -{" "}
                        <a
                            className="text-blue-500 underline"
                            href="https://www.catbox.moe"
                        >
                            catbox.moe
                        </a>
                    </h1>
                </div>
            )}
            <div className="flex justify-center items-center w-full gap-2 relative">
                <input
                    ref={linkRef}
                    onChange={handleLinkChange}
                    type="url"
                    disabled={!audioEnabled}
                    placeholder="Enter a link - https://catbox.moe/yoursong.mp3"
                    className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none"
                />
            </div>
            {audioEnabled && isValidUrl(audioLink) && (
                <div className="flex flex-col justify-start items-center w-full gap-2 ">
                    <p>Open Preview In New Window</p>
                    <h1
                        onClick={handleOpenPreview}
                        className="bg-white rounded-lg border-[1px] border-gray-200 text-2xl aspect-square pr-2 pl-2 cursor-pointer hover:bg-slate-100"
                    >
                        ❐
                    </h1>
                </div>
            )}
        </div>
    );
};

export default AudioBuilder;
