"use client";
import React from "react";
import StaticWindow from "./components/static_window";
import DraggableWindow from "./[userId]/components/window";
import { Apps, BuildStatus, MailTypes, User } from "./utils/types";
import VideoPreview from "./components/video_slide/video_preview";
import { BuilderContext } from "./components/builder_context/BuilderContext";
import AudioPreview from "./components/audio_slide/audio_preview";
import { createMessage } from "@/lib/api/actions";
import { ERROR_MESSAGES } from "./strings";
import clsx from "clsx";
import styles from "./[userId]/components/desktop.module.css";
import Image from "next/image";

const Builder = () => {
    const [openWindows, setOpenWindows] = React.useState<Apps[]>([]);
    const [finalData, setFinalData] = React.useState<User>({
        video: {},
        audio: {},
        inbox: {},
        mailType: MailTypes.HEART,
        letter: { header: "", paragraph: "", footer: "" },
    });
    const [nextButtonDisabled, setNextButtonDisabled] =
        React.useState<boolean>(false);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [buildStatus, setBuildStatus] = React.useState({
        mail: BuildStatus.COMPLETE,
        video: BuildStatus.SKIPPED,
        audio: BuildStatus.SKIPPED,
        letter: BuildStatus.INCOMPLETE,
    });
    const [messageUrl, setMessageUrl] = React.useState<string | undefined>(
        undefined
    );
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
        undefined
    );
    const apiUrl = process.env.API_URL;

    const handleCreateMessage = async (finalData: User) => {
        try {
            const urlEndpoint = await createMessage(finalData);
            if (!urlEndpoint) {
                throw new Error("No url endpoint");
            }
            setMessageUrl(apiUrl + "/" + urlEndpoint);
        } catch {
            setErrorMessage(ERROR_MESSAGES.errorCreating);
            setTimeout(() => {
                setErrorMessage(undefined);
            }, 5000);
        }
    };

    React.useEffect(() => {
        switch (currentSlide) {
            case 1:
                setNextButtonDisabled(
                    buildStatus.mail === BuildStatus.INCOMPLETE
                );
                break;
            case 2:
                setNextButtonDisabled(
                    buildStatus.video === BuildStatus.INCOMPLETE
                );
                break;
            case 3:
                setNextButtonDisabled(
                    buildStatus.audio === BuildStatus.INCOMPLETE
                );
                break;
            case 4:
                setNextButtonDisabled(
                    buildStatus.letter === BuildStatus.INCOMPLETE
                );
                break;
            case 5:
                setNextButtonDisabled(
                    Object.values(buildStatus).includes(BuildStatus.INCOMPLETE)
                );
            default:
                setNextButtonDisabled(false);
        }
    }, [currentSlide, buildStatus]);

    return (
        <div className="w-screen h-screen flex justify-center items-center font-PixelArial text-xs">
            <BuilderContext.Provider
                value={{
                    openWindows,
                    setOpenWindows,
                    nextButtonDisabled,
                    setNextButtonDisabled,
                    finalData,
                    setFinalData,
                    currentSlide,
                    setCurrentSlide,
                    buildStatus,
                    setBuildStatus,
                    handleCreateMessage,
                    messageUrl,
                    errorMessage,
                }}
            >
                <StaticWindow />
                {openWindows.map((app, idx) => {
                    return (
                        <DraggableWindow
                            setWindowsOpen={setOpenWindows}
                            zIndexes={[10 + idx, 11, 12]}
                            app={app}
                            key={idx}
                            setZIndexes={() => {}}
                        >
                            {app === Apps.MAIL && <VideoPreview />}
                            {app === Apps.MUSIC && <AudioPreview />}
                        </DraggableWindow>
                    );
                })}
            </BuilderContext.Provider>
            <div
                className={clsx(
                    "h-full w-full absolute pointer-events-none",
                    styles.desktopBg
                )}
            />
            <Image
                src={"/icons/shoes.gif"}
                alt="delivery shoes ascii icon"
                width={550}
                height={550}
                className="disableHighlight absolute bottom-0 right-0 pointer-events-none z-[-1]"
            />
            <Image
                src={"/icons/shoes.gif"}
                alt="delivery shoes ascii icon"
                width={550}
                height={550}
                className="disableHighlight absolute top-0 left-0 pointer-events-none z-[-1]"
            />
        </div>
    );
};

export default Builder;
