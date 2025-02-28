import React from "react";
import { BuilderContext } from "../builder_context/BuilderContext";
import { Apps, BuildStatus } from "@/app/utils/types";
import { isValidUrl } from "@/app/utils/utils";

const VideoBuilder = () => {
    const {
        setOpenWindows,
        finalData: {
            video: { videoLink },
        },
        setFinalData,
        setBuildStatus,
    } = React.useContext(BuilderContext);
    const [videoEnabled, setVideoEnabled] = React.useState(false);
    const videoLinkRef = React.useRef<HTMLInputElement>(null);
    const handleUseVideo = () => {
        setFinalData((prev) => {
            return {
                ...prev,
                video: {
                    ...prev.video,
                    videoLink: videoEnabled ? "" : videoLinkRef.current?.value,
                },
            };
        });
        setVideoEnabled((prev) => !prev);
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                video: {
                    ...prev.video,
                    videoLink: e.target.value,
                },
            };
        });
    };

    const handleOpenPreview = () => {
        setOpenWindows((prev) => {
            return prev.includes(Apps.MAIL) ? prev : [...prev, Apps.MAIL];
        });
    };

    const evaluateComplete = () => {
        if (videoEnabled) {
            if (isValidUrl(videoLink)) {
                setBuildStatus((prev) => {
                    return {
                        ...prev,
                        video: BuildStatus.COMPLETE,
                    };
                });
            } else {
                setBuildStatus((prev) => {
                    return {
                        ...prev,
                        video: BuildStatus.INCOMPLETE,
                    };
                });
            }
        } else {
            setBuildStatus((prev) => {
                return {
                    ...prev,
                    video: BuildStatus.SKIPPED,
                };
            });
        }
    };

    React.useEffect(() => {
        evaluateComplete();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoEnabled, videoLink]);

    return (
        <div className="flex justify-start flex-col gap-4 items-start h-[466px] p-8">
            <h1 className="text-center font-Silkscreen text-2xl">
                Video Settings
            </h1>
            <div className="flex justify-start items-center w-full gap-2">
                <input onChange={handleUseVideo} type="checkbox" />
                <p className="text-center">Attach a video?</p>
            </div>
            {videoEnabled && (
                <div className="flex justify-start items-center w-full gap-2 bg-white p-2 rounded-lg border-[1px] border-gray-200">
                    <h1 className="p-2">ⓘ</h1>
                    <h1>
                        Enter a link to your video in an mp4 format. <br />
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
                    ref={videoLinkRef}
                    onChange={handleLinkChange}
                    type="url"
                    disabled={!videoEnabled}
                    placeholder="Enter a link - https://catbox.moe/yourvideo.mp4"
                    className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none"
                />
            </div>
            {videoEnabled && isValidUrl(videoLink) && (
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

export default VideoBuilder;
